import { Allotment } from 'allotment'
import CodeEditor from '@/components/code-editor'
import Header from '@/components/header'
import Preview from '@/components/preview'
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
