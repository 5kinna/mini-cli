const path =require('path')
const memFs =require('mem-fs')
const editor =require('mem-fs-editor')

module.exports=class Creator {
  constructor (options) {
    const store = memFs.create()
    this.fs = editor.create(store)
    this.init()
  }

  init () {}

  templatePath (...args) {
    let filepath = path.join.apply(path, args)
    if (!path.isAbsolute(filepath)) {
      filepath = path.join(this.conf.projectDir, 'templates', filepath)
    }
    return filepath
  }

  destinationPath (...args){
    let filepath = path.join.apply(path, args)
    if (!path.isAbsolute(filepath)) {
      filepath = path.join(this.conf.projectDir, filepath)
    }
    return filepath
  }

  template (template,source, dest, data, options) {
      if (typeof dest !== 'string') {
          options = data
          data = dest
          dest = source
        }
    this.fs.copyTpl(
      this.templatePath(template, source),
      this.destinationPath(dest),
      Object.assign({}, this.conf, data),
      options
    )
    return this
  }

  writeTemplate(){}
}
