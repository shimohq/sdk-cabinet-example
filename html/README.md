此项目用于演示如何在传统前端 app 集成石墨 SDK。

## 如何运行

此项目需要和 [`server`](/server) 一同运行。

### 安装和初始化

```shell
git clone git@github.com:shimohq/sdk-cabinet-example.git
cd html
npm i
```

### 运行

```
npm start
```

默认假定 `server` 运行于 `8081` 端口 (即 `http://localhost:8081`) ，如果需修改后端服务的地址，请修改 [`html/config/default.js`](/html/config/default.js`](/vue/src/constants/index.js) 文件。
