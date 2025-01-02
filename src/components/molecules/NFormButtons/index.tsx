import { Form, Space } from 'antd'
import NButtonComponent from '../../atoms/NButton'

interface FormButtonsProps {
  isPending: boolean
}

const NFormButtons: React.FC<FormButtonsProps> = ({ isPending }) => (
  <Form.Item>
    <Space>
      <NButtonComponent loading={isPending} type='primary' htmlType='submit'>
        Submit
      </NButtonComponent>
      <NButtonComponent htmlType='reset'>Reset</NButtonComponent>
    </Space>
  </Form.Item>
)

export default NFormButtons
