import React from 'react'
import PostList from '../../organisms/OPostList'
import { Flex, Layout } from 'antd'
import { IAsset, IAuthor, IFetchPostsResponse } from '../../../utils/AxiosApiServiceLogin'
import Filter from './Filter'
interface MainPageProps {
  // handleSearch: (s: string) => void
  loading: boolean
  datas: IFetchPostsResponse | undefined
  handleOnPageChange: (page: number, pageSize: number) => void
  filterData?: any
}
const MainPage: React.FC<MainPageProps> = ({
  loading,
  // meta,
  datas,
  handleOnPageChange,
  filterData
}) => {
  return (
    <Layout>
      <Flex gap='large' align='center' justify='right' wrap className='my-3'>
        <Filter filterData={filterData} />
      </Flex>
      <PostList datas={datas} loading={loading} onPageChange={handleOnPageChange} />
    </Layout>
  )
}

export default MainPage
