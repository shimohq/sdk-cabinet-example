# 石墨 SDK Cabinet 演示程序

本项目用于演示如何接入[石墨 SDK](https://platform.shimo.im/)的[前端 SDK (shimohq/sdk-cabinet) ](https://github.com/shimohq/sdk-cabinet)。

在使用此演示程序前，需要石墨 SDK 官网[注册账号](https://platform.shimo.im/es-console/index.html#/register)，以获取用于和石墨测试服务器通信的 `clientId` 和 `clientSecret`。

本项目包括以下子项目。

后端：

- [`server`](#server)：后端演示程序

前端：

- [`html`](#html)：基于传统前端 app 的演示程序
- [`react`](#react)：基于 [React](https://reactjs.org/) 的演示程序
- [`vue`](#vue)：基于 [Vue.js](https://vuejs.org/) 的演示程序

**注意事项：**

- 这些项目仅用于演示目的，实际可用功能、性能以实际为准
- 这些项目仅用于演示目的，且未针对真实环境进行优化，请勿用于真实项目
- 项目中所用技术、编码风格等细节不代表着是石墨所推荐的选项

**运行要求：**

- 浏览器
  - Chrome >= 60
  - Firefox >= 60
  - Safari >= 10
- node >= 10
- node-gyp 可运行的环境 (用于安装依赖)
- git

由于此项目仅用于演示，因此：

- 未列出的浏览器均不保证兼容性等的技术问题
- 项目主要以 macOS 和 Ubuntu 为目标操作系统

## [`server`](/server)

由于 `clientId` 和 `clientSecret` 属于敏感信息，因此建议仅在后端服务器中存储并和石墨服务器通信。

此程序用于演示后端服务如何：

- 使用 `clientId` 和 `clientSecret` 申请和石墨服务器通信用的 Access Token
- 如何创建和管理文档
- 如何处理石墨文档和用户的关系

## [`html`](/html)

本项目演示传统前端 app 是如何接入石墨 SDK。

## [`react`](/react)

本项目演示 React app 是如何接入石墨 SDK。

## [`vue`](/vue)

本项目演示 Vue app 是如何接入石墨 SDK。

## 引用资源

- 前端项目所用主题基于 [MajesticAdmin](https://github.com/Urbanui/MajesticAdmin-Free-Bootstrap-Admin-Template) 修改而成
