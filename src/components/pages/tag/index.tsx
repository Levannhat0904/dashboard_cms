import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import React, { useState } from 'react'
import { Avatar, Button, Layout, Space, Table, Input } from 'antd'
import type { TableProps } from 'antd'
import { useTags } from '../../../hook/useTag'
import { usePaginationV2 } from '../../../hook/usePagination'
import DeleteTag from './DeleteTag'
const { Search } = Input
import { DeleteOutlined, EditOutlined, UserOutlined } from '@ant-design/icons'
import useDebouncedSearch from '../../../hook/useDebouncedSearch'
import { ITag } from '../../../interfaces'
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
      render: (record) => (
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
    navigate(`/dashboard/tag/edit/${id}`, { state: dataToSend })
  }
  const [searchParams, setSearchParams] = useSearchParams()
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false)
  const [dataDelete, setDataDelete] = useState<null | ITag>(null)
  const page = parseInt(searchParams.get('page') || '1', 10)
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10)
  const searchQuery = searchParams.get('s') || ''
  const { data, isFetching } = useTags({ page, pageSize, s: searchQuery })
  const { handleOnPageChange } = usePaginationV2()
  const handleInputSearchChange = useDebouncedSearch(setSearchParams, {
    delay: 1000,
    defaultPageSize: 10
  })
  return (
    <Layout className='w-auto hhiii'>
      <div className='flex justify-end gap-2 mr-4 my-3'>
        <Search
          className='h-full ml-4 w-[30%]'
          defaultValue={searchQuery}
          onChange={handleInputSearchChange}
          placeholder='input search text'
          enterButton
        />
        <Link to='addTag'>
          <Button type='primary'>New</Button>
        </Link>
      </div>
      <Layout className='flex justify-between w-auto items-center'>
        <Table<ITag>
          pagination={{
            current: data?.tags.data.data.page,
            pageSize: data?.tags.data.data.pageSize,
            total: data?.tags.data.data.total,
            showSizeChanger: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            onChange: handleOnPageChange
          }}
          columns={columns}
          dataSource={data?.tags.data.data.datas || []} // Sử dụng trực tiếp dữ liệu từ API
          rowKey='id'
          loading={isFetching}
          scroll={{ y: 'calc(100vh - 150px)' }}
          sticky
        />
      </Layout>
      <DeleteTag
        setIsModalDeleteOpen={setIsModalDeleteOpen}
        dataDelete={dataDelete}
        isModalDeleteOpen={isModalDeleteOpen}
      />
    </Layout>
  )
}

export default TestPostL1
