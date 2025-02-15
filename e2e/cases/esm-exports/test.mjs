import { getBabelConfigForNode } from '@rsbuild/babel-preset/node';
import { getBabelConfigForWeb } from '@rsbuild/babel-preset/web';
import { pluginAssetsRetry } from '@rsbuild/plugin-assets-retry';
import { pluginBabel } from '@rsbuild/plugin-babel';
import { pluginCheckSyntax } from '@rsbuild/plugin-check-syntax';
import { pluginLess } from '@rsbuild/plugin-less';
import { pluginLightningcss } from '@rsbuild/plugin-lightningcss';
import { pluginPreact } from '@rsbuild/plugin-preact';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginRem } from '@rsbuild/plugin-rem';
import { pluginSass } from '@rsbuild/plugin-sass';
import { pluginSolid } from '@rsbuild/plugin-solid';
import { pluginSourceBuild } from '@rsbuild/plugin-source-build';
import { pluginStyledComponents } from '@rsbuild/plugin-styled-components';
import { pluginStylus } from '@rsbuild/plugin-stylus';
import { pluginSvelte } from '@rsbuild/plugin-svelte';
import { pluginSvgr } from '@rsbuild/plugin-svgr';
import { pluginSwc } from '@rsbuild/plugin-swc';
import { pluginTypeCheck } from '@rsbuild/plugin-type-check';
import { pluginVue } from '@rsbuild/plugin-vue';
import { pluginVueJsx } from '@rsbuild/plugin-vue-jsx';
import { pluginVue2 } from '@rsbuild/plugin-vue2';
import { pluginVue2Jsx } from '@rsbuild/plugin-vue2-jsx';
import { webpackProvider } from '@rsbuild/webpack';

export default {
  pluginAssetsRetry,
  pluginBabel,
  pluginCheckSyntax,
  pluginLess,
  pluginReact,
  pluginPreact,
  pluginRem,
  pluginSvgr,
  pluginSass,
  pluginSolid,
  pluginStylus,
  pluginSvelte,
  pluginLightningcss,
  pluginSourceBuild,
  pluginStyledComponents,
  pluginTypeCheck,
  pluginVue,
  pluginVue2,
  pluginVueJsx,
  pluginVue2Jsx,
  pluginSwc,
  getBabelConfigForWeb,
  getBabelConfigForNode,
  webpackProvider,
};
