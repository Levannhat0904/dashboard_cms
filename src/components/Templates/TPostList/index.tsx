import React, { ChangeEvent } from 'react'
import ASelectAuthor from '../../atoms/ASelectAuthor'
import PostList from '../../organisms/OPostList'
import { Input, Layout } from 'antd'
import { useSearchParams } from 'react-router-dom'
const { Search } = Input
interface MainPageProps {
  authors?: string[]
  selectedAuthors: string[]
  // handleSearchChange: () => void
  handleSelectAuthorChange: (selectedAuthors: string[]) => void
  handleSearch: (s: string) => void
  handleInputSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  loading: boolean
  datas: any
  handleOnPageChange: (page: number, pageSize: number) => Promise<void>
}
const MainPage: React.FC<MainPageProps> = ({
  authors,
  selectedAuthors,
  handleSelectAuthorChange,
  // posts,
  handleSearch,
  loading,
  // meta,
  datas,
  handleOnPageChange,
  handleInputSearchChange
}) => {
  const [searchParams] = useSearchParams()
  const s = searchParams.get('s') || ''
  return (
    <Layout>
      <div className='flex justify-between w-full items-center'>
        <Search
          className='h-full ml-4 w-[30%]'
          // value={meta.s}
          defaultValue={s}
          // onChange={handleInputSearchChange}
          onChange={(e) => handleInputSearchChange(e)}
          placeholder='input search text'
          onSearch={handleSearch}
          enterButton
        />
        <ASelectAuthor authors={authors} selectedAuthors={selectedAuthors} onChange={handleSelectAuthorChange} />
        {/* <AInputSearch /> */}
      </div>
      <PostList datas={datas} loading={loading} onPageChange={handleOnPageChange} />
    </Layout>
  )
}

export default MainPage
