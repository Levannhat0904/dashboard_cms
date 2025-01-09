// export default EditTag
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Form, Skeleton } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useFetchTagById, useUpdateTag } from '../../../hook/useTag'
import NFormTag from '../../Templates/Tag/NFormTag'
import { ITag } from '../../../utils/AxiosApiServiceLogin'

const EditTag = () => {
  const [form] = Form.useForm()

  const [dataReceived, setDataReceived] = useState(null)
  const { isSuccess, isPending, data, mutate } = useUpdateTag()
  const params = useParams()
  const { mutate: FetchTagById } = useFetchTagById()
  // const [evenEdit, setEvenEdit] = useState(false)
  // useLeavePageConfirm({ hasUnsavedChanges: evenEdit })
  // Lấy dữ liệu từ API khi component mount
  useEffect(() => {
    if (params.id) {
      FetchTagById(
        { id: params.id },
        {
          onSuccess: (response) => {
            console.log('Dữ liệu tag:', response.data.data)
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
      console.log('Cập nhật thành công', data)
      handleNavigate()
    }
  }, [isSuccess, data]) // Chạy khi `isSuccess` hoặc `data` thay đổi

  const handleNavigate = () => {
    navigate(`/dashboard/tag`, { state: dataToSendDashboard })
  }

  const handleFinish = (values: ITag) => {
    console.log('Form update Submitted:', values)
    const id = params.id ?? ''
    // const res = editTag(id, values)
    mutate({ id: id, newData: values })
    // mutate(values)
    if (isSuccess) {
      console.log('cập nhật thành công')
    }
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
