import React from 'react'
import PostList from '../../organisms/OPostList'
import { Flex, Input, Layout } from 'antd'
import { useSearchParams } from 'react-router-dom'
import { IAsset, IAuthor, IFetchPostsResponse } from '../../../utils/AxiosApiServiceLogin'
import FilterSelect from '../../atoms/ASelectAuthor'
import { FilterOption } from '../../pages/post'
import Filter from './Filter'
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
  filterData?: any
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
  handleInputSearchChange,
  filterData
}) => {
  const [searchParams] = useSearchParams()
  const s = searchParams.get('s') || ''
  return (
    <Layout>
      <Flex gap='large' align='center' justify='right' wrap className='my-3'>
        {/* <Search
          size='large'
          className='h-full w-60'
          // value={meta.s}
          defaultValue={s}
          // onChange={handleInputSearchChange}
          onChange={(e) => handleInputSearchChange(e)}
          placeholder='input search text'
          onSearch={handleSearch}
          enterButton
        /> */}
        {/* ok */}

        {/* <FilterSelect items={authors} selectedItems={selectedAuthors} onChange={handleSelectAuthorChange} />
        <FilterSelect items={assets} selectedItems={selectedAssets} onChange={handleSelectAssetChange} /> */}

        {/* test */}
        {/* <div>{console.log(filterData)}</div> */}
        {/* <>
          {filterData.map((filter: FilterOption) => (
            <div key={filter.name}>
              {(() => {
                switch (filter.type) {
                  case 'input':
                    // Render FilterInput cho input
                    return (
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
                    )
                  case 'select':
                    // Render FilterSelect cho select
                    return (
                      <FilterSelect
                        items={filter.items || []}
                        selectedItems={filter.selectedItems} // Hoặc selectedAssets tùy vào filter
                        onChange={filter.onChange}
                      />
                    )

                  default:
                    return null
                }
              })()}
            </div>
          ))}
        </> */}
        <Filter filterData={filterData} />
      </Flex>
      <PostList datas={datas} loading={loading} onPageChange={handleOnPageChange} />
    </Layout>
  )
}

export default MainPage
