import { useSearchParams } from 'react-router-dom'

const useParams = () => {
  const [searchParams] = useSearchParams()

  // Lấy giá trị từ searchParams và chuyển đổi thành kiểu dữ liệu cần thiết
  const page = parseInt(searchParams.get('page') || '1', 10)
  const pageSize = parseInt(searchParams.get('pageSize') || '10', 10)
  const s = searchParams.get('s') || ''
  return { page, pageSize, s }
}

export default useParams
