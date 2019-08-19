const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

module.exports = function(creater, params, cb) {
  const {
    projectName,
    projectDir,
    page,
    src
  } = params

  const projectPath = path.join(projectDir, projectName)
  const sourceDir = path.join(projectPath, src)

  const [pageName, subPageName] = page.replace(/^\/|\/$/g, '').split('/')

  fs.ensureDirSync(projectPath)
  fs.ensureDirSync(sourceDir)
  fs.ensureDirSync(path.join(sourceDir, 'pages'))

  creater.template(
    'style',
    path.join(sourceDir, 'pages', pageName, 'index.scss')
  )
  creater.template(
    'pagejs',
    path.join(sourceDir, 'pages', pageName, `index.js`)
  )
  creater.template(
    'json',
    path.join(sourceDir, 'pages', pageName, 'index.json'),
    {
      projectName
    }
  )
  creater.template(
    'wxml',
    path.join(sourceDir, 'pages', pageName, 'index.wxml')
  )

  creater.fs.commit(() => {
    const chalkPath = `${projectName}/${src}`
    console.log(
      `${chalk.green('✔ ')}${chalk.grey(
        `创建页面 JS 文件: ${chalkPath}/pages/${pageName}/index.js`
      )}`
    )
    console.log(
      `${chalk.green('✔ ')}${chalk.grey(
        `创建页面 JSON 文件: ${chalkPath}/pages/${pageName}/index.json`
      )}`
    )
    console.log(
      `${chalk.green('✔ ')}${chalk.grey(
        `创建页面 WXML 文件: ${chalkPath}/pages/${pageName}/index.wxml`
      )}`
    )

    console.log(
      chalk.green(`✔ 创建项目目录 ${chalkPath}/pages/${pageName} 成功！`)
    )
    console.log()
  })
}
