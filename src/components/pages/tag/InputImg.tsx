import React, { useState, useEffect } from 'react'
import { Form, Upload, UploadFile, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useUploadImage } from '../../../hook/useUploadImage'
interface InputImgProps {
  name: string
  label: string
  form: any
  initialValues?: any
}

const InputImg: React.FC<InputImgProps> = ({ name, label, initialValues, form }) => {
  // const [fileList, setFileList] = useState<any[]>([])
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const { mutate, isPending, isError, isSuccess, error, data } = useUploadImage()
  // Xử lý khi thay đổi file (upload)
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList)
    const file = newFileList[newFileList.length - 1]?.originFileObj
    if (file) {
      mutate(file) // Gọi mutate để tải ảnh lên
    }
  }
  const defaultFileList = initialValues?.featureImage
    ? ([
        {
          uid: '-1', // UID duy nhất cho file
          name: 'feature-image.jpg', // Tên file
          status: 'done', // Trạng thái là 'done' khi đã có ảnh
          url: initialValues.featureImage // URL ảnh từ initialValues
        }
      ] as UploadFile<any>[])
    : []
  // setFileList(defaultFileList)
  useEffect(() => {
    setFileList(defaultFileList)
  }, [])
  console.log(defaultFileList)
  // Sử dụng useEffect để theo dõi trạng thái và hiển thị thông báo
  useEffect(() => {
    if (isSuccess && data) {
      form.setFieldsValue({ [name]: data }) // Lưu URL ảnh vào form
      console.log('URL ảnh tải lên:', data) // Dữ liệu trả về là URL của ảnh
    }
  }, [isPending, isError, isSuccess, data, error, form])

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  )
  console.log('featureImage', initialValues)

  return (
    <Form.Item label={label} name={name}>
      <Upload
        listType='picture-card'
        fileList={fileList}
        maxCount={1}
        onChange={handleChange}
        beforeUpload={() => false} // Ngừng tải ảnh tự động, xử lý thủ công
      >
        {uploadButton}
      </Upload>
    </Form.Item>
  )
}

export default InputImg
