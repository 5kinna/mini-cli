const path =require('path')
const fs =require('fs-extra')
const chalk =require('chalk')
const inquirer =require('inquirer')
const semver =require('semver')

const Creator = require('./creator')
module.exports=class Project extends Creator{
  constructor (options) {
    super()
    const unSupportedVer = semver.lt(process.version, 'v8.0.0')
    if (unSupportedVer) {
      throw new Error('Node.js 版本过低，推荐升级 Node.js 至 v8.0.0+')
    }

    this.conf = Object.assign({
      projectName: '',
      projectDir: process.cwd(),
      description: '',
      appId:''
    }, options)
  }

  init () {
    console.log(chalk.green(`即将创建一个新项目!`))
    console.log()
  }

  async create () {
    const answers = await this.ask()
    this.conf = Object.assign(this.conf, answers)
    this.writeTemplate()
  }

  ask () {
    const prompts = []
    const conf = this.conf
    if (typeof conf.projectName !== 'string') {
      prompts.push({
        type: 'input',
        name: 'projectName',
        message: '请输入项目名称！',
        validate (input) {
          if (!input) {
            return '项目名不能为空！'
          }
          if (fs.existsSync(input)) {
            return '当前目录已经存在同名项目，请换一个项目名！'
          }
          return true
        }
      })
    } else if (fs.existsSync(conf.projectName)) {
      prompts.push({
        type: 'input',
        name: 'projectName',
        message: '当前目录已经存在同名项目，请换一个项目名！',
        validate (input) {
          if (!input) {
            return '项目名不能为空！'
          }
          if (fs.existsSync(input)) {
            return '项目名依然重复！'
          }
          return true
        }
      })
    }

    if (typeof conf.description !== 'string') {
      prompts.push({
        type: 'input',
        name: 'description',
        message: '请输入项目介绍！'
      })
    }
    
    if (typeof conf.appId !== 'string') {
      prompts.push({
        type: 'input',
        name: 'appId',
        message: '请输入小程序appId'
      })
    }

    if (typeof conf.typescript !== 'boolean') {
      prompts.push({
        type: 'confirm',
        name: 'typescript',
        message: '是否需要使用 TypeScript ？（目前暂不支持typescript）'
      })
    }

    const cssChoices = [{
      name: 'Sass/Scss',
      value: 'sass'
    }, {
      name: 'Less',
      value: 'less'
    }, {
      name: 'Stylus',
      value: 'stylus'
    }, {
      name: '无',
      value: 'none'
    }]

    if (typeof conf.css !== 'string') {
      prompts.push({
        type: 'list',
        name: 'css',
        message: '请选择 CSS 预处理器（Sass/Less/Stylus）',
        choices: cssChoices
      })
    }

    return inquirer.prompt(prompts)
  }
  writeTemplate(cb=()=>{}){
    this.conf.src = 'src'
    const templateCreate = require(path.join(this.templatePath(), 'index.js'))
    templateCreate(this, this.conf, cb)
  }
}
