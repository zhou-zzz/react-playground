import type { PluginObj } from '@babel/core'
import type { IFile, IFiles } from '@/react-playground/types'
import { transform } from '@babel/standalone'
import { ENTRY_FILE_NAME } from '@/react-playground/constants'

export function beforeTransformCode(filename: string, code: string) {
  let _code = code
  const regexReact = /import\s+React/g
  if ((filename.endsWith('.jsx') || filename.endsWith('.tsx')) && !regexReact.test(code)) {
    _code = `import React from 'react';\n${code}`
  }
  return _code
}

export function babelTransform(filename: string, code: string, files: IFiles) {
  const _code = beforeTransformCode(filename, code)
  let result = ''
  try {
    result = transform(_code, {
      presets: ['react', 'typescript'],
      filename,
      plugins: [customResolver(files)],
      retainLines: true,
    }).code!
  }
  catch (e) {
    console.error('编译出错', e)
  }
  return result
}

function getModuleFile(files: IFiles, modulePath: string) {
  let moduleName = modulePath.split('./').pop() || ''
  if (!moduleName.includes('.')) {
    const realModuleName = Object.keys(files).filter((key) => {
      return key.endsWith('.ts')
        || key.endsWith('.tsx')
        || key.endsWith('.js')
        || key.endsWith('.jsx')
    }).find((key) => {
      return key.split('.').includes(moduleName)
    })
    if (realModuleName) {
      moduleName = realModuleName
    }
  }
  return files[moduleName]
}

function json2Js(file: IFile) {
  const js = `export default ${file.value}`
  return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }))
}

function css2Js(file: IFile) {
  const randomId = new Date().getTime()
  const js = `
(() => {
    const stylesheet = document.createElement('style')
    stylesheet.setAttribute('id', 'style_${randomId}_${file.name}')
    document.head.appendChild(stylesheet)

    const styles = document.createTextNode(\`${file.value}\`)
    stylesheet.innerHTML = ''
    stylesheet.appendChild(styles)
})()
    `
  return URL.createObjectURL(new Blob([js], { type: 'application/javascript' }))
}

function customResolver(files: IFiles): PluginObj {
  return {
    visitor: {
      ImportDeclaration(path) {
        const modulePath = path.node.source.value
        if (modulePath.startsWith('.')) {
          const file = getModuleFile(files, modulePath)
          if (!file)
            return

          if (file.name.endsWith('.css')) {
            path.node.source.value = css2Js(file)
          }
          else if (file.name.endsWith('.json')) {
            path.node.source.value = json2Js(file)
          }
          else {
            path.node.source.value = URL.createObjectURL(
              new Blob([babelTransform(file.name, file.value, files)], {
                type: 'application/javascript',
              }),
            )
          }
        }
      },
    },
  }
}

export function compile(files: IFiles) {
  const main = files[ENTRY_FILE_NAME]
  return babelTransform(ENTRY_FILE_NAME, main.value, files)
}
