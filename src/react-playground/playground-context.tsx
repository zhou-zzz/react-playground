import type { PropsWithChildren } from 'react'
import { createContext, useState } from 'react'
import { fileName2Language } from '../utils'
import AppCss from './template/app.css?raw'
import App from './template/app.tsx?raw'
import importMap from './template/import-map.json?raw'
import main from './template/main.tsx?raw'

export interface IFile {
  name: string
  value: string
  language: string
}

export interface IFiles {
  [key: string]: IFile
}

export interface IPlaygroundContext {
  files: IFiles
  selectedFileName: string
  setSelectedFileName: (fileName: string) => void
  setFiles: (files: IFiles) => void
  addFile: (fileName: string) => void
  removeFile: (fileName: string) => void
  updateFileName: (oldFieldName: string, newFieldName: string) => void
}

// app 文件名
export const APP_COMPONENT_FILE_NAME = 'app.tsx'
// esm 模块映射文件名
export const IMPORT_MAP_FILE_NAME = 'import-map.json'
// app 入口文件名
export const ENTRY_FILE_NAME = 'main.tsx'

export const initFiles: IFiles = {
  [ENTRY_FILE_NAME]: {
    name: ENTRY_FILE_NAME,
    language: fileName2Language(ENTRY_FILE_NAME),
    value: main,
  },
  [APP_COMPONENT_FILE_NAME]: {
    name: APP_COMPONENT_FILE_NAME,
    language: fileName2Language(APP_COMPONENT_FILE_NAME),
    value: App,
  },
  'app.css': {
    name: 'app.css',
    language: 'css',
    value: AppCss,
  },
  'app7.css': {
    name: 'app.css',
    language: 'css',
    value: AppCss,
  },
  'app6.css': {
    name: 'app.css',
    language: 'css',
    value: AppCss,
  },
  'app5.css': {
    name: 'app.css',
    language: 'css',
    value: AppCss,
  },
  'app4.css': {
    name: 'app.css',
    language: 'css',
    value: AppCss,
  },
  'app3.css': {
    name: 'app.css',
    language: 'css',
    value: AppCss,
  },
  'app2.css': {
    name: 'app.css',
    language: 'css',
    value: AppCss,
  },
  'app1.css': {
    name: 'app.css',
    language: 'css',
    value: AppCss,
  },
  [IMPORT_MAP_FILE_NAME]: {
    name: IMPORT_MAP_FILE_NAME,
    language: fileName2Language(IMPORT_MAP_FILE_NAME),
    value: importMap,
  },
}

export const PlaygroundContext = createContext<IPlaygroundContext>({
  selectedFileName: 'app.tsx',
} as IPlaygroundContext)

export function PlaygroundProvider(props: PropsWithChildren) {
  const { children } = props
  const [files, setFiles] = useState<IFiles>(initFiles)
  const [selectedFileName, setSelectedFileName] = useState('app.tsx')

  const addFile = (name: string) => {
    files[name] = {
      name,
      language: fileName2Language(name),
      value: '',
    }
    setFiles({ ...files })
  }

  const removeFile = (name: string) => {
    delete files[name]
    setFiles({ ...files })
  }

  const updateFileName = (oldFieldName: string, newFieldName: string) => {
    if (!files[oldFieldName] || newFieldName === undefined || newFieldName === null)
      return
    const { [oldFieldName]: value, ...rest } = files
    const newFile = {
      [newFieldName]: {
        ...value,
        language: fileName2Language(newFieldName),
        name: newFieldName,
      },
    }
    setFiles({
      ...rest,
      ...newFile,
    })
  }

  return (
    <PlaygroundContext.Provider
      value={{
        files,
        selectedFileName,
        setSelectedFileName,
        setFiles,
        addFile,
        removeFile,
        updateFileName,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  )
}
