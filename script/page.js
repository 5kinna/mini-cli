const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

module.exports = function(creater, params, cb) {
  const {
    projectDir,
    page,
    src
  } = params

  const {
    css,
    pageSrc
  } = creater.getConfigJson()

  const sourceDir = pageSrc===undefined ? path.join(projectDir, src) : pageSrc
  
  let [pageName, subPageName] = page.replace(/^\/|\/$/g, '').split('/')
  if(!subPageName){
    subPageName = pageName
    pageName='pages'
  }
  if(fs.existsSync(`/${sourceDir}/${pageName}/${subPageName}`))return console.log(chalk.red(`✘ 页面目录${page}已存在`))

  fs.ensureDirSync(sourceDir)
  fs.ensureDirSync(path.join(sourceDir, pageName))

  creater.template(
    'style',
    path.join(sourceDir, pageName,subPageName, `index.${css}`)
  )
  creater.template(
    'pagejs',
    path.join(sourceDir, pageName,subPageName, `index.js`),
    {
      name:'Page'
    }
  )
  creater.template(
    'json',
    path.join(sourceDir, pageName,subPageName, 'index.json'),{
      component:false
    }
  )
  creater.template(
    'wxml',
    path.join(sourceDir, pageName, subPageName,'index.wxml')
  )

  creater.fs.commit(() => {
    const chalkPath = `/${src}/${pageName}/${subPageName}`
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
      chalk.green(`✔ 创建页面目录 ${chalkPath} 成功！`)
    )
    console.log()
  })

  if(pageName!=='pages'){
    try {
      creater.writeSubpackages(subPageName, pageName)
      console.log(
        chalk.green(`✔ 页面配置成功`)
      )
    }catch (err) {
      console.log(chalk.red(`✘ 页面配置失败，请手动添加`))
    }
  } else {
    try {
      creater.writePagepackages(subPageName)
      console.log(
        chalk.green(`✔ 页面配置成功`)
      )
    }catch (err) {
      console.log(chalk.red(`✘ 页面配置失败，请手动添加`))
    }
  }
}
