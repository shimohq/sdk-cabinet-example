此项目用于演示如何用 Vue.js 集成石墨 SDK。

本项目基于 [`Vue CLI`](https://cli.vuejs.org/) 生成的模版项目修改而成。

## 如何运行

此项目需要和 [`server`](/server) 一同运行。

### 安装和初始化

```shell
git clone git@github.com:shimohq/sdk-cabinet-example.git
cd vue
npm i
```

### 运行

```
npm run serve
```

默认假定 `server` 运行于 `8081` 端口 (即 `http://localhost:8081`) ，如果需修改后端服务的地址，请修改 [`vue/src/constants/index.js`](/vue/src/constants/index.js) 文件。
