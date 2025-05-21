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
