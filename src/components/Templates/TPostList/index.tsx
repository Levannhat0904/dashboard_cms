import React from 'react'
import ASelectAuthor from '../../atoms/ASelectAuthor'
import PostList from '../../organisms/OPostList'
import { Input, Layout } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { IAsset, IAuthor, IFetchPostsResponse } from '../../../utils/AxiosApiServiceLogin'
import ASelectAasset from '../../atoms/ASelectAasset'
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
        <ASelectAasset assets={assets} selectedAssets={selectedAssets} onChange={handleSelectAssetChange} />
        {/* <AInputSearch /> */}
      </div>
      <PostList datas={datas} loading={loading} onPageChange={handleOnPageChange} />
    </Layout>
  )
}

export default MainPage
