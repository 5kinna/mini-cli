# @kinna/wx-mini
## 简介
@kinna/wx-mini为简易版微信小程序快速构建脚手架，可实现以下功能：
- 快速创建微信小程序项目
- 快速创建页面目录以及子文件，并添加对应的分包配置
- 快速删除文件目录，并删除对应的分包配置
- 快速创建组件以及子文件
- 监测文件变化实时变更小程序代码
- 快速分环境打包不同AppID下的项目程序

## 特别说明
- 脚手架下的css预处理器默认选用scss
- 脚手架默认选用js，而不使用ts（后续会考虑）
- 初始化项目后会默认在项目目录下建立mini.config.json文件，用作后续的自定义配置
## 安装
```bash
npm i @kinna/wx-mini -g
```

## 用法
```bash
mini <command> [options]
```
**Commands:**
| 命令 | 说明 |
| --- | --- |
|init [projectName] | 初始化微信小程序项目 |
|page | 创建页面目录以及子文件并添加对应配置 |
|com | 创建组件目录以及子文件 |
|rm | 删除页面目录以及对应的配置 |
|help | 获取使用说明 |

## 说明
-  创建项目

运行以下命令创建微信小程序项目
```bash
mini init [projectName]
```
[projectName]为选填项，如若不带参数，则会询问对应的项目名称。
> 项目名称必须为不存在的才可创建
---
- 创建页面目录

运行以下命令创建微信小程序页面目录
```bash
mini page <页面相对路径>
```
> 页面路径是相对于src目录而言，例如：/test/test，则会在src下创建test/test/index.wxml,test/test/index.scss,test/test/index.json,test/test/index.js,并且如若是分包加载，则会在app.json中添加对应的分包配置
---
- 创建组件目录

运行以下命令创建微信小程序组件目录
```bash
mini con <组件名称>
```
> 组件会被添加到component目录下
---
- 删除页面目录

运行以下命令删除微信小程序页面目录
```bash
mini rm <页面相对路径>
```
> 页面路径是相对于src目录而言，例如：/test/test，则会删除src下的test/test下的全部文件,并且如若是分包加载，则会将app.json中对应的分包配置删除
---
- 构建热加载

运行以下命令构建热加载
```bash
npm run dev
```
> 该环境下会监测文件的变化，并将构建后的文件放置到example目录下
---
- 构建测试环境项目

运行以下命令构建测试环境项目
```bash
npm t
```
> 该环境下会重构项目文件放置到example目录下
---
- 构建正式环境项目

运行以下命令构建正式环境项目
```bash
npm run build
```
> 该环境下会重构项目文件放置到dist目录下

## 配置文件
可在项目目录下建立mini.config.json文件用作自定义配置文件。

**参数:**
| 参数 | 说明 | 默认值 |
| --- | --- | --- |
|css | 小程序使用的css预处理器|scss|
|pageSrc | 创建页面时相对于项目的路径 |/src|
|comSrc | 创建组件时相对于项目的路径 |/src/component|