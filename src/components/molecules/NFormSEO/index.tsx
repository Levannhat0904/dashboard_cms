import React from 'react'
import type { CollapseProps } from 'antd'
import { Collapse } from 'antd'
import NInputField from '../../atoms/InputField'
const metaDescription = <NInputField label='Meta Description' name='metaDescription' />
const metaTitle = <NInputField label='Meta Title' name='metaTitle' />
const twitterDescription = <NInputField label='Twitter Description' name='twitterDescription' />
const twitterTitle = <NInputField label='Twitter Title' name='twitterTitle' />
const OgDescription = <NInputField label='Og Description' name='OgDescription' />
const OgTitle = <NInputField label='Og Title' name='OgTitle' />

const items: CollapseProps['items'] = [
  {
    key: '2',
    label: 'Meta',
    children: (
      <>
        {metaDescription}
        {metaTitle}
      </>
    )
  },
  {
    key: '1',
    label: 'Twitter',
    children: (
      <>
        {twitterDescription}
        {twitterTitle}
      </>
    )
  },
  {
    key: '3',
    label: 'Og',
    children: (
      <>
        {OgDescription}
        {OgTitle}
      </>
    )
  }
]

const NFormSEO: React.FC = () => {
  const onChange = (key: string | string[]) => {
    console.log(key)
  }

  return <Collapse onChange={onChange} items={items} />
}

export default NFormSEO
