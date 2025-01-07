import React from 'react'
import PostList from '../../organisms/OPostList'
import { Flex, Input, Layout } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { IAsset, IAuthor, IFetchPostsResponse } from '../../../utils/AxiosApiServiceLogin'
import FilterSelect from '../../atoms/ASelectAuthor'
const { Search } = Input
interface MainPageProps {
  assets?: IAsset[]
  selectedAuthors: string[]
  handleSelectAssetChange: (selectedAssets: string[]) => void

  authors?: IAuthor[]
  selectedAssets: string[]
  handleSelectAuthorChange: (selectedAuthors: string[]) => void

  handleSearch: (s: string) => void
  handleInputSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  loading: boolean
  datas: IFetchPostsResponse | undefined
  handleOnPageChange: (page: number, pageSize: number) => void
}
const MainPage: React.FC<MainPageProps> = ({
  assets,
  authors,
  selectedAuthors,
  selectedAssets,
  handleSelectAssetChange,
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
      <Flex gap='large' align='center' justify='right' wrap className='my-3'>
        <Search
          size='large'
          className='h-full w-60'
          // value={meta.s}
          defaultValue={s}
          // onChange={handleInputSearchChange}
          onChange={(e) => handleInputSearchChange(e)}
          placeholder='input search text'
          onSearch={handleSearch}
          enterButton
        />
        <FilterSelect items={authors} selectedItems={selectedAuthors} onChange={handleSelectAuthorChange} />
        <FilterSelect items={assets} selectedItems={selectedAssets} onChange={handleSelectAssetChange} />
      </Flex>
      <PostList datas={datas} loading={loading} onPageChange={handleOnPageChange} />
    </Layout>
  )
}

export default MainPage
