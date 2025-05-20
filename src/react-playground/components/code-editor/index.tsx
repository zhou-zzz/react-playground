import Editor from './editor'
import FileNameList from './filename-list'

export default function CodeEditor() {
  const file = {
    name: 'zx.tsx',
    value: 'import lodash from "lodash";\n\nconst a = <div>zx</div>',
    language: 'typescript',
  }

  function onEditorChange() {
    console.log(...arguments)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <FileNameList />
      <Editor file={file} onChange={onEditorChange} />
    </div>
  )
}
