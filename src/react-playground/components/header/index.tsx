import logoSvg from '@/assets/react.svg'
import './index.scss'

export default function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img alt="logo" src={logoSvg} />
        <span>React Playground</span>
      </div>
    </div>
  )
}
