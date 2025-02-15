import fs from 'node:fs';
import path from 'node:path';
import {
  type HtmlRspackPlugin,
  type Rspack,
  ensureAssetPrefix,
} from '@rsbuild/core';
import type { PluginAssetsRetryOptions } from './types';

export class AssetsRetryPlugin implements Rspack.RspackPluginInstance {
  readonly name: string;

  readonly distDir: string;

  readonly inlineScript: boolean;

  readonly minify?: boolean;

  readonly HtmlPlugin: typeof HtmlRspackPlugin;

  scriptPath: string;

  readonly #retryOptions: PluginAssetsRetryOptions;

  constructor(
    options: PluginAssetsRetryOptions & {
      distDir: string;
      HtmlPlugin: typeof HtmlRspackPlugin;
    },
  ) {
    const {
      distDir,
      HtmlPlugin,
      inlineScript = true,
      minify,
      ...retryOptions
    } = options;
    this.name = 'AssetsRetryPlugin';
    this.#retryOptions = retryOptions;
    this.distDir = distDir;
    this.HtmlPlugin = HtmlPlugin;
    this.inlineScript = inlineScript;
    this.scriptPath = '';
    this.minify = minify;
  }

  async getRetryCode(): Promise<string> {
    const { default: serialize } = await import('serialize-javascript');
    const filename = 'initialChunkRetry';
    const runtimeFilePath = path.join(
      __dirname,
      'runtime',
      this.minify ? `${filename}.min.js` : `${filename}.js`,
    );
    const runtimeCode = await fs.promises.readFile(runtimeFilePath, 'utf-8');
    return `(function(){${runtimeCode};init(${serialize(
      this.#retryOptions,
    )});})()`;
  }

  async getScriptPath(): Promise<string> {
    if (!this.scriptPath) {
      this.scriptPath = path.posix.join(
        this.distDir,
        `assets-retry.${RSBUILD_VERSION}.js`,
      );
    }
    return this.scriptPath;
  }

  apply(compiler: Rspack.Compiler): void {
    if (!this.inlineScript) {
      compiler.hooks.thisCompilation.tap(
        this.name,
        (compilation: Rspack.Compilation) => {
          compilation.hooks.processAssets.tapPromise(
            {
              name: this.name,
              stage:
                compiler.webpack.Compilation.PROCESS_ASSETS_STAGE_PRE_PROCESS,
            },
            async () => {
              const scriptPath = await this.getScriptPath();
              const code = await this.getRetryCode();
              compilation.emitAsset(
                scriptPath,
                new compiler.webpack.sources.RawSource(code, false),
              );
            },
          );
        },
      );
    }

    compiler.hooks.compilation.tap(this.name, (compilation) => {
      // the behavior of inject/modify tags in afterTemplateExecution hook will not take effect when inject option is false
      this.HtmlPlugin.getHooks(compilation).alterAssetTagGroups.tapPromise(
        this.name,
        async (data) => {
          const scriptTag = {
            tagName: 'script',
            attributes: {},
            voidTag: false,
            meta: {},
          };

          if (this.inlineScript) {
            data.headTags.unshift({
              ...scriptTag,
              innerHTML: await this.getRetryCode(),
            });
          } else {
            const { publicPath } = compilation.outputOptions;
            const url = ensureAssetPrefix(
              await this.getScriptPath(),
              publicPath,
            );
            data.headTags.unshift({
              ...scriptTag,
              attributes: {
                ...scriptTag.attributes,
                src: url,
              },
            });
          }

          return data;
        },
      );
    });
  }
}
