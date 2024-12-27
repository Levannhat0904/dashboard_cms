import React from 'react'
import ASelectAuthor from '../../atoms/ASelectAuthor'
import PostList from '../../organisms/OPostList'
import { IPost } from '../../../utils/AxiosApiServiceLogin'

// Định nghĩa kiểu cho các props của MainPage
interface MainPageProps {
  authors: string[]
  selectedAuthors: string[]
  handleSelectAuthorChange: (selectedAuthors: string[]) => void
  posts: IPost[] // Bạn có thể thay thế 'any' bằng kiểu cụ thể của posts nếu biết
  loading: boolean
  meta: {
    page: number
    pageSize: number
    total: number
  } // Bạn có thể thay thế 'any' bằng kiểu cụ thể của meta nếu biết
  handleOnPageChange: (page: number, pageSize: number) => Promise<void>
}

const MainPage: React.FC<MainPageProps> = ({
  authors,
  selectedAuthors,
  handleSelectAuthorChange,
  posts,
  loading,
  meta,
  handleOnPageChange
}) => {
  return (
    <div>
      <ASelectAuthor authors={authors} selectedAuthors={selectedAuthors} onChange={handleSelectAuthorChange} />
      <PostList posts={posts} loading={loading} meta={meta} onPageChange={handleOnPageChange} />
    </div>
  )
}

export default MainPage
