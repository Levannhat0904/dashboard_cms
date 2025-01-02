import React, { useEffect } from 'react'
import { Modal } from 'antd'
import { ITag } from '../../../utils/AxiosApiServiceLogin'
import { useDeleteTag } from '../../../hook/useTag'
interface DeleteTagProps {
  isModalDeleteOpen: boolean
  setIsModalDeleteOpen: (v: boolean) => void
  dataDelete: null | ITag
}

const DeleteTag: React.FC<DeleteTagProps> = ({ isModalDeleteOpen, setIsModalDeleteOpen, dataDelete }) => {
  console.log('dataDelete: ', dataDelete?.id)
  const { isSuccess, isPending, data, mutate } = useDeleteTag()

  const handleOk = () => {
    const id = dataDelete?.id
    // mutate({ id })
    mutate({ id: id })
  }
  useEffect(() => {
    if (isSuccess) {
      setIsModalDeleteOpen(isPending) //lỗi
    }
  }, [isPending])

  const handleCancel = () => {
    setIsModalDeleteOpen(false)
  }

  return (
    <>
      <Modal
        confirmLoading={isPending}
        title='Basic Modal'
        open={isModalDeleteOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
      </Modal>
    </>
  )
}

export default DeleteTag
