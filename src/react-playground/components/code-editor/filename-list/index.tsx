import { useContext, useEffect, useState } from 'react'
import { PlaygroundContext } from '@/react-playground/playground-context'
import { FileNameItem } from './filename-list-item'
import './index.scss'

export default function FileNameList() {
  const {
    files,
    selectedFileName,
    setSelectedFileName,
  } = useContext(PlaygroundContext)

  const [tabs, setTabs] = useState([''])

  useEffect(() => {
    setTabs(Object.keys(files))
  }, [files])

  return (
    <div className="tabs">
      {
        tabs.map((item, index) => (
          <FileNameItem
            key={item + index}
            value={item}
            actived={selectedFileName === item}
            onClick={() => setSelectedFileName(item)}
          >
          </FileNameItem>
        ))
      }
    </div>
  )
}
