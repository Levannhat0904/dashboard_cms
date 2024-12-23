import { MessageInstance } from 'antd/es/message/interface'

export const ACCESS_TOKEN = 'accessToken'
// export const showMessage = (type: 'success' | 'error', content: React.ReactNode, messageApi: MessageInstance) => {
//   messageApi.open({
//     type: type,
//     content: content
//   })
// }

export const showMessage = (
  type: 'success' | 'error',
  content: React.ReactNode,
  messageApi: MessageInstance
): Promise<void> => {
  return new Promise((resolve) => {
    const duration = 2; // Thời gian hiển thị thông báo (giây)
    messageApi.open({
      type: type,
      content: content,
      duration: duration,
      onClose: resolve // Gọi resolve khi thông báo đóng
    });
  });
};
