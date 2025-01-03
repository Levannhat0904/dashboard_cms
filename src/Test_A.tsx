import React from 'react'
import type { CollapseProps } from 'antd'
import { Collapse } from 'antd'
import NInputField from './components/atoms/InputField'

const text = <NInputField label='ig' name='ig' />

const items: CollapseProps['items'] = [
  {
    key: '2',
    label: 'This is panel header 2',
    children: <p>{text}</p>
  },
  {
    key: '1',
    label: 'This is panel header 2',
    children: <p>{text}</p>
  },
  {
    key: '3',
    label: 'This is panel header 3',
    children: <p>{text}</p>
  }
]

const App: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key)
  }

  return <Collapse onChange={onChange} items={items} />
}

export default App
