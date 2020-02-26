此项目用于演示如何用 React 集成石墨 SDK。

本项目基于 [`Create React App`](https://create-react-app.dev/) 生成的模版项目修改而成。

## 如何运行

此项目需要和 [`server`](/server) 一同运行。

### 安装和初始化

```shell
git clone git@github.com:shimohq/sdk-cabinet-example.git
cd react
npm i
```

### 运行

```
npm start
```

默认假定 `server` 运行于 `8081` 端口 (即 `http://localhost:8081`) ，如果需修改后端服务的地址，请修改 [`react/src/constants/index.js`](/react/src/constants/index.js) 文件。

运行后需要在 `http://localhost:8080/login` 注册一个本地用户。
