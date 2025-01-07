import React, { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useSelectedAuthors } from '../../../contexts/SelectedAuthorsContext'
import { useAuthors } from '../../../contexts/AuthorsContext'
import { usePostsV2 } from '../../../hook/CustomHook'
import { usePaginationV2 } from '../../../hook/usePagination'
import MainPage from '../../Templates/TPostList'
import useDebouncedSearch from '../../../hook/useDebouncedSearch'
import useQueryParamUrl from '../../../hook/useQueryParamUrl'

const PPost: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const { authors, sectors, assets } = useAuthors()
  // const [selectedAssets, setSelectedAssets] = useQueryParamUrl<string[]>('assets', [])
  // const [selectedAuthors, setSelectedAuthors] = useQueryParamUrl<string[]>('authors', [])
  // const { selectedAuthors, setSelectedAuthors } = useSelectedAuthors()
  const [queryParams, updateQueryParams] = useQueryParamUrl({
    assets: [],
    authors: []
  })
  // Lấy dữ liệu từ searchParams
  const page = parseInt(searchParams.get('page') || '1', 10)
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10)
  const s = searchParams.get('s') || ''
  console.log(page)
  // const assets = searchParams.get('assets') || ''
  // API call với searchParams
  const { data, isLoading } = usePostsV2({
    page,
    pageSize,
    s,
    authors: selectedAuthors,
    assets: selectedAssets
  })

  // Khôi phục trạng thái selectedAuthors từ URL
  useEffect(() => {
    const authorsFromUrl = searchParams.getAll('authors')
    if (authorsFromUrl.length > 0) {
      setSelectedAuthors(authorsFromUrl)
    }
  }, [searchParams, setSelectedAuthors])

  const { handleOnPageChange } = usePaginationV2()
  // Hàm xử lý khi thay đổi tác giả được chọn
  const handleSelectAuthorChange = (selectedAuthors: string[]) => {
    console.log('selectedAuthors: ', selectedAuthors)
    setSelectedAuthors(selectedAuthors)

    // setSearchParams({
    //   page: '1',
    //   pageSize: pageSize.toString(),
    //   authors: selectedAuthors,
    //   s
    // })
  }
  const handleSelectAssetsChange = (assets: string[]) => {
    setSelectedAssets(assets)
  }

  // Hàm xử lý tìm kiếm
  const handleSearch = (s: string) => {
    setSearchParams({
      page: '1',
      pageSize: pageSize.toString(),
      authors: selectedAuthors,
      s
    })
  }

  const handleInputSearchChange = useDebouncedSearch(setSearchParams, {
    delay: 1000,
    defaultPageSize: 10
  })
  console.log('assets: ', assets)

  // const filterData = [
  //   {
  //     type:"select",
  //     name:"authors",
  //     label:"Authors",
  //     options: [],
  //   },
  //   {
  //     type:"select",
  //     name:"assets",
  //     label:"Assets",
  //     options: [],
  //   }
  // ]
  return (
    <MainPage
      // filter authors
      authors={authors}
      selectedAuthors={selectedAuthors}
      handleSelectAuthorChange={handleSelectAuthorChange}
      // filter assets
      assets={assets}
      selectedSectors={selectedAssets}
      handleSelectAssetChange={handleSelectAssetsChange}
      // Search
      handleInputSearchChange={handleInputSearchChange}
      handleSearch={handleSearch}
      // selectedSectors={selectedSectors}
      // handleSelectSectorChange={handleSelectSectorChange}
      datas={data}
      loading={isLoading}
      handleOnPageChange={handleOnPageChange}
    />
  )
}

export default PPost
