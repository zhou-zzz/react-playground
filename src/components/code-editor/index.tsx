import { debounce } from 'lodash-es'
import { useContext } from 'react'
import { PlaygroundContext } from '@/react-playground/playground-context'
import Editor from './editor'
import FileNameList from './filename-list'

export default function CodeEditor() {
  const {
    files,
    setFiles,
    selectedFileName,
  } = useContext(PlaygroundContext)

  const file = files[selectedFileName]

  function onEditorChange(value?: string) {
    files[file.name].value = value!
    setFiles({ ...files })
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <FileNameList />
      <Editor file={file} onChange={debounce(onEditorChange, 500)} />
    </div>
  )
}
