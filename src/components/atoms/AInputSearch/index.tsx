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
// const onSearch: SearchProps['onSearch'] = (value, _e, info) => console.log(info?.source, value)

const InputSearch: React.FC = () => {
  const [valueInput, setValueInput] = useState<string>('')
  // const { data, fetchPostById, setData, fetchPostsData, fetchPostsDataByContextAPI } = usePostContext()

  // // console.log(data)

  // const handleSearch = async (value: string) => {
  //   if (value === '') {
  //     // Nếu ô tìm kiếm trống, gọi lại API để tải lại tất cả bài viết
  //     console.log('Ô tìm kiếm trống, tải lại tất cả bài viết.')
  //     fetchPostsData()
  //     return
  //   }
  //   console.log(data)

  //   const result = await fetchPostsDataByContextAPI(value)
  //   console.log(result)
  //   if (result.length == 0) {
  //     confirm('không tìm thấy dữ liệu')
  //     fetchPostsData()
  //   }
  //   setData(result)
  //   // setData([result])
  // }

  //const debouncedSearch = useCallback(debounce(handleSearch, 500), [data])

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
