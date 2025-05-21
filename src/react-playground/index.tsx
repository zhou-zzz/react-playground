import { Allotment } from 'allotment'
import CodeEditor from '@/react-playground/components/code-editor'
import Header from '@/react-playground/components/header'
import Preview from '@/react-playground/components/preview'
import 'allotment/dist/style.css'

export default function ReactPlayground() {
  return (
    <div style={{ height: '100vh' }}>
      <Header />
      <Allotment defaultSizes={[100, 100]}>
        <Allotment.Pane minSize={0}>
          <CodeEditor />
        </Allotment.Pane>
        <Allotment.Pane minSize={0}>
          <Preview />
        </Allotment.Pane>
      </Allotment>
    </div>
  )
}
