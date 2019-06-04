const program = require('commander')

const Project = require('./src/project.js')

program
  .option('--name [name]', '项目名称')
  .option('--description [description]', '项目介绍')
  .option('--appId [appId]', '小程序appId')
  .option('--typescript', '使用TypeScript')
  .option('--no-typescript', '不使用TypeScript')
  .option('--css [css]', 'CSS预处理器(sass/less/stylus/none)')
  .parse(process.argv)

const args = program.args
const { description, appId,name, css } = program
let typescript

/**
 * 非标准做法
 * 为了兼容不指定typescript参数时，在inquirer中询问是否使用typescript的情况
 */
if (program.rawArgs.indexOf('--typescript') !== -1) {
  typescript = true
} else if (program.rawArgs.indexOf('--no-typescript') !== -1) {
  typescript = false
}

const projectName = args[0] || name

const project = new Project({
  projectName,
  description,
  typescript,
  appId,
  css
})

project.create()
