const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

module.exports = function(creater, params, cb) {
  const {
    projectDir,
    component,
    src
  } = params

  const sourceDir = path.join(projectDir, src ,'component')
  
  if(fs.existsSync(`/${sourceDir}/${component}`))return console.log(chalk.red(`✘ 组件目录${page}已存在`))

  fs.ensureDirSync(sourceDir)
  fs.ensureDirSync(path.join(sourceDir, component))

  creater.template(
    'style',
    path.join(sourceDir, component, 'index.scss')
  )
  creater.template(
    'pagejs',
    path.join(sourceDir, component, `index.js`)
  )
  creater.template(
    'json',
    path.join(sourceDir, component, 'index.json')
  )
  creater.template(
    'wxml',
    path.join(sourceDir, component,'index.wxml')
  )

  creater.fs.commit(() => {
    const chalkPath = `/${src}/component/${component}`
    console.log(
      `${chalk.green('✔ ')}${chalk.grey(
        `创建页面 SCSS 文件: ${chalkPath}/index.scss`
      )}`
    )
    console.log(
      `${chalk.green('✔ ')}${chalk.grey(
        `创建页面 JS 文件: ${chalkPath}/index.js`
      )}`
    )
    console.log(
      `${chalk.green('✔ ')}${chalk.grey(
        `创建页面 JSON 文件: ${chalkPath}/index.json`
      )}`
    )
    console.log(
      `${chalk.green('✔ ')}${chalk.grey(
        `创建页面 WXML 文件: ${chalkPath}/index.wxml`
      )}`
    )

    console.log(
      chalk.green(`✔ 创建组件目录 ${chalkPath} 成功！`)
    )
    console.log()
  })
}
