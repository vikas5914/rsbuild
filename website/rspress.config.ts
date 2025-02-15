import path from 'node:path';
import { pluginRss } from '@rspress/plugin-rss';
import { pluginGoogleAnalytics } from 'rsbuild-plugin-google-analytics';
import { pluginOpenGraph } from 'rsbuild-plugin-open-graph';
import { pluginFontOpenSans } from 'rspress-plugin-font-open-sans';
import pluginSitemap from 'rspress-plugin-sitemap';
import { defineConfig } from 'rspress/config';
import { rsbuildPluginOverview } from './theme/rsbuildPluginOverview';

const siteUrl = 'https://rsbuild.dev';

export default defineConfig({
  plugins: [
    pluginSitemap({
      domain: siteUrl,
    }),
    pluginFontOpenSans(),
    pluginRss({
      siteUrl,
      feed: [
        {
          id: 'releases-rss',
          test: '/community/releases/v',
          title: 'Rsbuild Releases',
          language: 'en',
          output: {
            type: 'rss',
            filename: 'releases-rss.xml',
          },
        },
        {
          id: 'releases-atom',
          test: '/community/releases/v',
          title: 'Rsbuild Releases',
          language: 'en',
          output: {
            type: 'atom',
          },
        },
        {
          id: 'releases-rss-zh',
          test: '/zh/community/releases/v',
          title: 'Rsbuild Releases',
          language: 'zh-CN',
          output: {
            type: 'rss',
            filename: 'releases-rss-zh.xml',
          },
        },
        {
          id: 'releases-atom-zh',
          test: '/zh/community/releases/v',
          title: 'Rsbuild Releases',
          language: 'zh-CN',
          output: {
            type: 'atom',
          },
        },
      ],
    }),
  ],
  root: path.join(__dirname, 'docs'),
  lang: 'en',
  base: '/',
  title: 'Rsbuild',
  icon: 'https://assets.rspack.dev/rsbuild/favicon-128x128.png',
  logo: {
    light: 'https://assets.rspack.dev/rsbuild/navbar-logo-light.png',
    dark: 'https://assets.rspack.dev/rsbuild/navbar-logo-dark.png',
  },
  markdown: {
    checkDeadLinks: true,
  },
  route: {
    cleanUrls: true,
    // exclude document fragments from routes
    exclude: ['**/zh/shared/**', '**/en/shared/**', './theme', './src'],
  },
  themeConfig: {
    footer: {
      message: 'Copyright © 2024 ByteDance.',
    },
    socialLinks: [
      {
        icon: 'github',
        mode: 'link',
        content: 'https://github.com/web-infra-dev/rsbuild',
      },
      {
        icon: 'twitter',
        mode: 'link',
        content: 'https://twitter.com/rspack_dev',
      },
      {
        icon: 'discord',
        mode: 'link',
        content: 'https://discord.gg/XsaKEEk4mW',
      },
    ],
    locales: [
      {
        lang: 'en',
        label: 'English',
        title: 'Rsbuild',
        description: 'The Rspack-based build tool for the web',
        editLink: {
          docRepoBaseUrl:
            'https://github.com/web-infra-dev/rsbuild/tree/main/website/docs',
          text: '📝 Edit this page on GitHub',
        },
      },
      {
        lang: 'zh',
        label: '简体中文',
        title: 'Rsbuild',
        outlineTitle: '目录',
        prevPageText: '上一页',
        nextPageText: '下一页',
        description: '基于 Rspack 的 Web 构建工具',
        editLink: {
          docRepoBaseUrl:
            'https://github.com/web-infra-dev/rsbuild/tree/main/website/docs',
          text: '📝 在 GitHub 上编辑此页',
        },
      },
    ],
  },
  builderConfig: {
    plugins: [
      rsbuildPluginOverview,
      pluginGoogleAnalytics({ id: 'G-L6BZ6TKW4R' }),
      pluginOpenGraph({
        title: 'Rsbuild',
        type: 'website',
        url: siteUrl,
        image: 'https://assets.rspack.dev/rsbuild/rsbuild-og-image.png',
        description: 'The Rspack-based build tool',
        twitter: {
          site: '@rspack_dev',
          card: 'summary_large_image',
        },
      }),
    ],
    source: {
      alias: {
        '@components': path.join(__dirname, 'components'),
        '@en': path.join(__dirname, 'docs/en'),
        '@zh': path.join(__dirname, 'docs/zh'),
      },
    },
    server: {
      open: 'http://localhost:<port>/',
    },
    html: {
      tags: [
        // for baidu SEO verification
        {
          tag: 'meta',
          attrs: {
            name: 'baidu-site-verification',
            content: 'codeva-mYbzBtlg6o',
          },
        },
      ],
    },
  },
});
