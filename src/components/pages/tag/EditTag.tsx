// export default EditTag
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Skeleton } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useFetchTagById, useUpdateTag } from '../../../hook/useTag'
import NFormTag from '../../Templates/Tag/NFormTag'
import { ITag } from '../../../interfaces'
import { useEvenEdit } from '../../../contexts/EventContext'

const EditTag = () => {
  const [form] = Form.useForm()
  const { setIsEdit } = useEvenEdit() // Lấy dữ liệu từ context
  const [dataReceived, setDataReceived] = useState(null)
  const { isSuccess, isPending, data, mutate } = useUpdateTag()
  const params = useParams()
  const { mutate: FetchTagById } = useFetchTagById()
  // useLeavePageConfirm({ hasUnsavedChanges: evenEdit })
  // Lấy dữ liệu từ API khi component mount
  useEffect(() => {
    if (params.id) {
      FetchTagById(
        { id: params.id },
        {
          onSuccess: (response) => {
            setDataReceived(response.data.data)
          },
          onError: (error) => {
            console.error('Lỗi khi lấy dữ liệu:', error)
          }
        }
      )
    }
  }, [params.id, FetchTagById])

  const navigate = useNavigate()
  const dataToSendDashboard = true

  useEffect(() => {
    if (isSuccess) {
      handleNavigate()
    }
  }, [isSuccess, data]) // Chạy khi `isSuccess` hoặc `data` thay đổi

  const handleNavigate = () => {
    navigate(`/dashboard/tag`, { state: dataToSendDashboard })
  }

  const handleFinish = (values: ITag) => {
    const id = params.id ?? ''
    // const res = editTag(id, values)
    mutate({ id: id, newData: values })
    setIsEdit(false)
    // mutate(values)
  }

  const initialValues = dataReceived || {}
  if (!dataReceived) {
    return (
      <div>
        <Skeleton className='w-full' active />;
        <Skeleton className='w-full' active />;
        <Skeleton className='w-full' active />;
      </div>
    ) // Hoặc có thể hiển thị một component loading
  }

  return (
    <NFormTag
      dataReceived={dataReceived}
      initialValues={initialValues}
      form={form}
      handleFinish={handleFinish}
      isPending={isPending}
      // evenEdit={evenEdit}
      // setEvenEdit={setEvenEdit}
    />
  )
}

export default EditTag
