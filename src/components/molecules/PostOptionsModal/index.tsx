import React, { useState } from 'react'
import { Modal, Button } from 'antd'
import { Link } from 'react-router-dom'
import { DeletePostButton } from '../../organisms'

interface PostOptionsModalProps {
  isOpen: boolean
  onCancel: () => void
  selectedItemId?: string | number | undefined // `selectedItemId` có thể null/undefined
  onClose: () => void // Hàm đóng modal
}

const PostOptionsModal: React.FC<PostOptionsModalProps> = ({ isOpen, onCancel, selectedItemId, onClose }) => {
  return (
    <Modal
      title='Post Options'
      open={isOpen}
      onCancel={onCancel}
      footer={[
        <Button key='edit' type='link' disabled={!selectedItemId}>
          <Link to={`${selectedItemId}/edit`} style={{ pointerEvents: !selectedItemId ? 'none' : 'auto' }}>
            Edit
          </Link>
        </Button>,
        <DeletePostButton key='delete' selectedItemId={selectedItemId} onClose={onClose} />
      ]}
    />
  )
}

export default PostOptionsModal
