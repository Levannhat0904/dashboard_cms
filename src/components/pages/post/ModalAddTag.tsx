import { Button, Form, GetProp, Image, Input, Modal, Space, Upload, UploadFile, UploadProps } from 'antd'
import React, { useState } from 'react'
import { PlusOutlined, UploadOutlined } from '@ant-design/icons'
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0]
interface ModalAddTagProps {
  isModalOpen: boolean // Whether the modal is visible or not
  setIsModalOpen: (visible: boolean) => void // Function to set the modal visibility
}
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
const ModalAddTag: React.FC<ModalAddTagProps> = ({ isModalOpen, setIsModalOpen }) => {
  const [form] = Form.useForm()
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  // Handle file preview
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType)
    }

    setPreviewImage(file.url || (file.preview as string))
    setPreviewOpen(true)
  }

  // Handle file list change (only allowing one file to be uploaded)
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1)) // Keep only the latest file in the file list
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type='button'>
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  )

  return (
    <div>
      <Modal title='Basic Modal' open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form
          form={form}
          name='validateOnly'
          layout='vertical' // Horizontal layout
          // onFinish={handleFinish}
          autoComplete='off'
        >
          {/* Name Field */}
          <Form.Item name='name' label='Name' rules={[{ required: true, message: 'Please enter a name' }]}>
            <Input />
          </Form.Item>

          {/* Slug Field */}
          <Form.Item name='slug' label='Slug' rules={[{ required: true, message: 'Please enter a slug' }]}>
            <Input />
          </Form.Item>

          {/* Group Field */}
          <Form.Item name='group' label='Group' initialValue='TAG'>
            <Input disabled />
          </Form.Item>

          {/* Description Field */}
          <Form.Item name='description' label='Description'>
            <Input.TextArea />
          </Form.Item>

          {/* Feature Image Field */}
          <Form.Item name='featureImage' label='Feature Image'>
            <Upload action='/upload' listType='picture-card' showUploadList={false}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          {/* Icon URL Field */}
          <Form.Item name='iconUrl' label='Icon URL'>
            <Input />
          </Form.Item>

          {/* Meta Description Field */}
          <Form.Item name='metaDescription' label='Meta Description'>
            <Input.TextArea />
          </Form.Item>

          {/* Meta Title Field */}
          <Form.Item name='metaTitle' label='Meta Title'>
            <Input />
          </Form.Item>

          {/* OG Description Field */}
          <Form.Item name='ogDescription' label='OG Description'>
            <Input.TextArea />
          </Form.Item>

          {/* OG Image Field */}
          {/* <Form.Item name='ogImage' label='OG Image'>
              <Upload name='logo' action='/upload.do' listType='picture'>
                <Button icon={<UploadOutlined />}>Click to upload</Button>
              </Upload>
            </Form.Item> */}
          {/* OG Title Field */}
          {/* OG Image Upload Field */}
          <Form.Item name='ogImage' label='OG Image' valuePropName='fileList'>
            <Upload
              name='ogImage'
              action='/upload.do'
              listType='picture-card'
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
              showUploadList={{ showRemoveIcon: true, showPreviewIcon: true }}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
          </Form.Item>

          {/* Display Image Preview */}
          {previewImage && (
            <Image
              preview={{
                visible: previewOpen,
                onVisibleChange: (visible) => setPreviewOpen(visible),
                afterOpenChange: (visible) => !visible && setPreviewImage('')
              }}
              src={previewImage}
              style={{ maxWidth: '200px' }}
            />
          )}
          <Form.Item name='ogTitle' label='OG Title'>
            <Input />
          </Form.Item>

          {/* Twitter Description Field */}
          <Form.Item name='twitterDescription' label='Twitter Description'>
            <Input.TextArea />
          </Form.Item>

          {/* Twitter Image Field */}
          <Form.Item name='twitterImage' label='Twitter Image'>
            <Upload action='/upload' listType='picture-card' showUploadList={false}>
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>

          {/* Twitter Title Field */}
          <Form.Item name='twitterTitle' label='Twitter Title' style={{ display: 'block', marginRight: '16px' }}>
            <Input />
          </Form.Item>

          {/* Submit and Reset Buttons */}
          <Form.Item>
            <Space>
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
              <Button htmlType='reset'>Reset</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default ModalAddTag
