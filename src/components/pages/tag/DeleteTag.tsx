import React, { useEffect } from 'react'
import { Modal } from 'antd'
import { useDeleteTag } from '../../../hook/useTag'
import { ITag } from '../../../interfaces'
interface DeleteTagProps {
  isModalDeleteOpen: boolean
  setIsModalDeleteOpen: (v: boolean) => void
  dataDelete: null | ITag
}

const DeleteTag: React.FC<DeleteTagProps> = ({ isModalDeleteOpen, setIsModalDeleteOpen, dataDelete }) => {
  const { isSuccess, isPending, mutate } = useDeleteTag()

  const handleOk = () => {
    const id = dataDelete?.id ?? ''
    // mutate({ id })
    mutate({ id: id })
  }
  useEffect(() => {
    if (isSuccess) {
      setIsModalDeleteOpen(isPending)
    }
  }, [isSuccess])

  const handleCancel = () => {
    setIsModalDeleteOpen(false)
  }

  return (
    <>
      <Modal
        confirmLoading={isPending}
        title='Delete the task'
        open={isModalDeleteOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Are you sure to delete this tag?</p>
      </Modal>
    </>
  )
}

export default DeleteTag
