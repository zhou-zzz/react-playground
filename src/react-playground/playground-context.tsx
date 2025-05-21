import type { PropsWithChildren } from 'react'
import type { IFiles, IPlaygroundContext } from './types'
import { createContext, useState } from 'react'
import { APP_COMPONENT_FILE_NAME, ENTRY_FILE_NAME, IMPORT_MAP_FILE_NAME } from './constants'
import AppCss from './constants/template/app.css?raw'
import App from './constants/template/app.tsx?raw'
import importMap from './constants/template/import-map.json?raw'
import main from './constants/template/main.tsx?raw'
import { fileName2Language } from './utils'

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
