import React, { useEffect } from 'react'
import { Form } from 'antd'

import { useAddTag } from '../../../hook/useTag'
import { useNavigate } from 'react-router-dom'
import NFormTag from '../../Templates/Tag/NFormTag'

const AddTag = () => {
  const [form] = Form.useForm()
  const { isSuccess, isPending, data, mutate } = useAddTag()
  const navigate = useNavigate()
  const dataToSend = data?.data.data

  const handleNavigate = () => {
    // Sử dụng navigate và truyền state
    navigate(`/dashboard/tag/edit/${data?.data.data.id}`, { state: dataToSend })
  }
  const handleFinish = (values: object) => {
    mutate(values)
  }
  useEffect(() => {
    if (isSuccess) {
      handleNavigate()
    }
  })
  return <NFormTag autoCreateSlug={true} form={form} handleFinish={handleFinish} isPending={isPending} />
}

export default AddTag
