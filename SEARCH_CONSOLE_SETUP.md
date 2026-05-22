# Google Search Console Setup Guide

This guide is for launching PlotTwist AI in Google Search Console.

Current production domain:

```text
https://tryplottwistai.com
```

Current sitemap:

```text
https://tryplottwistai.com/sitemap.xml
```

Current robots file:

```text
https://tryplottwistai.com/robots.txt
```

## 上线前检查结果

- `sitemap.xml` 可以访问，线上返回 200。
- `robots.txt` 可以访问，线上返回 200。
- `robots.txt` 已包含 sitemap 地址。
- 主要页面当前没有 `noindex`，页面 robots meta 为 `index, follow`。
- Google Search Console 是免费工具，不需要接任何收费服务。
- 提交 sitemap 和请求收录不等于保证收录，Google 仍然会自己判断是否抓取和收录。

## 1. 添加网站 Property

打开 Google Search Console:

```text
https://search.google.com/search-console
```

登录你的 Google 账号后，点击左上角的 property 下拉框，然后点击:

```text
Add property
```

你会看到两种添加方式:

```text
Domain
URL prefix
```

## 2. URL Prefix 和 Domain Property 的区别

### 推荐方式: Domain Property

填写:

```text
tryplottwistai.com
```

优点:

- 覆盖整个域名。
- 同时覆盖 `https://tryplottwistai.com` 和 `https://www.tryplottwistai.com`。
- 也覆盖以后可能出现的子域名。
- 更适合长期正式网站。

需要:

- 通过 DNS TXT record 验证所有权。

### 简单方式: URL Prefix

填写:

```text
https://tryplottwistai.com/
```

优点:

- 设置更直观。
- 可以用 HTML tag、HTML file、Google Analytics 等方式验证。

限制:

- 只覆盖这个精确 URL prefix。
- `https://www.tryplottwistai.com/` 需要单独添加。
- `http` 和 `https` 也会被当成不同前缀。

## 3. 如何验证所有权

### 如果选择 Domain Property

Google 会给你一条 TXT record，格式大概像这样:

```text
google-site-verification=xxxxxxxxxxxxxxxx
```

操作步骤:

1. 打开 Vercel Dashboard。
2. 进入 PlotTwist AI 项目或你的 Vercel Domains 页面。
3. 找到 `tryplottwistai.com` 的 DNS records。
4. 添加一条新的 TXT record。
5. Name/Host 通常填 `@`，Value/Content 填 Google 给你的完整验证内容。
6. 保存后回到 Google Search Console。
7. 点击 Verify。

DNS 生效可能需要几分钟到几小时。如果第一次失败，等一会儿再点 Verify。

### 如果选择 URL Prefix

Google 可能会给你几种验证方式。对当前项目来说，最常用的是:

- HTML tag: 把 Google 给的 meta tag 放进网站 `<head>`。
- HTML file: 下载 Google 给的验证文件，放到网站根目录并重新部署。
- DNS TXT record: 也可以使用 DNS 验证。

如果你选择 HTML tag，把 Google 给你的完整代码发给我，我可以帮你加进项目并重新部署。

## 4. 提交 Sitemap

验证成功后，在 Google Search Console 左侧点击:

```text
Sitemaps
```

在 Add a new sitemap 输入框里填写:

```text
sitemap.xml
```

或者填写完整地址:

```text
https://tryplottwistai.com/sitemap.xml
```

然后点击 Submit。

提交后如果状态显示 Success，说明 Google 已经能读取 sitemap。它不代表一定马上收录，只代表 sitemap 可以被读取。

## 5. 用 URL Inspection 检查首页

在 Google Search Console 顶部的搜索框输入:

```text
https://tryplottwistai.com/
```

然后按 Enter。

建议操作:

1. 查看 Google 是否已经知道这个 URL。
2. 点击 Test Live URL。
3. 如果 live test 通过，可以点击 Request Indexing。

