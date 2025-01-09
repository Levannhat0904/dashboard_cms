import React, { useState } from 'react'
import { AudioOutlined } from '@ant-design/icons'
import { Input, Space } from 'antd'
import type { GetProps } from 'antd'
// import { debounce } from 'lodash'
type SearchProps = GetProps<typeof Input.Search>

const { Search } = Input

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff'
    }}
  />
)

const onSearch: SearchProps['onSearch'] = (value) => console.log('value search:', value)

const InputSearch: React.FC = () => {
  const [valueInput, setValueInput] = useState<string>('')
  return (
    <div className='flex justify-center !items-center w-full !content-center'>
      <Space direction='vertical' className='w-[80%]'>
        <Search
          placeholder='input search text'
          className='h-full flex'
          enterButton='Search'
          size='large'
          value={valueInput}
          suffix={suffix}
          onChange={(e) => {
            setValueInput(e.target.value)
            // debouncedSearch(e.target.value)
          }}
          onSearch={onSearch}
        />
      </Space>
    </div>
  )
}

export default InputSearch
