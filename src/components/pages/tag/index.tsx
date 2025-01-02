import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import React, { useCallback, useEffect, useState } from 'react'
import { Avatar, Button, Layout, Space, Table } from 'antd'
import type { TableProps } from 'antd'
import { useTags } from '../../../hook/useTag'
import { ITag } from '../../../utils/AxiosApiServiceLogin'
import usePagination from '../../../hook/usePagination'
import DeleteTag from './DeleteTag'
import { Input } from 'antd'
const { Search } = Input
import { debounce } from 'lodash'
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons'
const TestPostL1: React.FC = () => {
  const columns: TableProps<ITag>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (text, record) => {
        return (
          <div className='flex justify-start items-center gap-2'>
            <Avatar
              size='large'
              src={record.featureImage || null} // Nếu featureImage trống, không truyền src
              icon={record.featureImage ? null : <UserOutlined />} // Nếu không có featureImage, hiển thị icon UserOutlined
            />
            <a>{text}</a>
          </div>
        )
      }
    },
    {
      title: 'Slug',
      dataIndex: 'slug'
    },
    {
      title: 'totalPost',
      dataIndex: 'totalPost'
    },
    {
      title: 'Action',
      render: (value, record) => (
        <Space size='middle'>
          <Button
            onClick={() => {
              handleNavigate(record.id, record)
            }}
          >
            <EditOutlined />
          </Button>
          <Button
            onClick={() => {
              setIsModalDeleteOpen(true)
              setDataDelete(record)
            }}
          >
            <DeleteOutlined />
          </Button>
        </Space>
      )
    }
  ]
  const navigate = useNavigate()
  const handleNavigate = (id: string | undefined, dataToSend: ITag) => {
    // Sử dụng navigate và truyền state
    navigate(`/dashboard/tag/edit/${id}`, { state: dataToSend })
  }
  const location = useLocation()
  const dataReceived = location.state
  const [searchParams, setSearchParams] = useSearchParams()
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [dataDelete, setDataDelete] = useState<null | ITag>(null)
  const [tags, setTags] = useState<ITag[]>([])

  const [meta, setMeta] = useState({
    page: parseInt(searchParams.get('page') || '1', 10),
    pageSize: parseInt(searchParams.get('pageSize') || '10', 10),
    total: 0,
    s: searchParams.get('s') || ''
  })

  // Sử dụng hook phân trang
  const { handleOnPageChange } = usePagination(meta)

  // Lấy dữ liệu từ API (giả sử useTags là một hook để lấy data từ API)
  const { data, isLoading, isFetching, error, refetch } = useTags(meta)

  console.log(isLoading)
  useEffect(() => {
    // Cập nhật lại trạng thái meta khi searchParams thay đổi
    setMeta((prevMeta) => ({
      ...prevMeta,
      page: parseInt(searchParams.get('page') || '1', 10),
      pageSize: parseInt(searchParams.get('pageSize') || '10', 10),
      s: searchParams.get('s') || ''
    }))
  }, [searchParams])

  useEffect(() => {
    // Cập nhật lại dữ liệu tags và meta khi API trả về
    if (data?.tags.data.data.datas && Array.isArray(data.tags.data.data.datas)) {
      setTags(data.tags.data.data.datas)
      setMeta((prevMeta) => ({
        ...prevMeta,
        page: data.tags.data.data.page,
        pageSize: data.tags.data.data.pageSize,
        // total: data.tags.data.data.total,
        s: prevMeta.s
      }))
    } else {
      setTags([])
    }
  }, [data]) // Khi data thay đổi, cập nhật tags và meta
  const handleInputSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value) // Gọi hàm debounce khi input thay đổi
  }
  const handleSearch = async (s: string) => {
    const newMeta = { ...meta, page: 1, s: s }
    // setMeta((prevMeta) => ({ ...prevMeta, page: 1, s: s }))
    setSearchParams({
      page: newMeta.page.toString(),
      pageSize: newMeta.pageSize.toString(),
      s: newMeta.s
    })
  }
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      const newMeta = { ...meta, page: 1, s: value }
      console.log(value)
      setSearchParams({
        ...searchParams,
        page: newMeta.page.toString(),
        pageSize: newMeta.pageSize.toString(),
        s: newMeta.s
      })
    }, 1000), // Thời gian debounce 1000ms
    [] // Đảm bảo khi selectedAuthors thay đổi, hàm debounce mới được tạo lại
  )
  return (
    <Layout className='w-auto hhiii'>
      <div className='flex justify-end gap-2 mr-4'>
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
        <Link to='addTag'>
          <Button type='primary'>New</Button>
        </Link>
      </div>
      <div className='flex justify-between w-auto items-center'>
        <Table<ITag>
          pagination={{
            current: meta.page,
            pageSize: meta.pageSize,
            // total: meta.total,
            total: data?.tags.data.data.total,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            onChange: handleOnPageChange // Gọi hàm phân trang khi thay đổi trang
          }}
          columns={columns} // Các cột của bảng
          dataSource={tags} // Dữ liệu cho bảng
          rowKey='id'
          loading={isFetching}
          scroll={{ y: 'calc(100vh - 150px)' }}
          sticky
        />
      </div>
      <DeleteTag
        setIsModalDeleteOpen={setIsModalDeleteOpen}
        dataDelete={dataDelete}
        isModalDeleteOpen={isModalDeleteOpen}
      />
    </Layout>
  )
}

export default TestPostL1
