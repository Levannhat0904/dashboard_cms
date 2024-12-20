import { MessageInstance } from 'antd/es/message/interface'

export const ACCESS_TOKEN = 'accessToken'
export const showMessage = (type: 'success' | 'error', content: React.ReactNode, messageApi: MessageInstance) => {
  messageApi.open({
    type: type,
    content: content
  })
}
