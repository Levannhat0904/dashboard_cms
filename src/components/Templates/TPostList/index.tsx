import React, { ChangeEvent } from 'react'
import ASelectAuthor from '../../atoms/ASelectAuthor'
import PostList from '../../organisms/OPostList'
import { IPost } from '../../../utils/AxiosApiServiceLogin'
import { Input, Layout } from 'antd'
const { Search } = Input
// Định nghĩa kiểu cho các props của MainPage
interface MainPageProps {
  authors?: string[]
  selectedAuthors: string[]
  // handleSearchChange: () => void
  handleSelectAuthorChange: (selectedAuthors: string[]) => void
  handleSearch: (s: string) => void
  handleInputSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  posts: IPost[] // Bạn có thể thay thế 'any' bằng kiểu cụ thể của posts nếu biết
  loading: boolean
  meta: {
    page: number
    pageSize: number
    total: number
    s?: string
  } // Bạn có thể thay thế 'any' bằng kiểu cụ thể của meta nếu biết
  handleOnPageChange: (page: number, pageSize: number) => Promise<void>
}
const MainPage: React.FC<MainPageProps> = ({
  authors,
  selectedAuthors,
  handleSelectAuthorChange,
  posts,
  handleSearch,
  loading,
  meta,
  handleOnPageChange,
  handleInputSearchChange
}) => {
  return (
    <Layout>
      <div className='flex justify-between w-full items-center'>
        <Search
          className='h-full ml-4 w-[30%]'
          // value={meta.s}
          defaultValue={meta.s}
          // onChange={handleInputSearchChange}
          onChange={(e) => handleInputSearchChange(e)}
          placeholder='input search text'
          onSearch={handleSearch}
          enterButton
        />
        <ASelectAuthor authors={authors} selectedAuthors={selectedAuthors} onChange={handleSelectAuthorChange} />
        {/* <AInputSearch /> */}
      </div>
      <PostList posts={posts} loading={loading} meta={meta} onPageChange={handleOnPageChange} />
    </Layout>
  )
}

export default MainPage