首页检查后，也可以检查几个重要页面:

```text
https://tryplottwistai.com/short-drama-script-generator
https://tryplottwistai.com/prompt-library
https://tryplottwistai.com/blog
```

## 6. 如果暂时使用 Vercel 临时域名

如果正式域名还没准备好，可以先用 Vercel 临时域名做 URL Prefix property。

例如:

```text
https://plottwist-ai-iota.vercel.app/
```

对应 sitemap:

```text
https://plottwist-ai-iota.vercel.app/sitemap.xml
```

注意:

- 临时域名建议只作为过渡使用。
- 正式域名上线后，需要在 Search Console 里重新添加正式域名 property。
- SEO 长期建议集中在正式域名上，不要同时推广多个不同域名。

## 7. 未来换正式域名时怎么改

如果以后从 `tryplottwistai.com` 换成另一个正式域名，需要做这些事:

1. 在 Vercel 里绑定新域名。
2. 修改项目里的统一网站地址:

```text
src/lib/siteConfig.js
```

把:

```text
export const SITE_URL = "https://tryplottwistai.com";
```

改成新域名，例如:

```text
export const SITE_URL = "https://your-new-domain.com";
```

3. 如果使用环境变量文档，也同步更新:

```text
.env.example
```

4. 重新 build 并部署。
5. 检查新的:

```text
https://your-new-domain.com/sitemap.xml
https://your-new-domain.com/robots.txt
```

6. 在 Google Search Console 添加新域名 property。
7. 提交新 sitemap。
8. 如果旧域名还保留，建议把旧域名 301 跳转到新域名。

当前项目已经把 `SITE_URL` 集中管理在 `src/lib/siteConfig.js`，后期换域名主要改这一个地方。build 脚本会根据它重新生成 canonical URL、sitemap、robots 和 Open Graph URL。

## 8. 当前主要页面

这些页面应该出现在 sitemap 里:

```text
https://tryplottwistai.com/
https://tryplottwistai.com/short-drama-script-generator
https://tryplottwistai.com/plot-twist-generator
https://tryplottwistai.com/character-generator
https://tryplottwistai.com/tiktok-title-generator
https://tryplottwistai.com/meme-caption-generator
https://tryplottwistai.com/prompt-library
https://tryplottwistai.com/premium-templates
https://tryplottwistai.com/blog
https://tryplottwistai.com/about
https://tryplottwistai.com/contact
https://tryplottwistai.com/privacy-policy
https://tryplottwistai.com/terms-of-use
```

Blog 文章页也已经包含在 sitemap 里。

## 9. 处理“网页会自动重定向”

如果 Search Console 提示:

```text
网页会自动重定向
Page with redirect
```

这通常不是网站坏了。它经常出现在这些 URL 上:

- `http://tryplottwistai.com/...` 跳到 `https://tryplottwistai.com/...`
- `https://www.tryplottwistai.com/...` 跳到 `https://tryplottwistai.com/...`
- 旧 Vercel 临时域名跳到正式域名

这些被重定向的 URL 本身不会被索引，Google 应该索引最终的正式 URL。

当前项目的正式索引版本是:

```text
https://tryplottwistai.com
```

处理方法:

1. 确认 sitemap 只提交:

```text
https://tryplottwistai.com/sitemap.xml
```

2. 不要提交 `http://`、`www` 或 Vercel 临时域名的 sitemap。
3. 在 URL Inspection 里检查最终 URL，例如:

```text
https://tryplottwistai.com/
https://tryplottwistai.com/short-drama-script-generator
```

4. 如果最终 URL 显示可以被 Google 编入索引，点击 Request Indexing。
5. 如果报告里的示例 URL 是 `http`、`www` 或 Vercel 临时域名，可以把它当作正常的规范化现象。

代码层面已经在 `vercel.json` 里把 `www.tryplottwistai.com` 和旧 Vercel 临时域名重定向到正式域名，避免 Google 分散抓取多个版本。
