import { FloatButton } from 'antd'
import { FileAddOutlined } from '@ant-design/icons'

interface FloatAddButtonProps {
  onClick: () => void
}

const FloatAddButton: React.FC<FloatAddButtonProps> = ({ onClick }) => (
  <FloatButton icon={<FileAddOutlined />} onClick={onClick} />
)

export default FloatAddButton
