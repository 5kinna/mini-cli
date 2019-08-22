const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')

module.exports = async function (creater, params, cb) {
  const {
    projectDir,
    page,
    src
  } = params
  const [pageName, subPageName] = page.replace(/^\/|\/$/g, '').split('/')
  const pageDir = path.join(projectDir, src, pageName)
  const pagePath = subPageName?path.join(pageDir,subPageName):pageDir
  if(!fs.existsSync(`/${pagePath}`))return console.log(chalk.green(`✘ 页面目录${page}不存在`))

  try {
    await fs.remove(`${pagePath}`)
    console.log(chalk.green(`✔ 页面目录${page}删除成功`))
    if(pageName === 'pages'){
      creater.removePagePackages(subPageName)
    }else if(subPageName && !fs.readdirSync(pageDir).length || !subPageName){
        await fs.remove(pageDir)

        console.log(chalk.green(`✔ 页面目录${pageName}删除成功`))

        creater.removeSubpackages(subPageName, pageName, true)
    }else creater.removeSubpackages(subPageName, pageName, false)
    console.log(chalk.green(`✔ 删除页面配置成功`))
  } catch (err) {
    console.log(chalk.red(`✘ 页面目录${page}或页面配置删除失败`))
  }
}
