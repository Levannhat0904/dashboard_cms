import React, { useState, useCallback } from 'react'
import { AudioOutlined } from '@ant-design/icons'
import { Input, Space, message } from 'antd'
import { debounce } from 'lodash'

type SearchProps = {
  handleSearch: (value: string) => void
}

const { Search } = Input

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff'
    }}
  />
)

const InputSearchTest: React.FC<SearchProps> = ({ handleSearch }) => {
  const [valueInput, setValueInput] = useState<string>('')

  const debouncedSearch = useCallback(
    debounce(async (value: string) => {
      handleSearch(value)
    }, 500),
    [handleSearch]
  )

  return (
    <div className='flex justify-center !items-center w-full !content-center'>
      <Space direction='vertical' className='w-[80%]'>
        <Search
          placeholder='Input search text'
          className='h-full flex'
          enterButton='Search'
          size='large'
          value={valueInput}
          suffix={suffix}
          onChange={(e) => {
            setValueInput(e.target.value)
            debouncedSearch(e.target.value)
          }}
        />
      </Space>
    </div>
  )
}

export default InputSearchTest