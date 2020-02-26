此项目用于演示后端是如何集成石墨 SDK。

本项目基于 [SQLite](https://sqlite.org/index.html)，会在本地磁盘写入数据文件。

## 如何运行

### 安装和初始化

```shell
git clone git@github.com:shimohq/sdk-cabinet-example.git
cd server
npm i
npm run init
```

### 运行

运行此项目需要三个参数，这些参数需要从石墨获取：

- SHIMO_ENTRYPOINT
- SHIMO_CLIENT_ID
- SHIMO_CLIENT_SECRET

将以上参数分别替换到以下命令的对应部分即可启动：

```
SHIMO_ENTRYPOINT=<...> SHIMO_CLIENT_ID=<...> SHIMO_CLIENT_SECRET=<...> npm start
```

服务器默认运行在 `8081` 端口，通过 `http://localhost:8081` 可访问。

此项目用于演示客户现有系统如何和石墨 SDK 集成，包括现有用户如何使用石墨 SDK，因此需要通过接口 `http://localhost:8081/register` 或其他前端项目 ([html](../html) / [react](../react) / [vue](../vue)) 的 `http://localhost:8080/login` 页面注册用户
