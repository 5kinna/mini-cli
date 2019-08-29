const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

module.exports = function(creater, params, cb) {
  const {
    projectDir,
    component,
    src
  } = params

  const {
    css,
    comSrc
  } = creater.getConfigJson()

  const sourceDir = comSrc===undefined ? path.join(projectDir, src ,'component') : path.join(projectDir, comSrc)
  
  if(fs.existsSync(`/${sourceDir}/${component}`))return console.log(chalk.red(`✘ 组件目录${page}已存在`))

  fs.ensureDirSync(sourceDir)
  fs.ensureDirSync(path.join(sourceDir, component))

  creater.template(
    'style',
    path.join(sourceDir, component, `index.${css}`)
  )
  creater.template(
    'pagejs',
    path.join(sourceDir, component, `index.js`),
    {
      name:'Component'
    }
  )
  creater.template(
    'json',
    path.join(sourceDir, component, 'index.json'),
    {
      component:true
    }
  )
  creater.template(
    'wxml',
    path.join(sourceDir, component,'index.wxml')
  )

  creater.fs.commit(() => {
    const chalkPath = `${sourceDir}/${component}`
    console.log(
      `${chalk.green('✔ ')}${chalk.grey(
        `创建页面 SCSS 文件: ${chalkPath}/index.${css}`
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
