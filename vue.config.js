// 1. npm run build 打包代码
// 2. 把打包后的代码（dist 文件夹）给到后端
// 3. 后端把前端代码放入后端工程
// 4. 后端重启后端服务器
// * 容易出问题的就是下面的配置，如果希望通过域名+路径的形式访问，
//   此处(vue.config.js)配置时，publicPath 需设置为 根路径 加 项目文件名的形式
module.exports = {
  publicPath: '/jingdong'
}
