const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const { exec } = require('child_process')

module.exports = function(creater, params, cb) {
  const {
    projectName,
    projectDir,
    description,
    typescript,
    src,
    css,
    appId
  } = params

  const projectPath = path.join(projectDir, projectName)
  const sourceDir = path.join(projectPath, src)

  let appCSSName
  let pageCSSName
  const styleExtMap = {
    sass: 'scss',
    less: 'less',
    stylus: 'styl',
    none: 'css'
  }
  const currentStyleExt = styleExtMap[css] || 'css'
  const suffix = '.js'//typescript?'.ts':'.js'

  fs.ensureDirSync(projectPath)
  fs.ensureDirSync(sourceDir)
  fs.ensureDirSync(path.join(sourceDir, 'pages'))
  fs.ensureDirSync(path.join(sourceDir, 'images'))
  fs.ensureDirSync(path.join(sourceDir, 'utils'))
  fs.ensureDirSync(path.join(sourceDir, css || 'css'))

  switch (css) {
    case 'sass':
      appCSSName = 'app.scss'
      pageCSSName = 'index.scss'
      break
    case 'less':
      appCSSName = 'app.less'
      pageCSSName = 'index.less'
      break
    case 'stylus':
      appCSSName = 'app.styl'
      pageCSSName = 'index.styl'
      break
    default:
      appCSSName = 'app.css'
      pageCSSName = 'index.css'
      break
  }

  creater.template('style', path.join(sourceDir, appCSSName))
  creater.template(
    'style',
    path.join(sourceDir, 'pages', 'index', pageCSSName)
  )

  creater.template('appjs', path.join(sourceDir, `app${suffix}`))
  creater.template(
    'runtimejs',
    path.join(sourceDir, 'utils', 'runtime.js')
  )
  creater.template(
    'projectjs',
    path.join(sourceDir, 'test.project.config.json'),
    {
      projectName:`${projectName}-test`,
      appId
    }
  )
  creater.template(
    'projectjs',
    path.join(sourceDir, 'prod.project.config.json'),
    {
      projectName:`${projectName}-prod`,
      appId
    }
  )
  creater.template(
    'preprocessconfig',
    path.join(projectPath, `preprocess.config.js`)
  )
  creater.template('appjson', path.join(sourceDir, 'app.json'), {
    projectName
  })
  creater.template(
    'pagejs',
    path.join(sourceDir, 'pages', 'index', `index${suffix}`)
  )
  creater.template(
    'json',
    path.join(sourceDir, 'pages', 'index', 'index.json'),
    {
      projectName
    }
  )
  creater.template(
    'wxml',
    path.join(sourceDir, 'pages', 'index', 'index.wxml')
  )

  creater.template('nvmrc', path.join(projectPath, '.nvmrc'))
  creater.template('postcssconfig', path.join(projectPath, `postcss.config.js`))
  creater.template('babelrc', path.join(projectPath, '.babelrc'))
  creater.template(
    'packagejson',
    path.join(projectPath, 'package.json'),
    {
      description,
      projectName
    }
  )
  creater.template(
    'gulpfile',
    path.join(projectPath, 'gulpfile.babel.js'),
    {
      css,
      typescript:false
    }
  )
  creater.template(
    'configjs',
    path.join(projectPath, 'config.js'),
    {
      css:currentStyleExt,
      suffix
    }
  )
  // if(typescript){
  //   creater.template('typings', path.join(sourceDir, 'typings'))
  //   creater.template('tsconfig', path.join(sourceDir, 'tsconfig.json'))
  // }

  creater.fs.commit(() => {
    const chalkPath = `${projectName}/${src}`

    console.log(
      `${chalk.green('✔ ')}${chalk.grey(
        `创建项目: ${chalk.grey.bold(projectName)}`
      )}`
    )
    console.log(
      `${chalk.green('✔ ')}${chalk.grey(`创建源码目录: ${chalkPath}`)}`
    )
    console.log(
      `${chalk.green('✔ ')}${chalk.grey(`创建页面目录: ${chalkPath}/pages`)}`
    )
    console.log(
      `${chalk.green('✔ ')}${chalk.grey(
        `创建页面 JS 文件: ${chalkPath}/pages/index/index.js`
      )}`
    )
    console.log(
      `${chalk.green('✔ ')}${chalk.grey(
        `创建页面 JSON 文件: ${chalkPath}/pages/index/index.json`
      )}`
    )
    console.log(
      `${chalk.green('✔ ')}${chalk.grey(
        `创建页面 WXML 文件: ${chalkPath}/pages/index/index.wxml`
      )}`
    )
    console.log(
      `${chalk.green('✔ ')}${chalk.grey(
        `创建页面 ${currentStyleExt.toLocaleUpperCase()} 文件: ${projectName}/${src}/pages/index/${pageCSSName}`
      )}`
    )
    console.log(
      `${chalk.green('✔ ')}${chalk.grey(`创建文件: ${chalkPath}/app.js`)}`
    )
    console.log(
      `${chalk.green('✔ ')}${chalk.grey(
        `创建文件: ${chalkPath}/${appCSSName}`
      )}`
    )
    console.log(
      `${chalk.green('✔ ')}${chalk.grey(`创建文件: ${chalkPath}/app.json`)}`
    )
    console.log(
      `${chalk.green('✔ ')}${chalk.grey(
        `创建文件: ${chalkPath}/project.config.json`
      )}`
    )
    console.log(`${chalk.green('✔ ')}${chalk.grey(`创建其他配置文件`)}`)

    console.log(
      chalk.green(`✔ 创建项目 ${chalk.green.bold(projectName)} 成功！`)
    )
    console.log()
    console.log(chalk.green(`请进入项目目录 ${chalk.green.bold(projectName)} `))
    console.log(chalk.green(`安装依赖，可执行命令 npm i`))
    console.log(chalk.green(`开始工作吧！😝`))

    if (typeof cb === 'function') {
      cb()
    }
  })
}
