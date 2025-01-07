// components/atoms/SelectAuthor.tsx
import { Avatar, Layout, Select } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { IAsset, IAuthor } from '../../../utils/AxiosApiServiceLogin'
interface ASelectAuthorProps {
  assets: IAsset[] | undefined // Mảng chứa danh sách các tác giả
  selectedAssets: string[] // Mảng chứa ID của các tác giả đã được chọn
  onChange: (selected: string[]) => void // Hàm callback khi danh sách tác giả được chọn thay đổi
}
const selectAuthorComponent = (asset: IAsset) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Avatar style={{ backgroundColor: '#87d068' }} icon={!asset.iconUrl && <UserOutlined />} src={asset.iconUrl} />
    <span style={{ marginLeft: 8 }}>{asset.name}</span>
  </div>
)
const ASelectAasset: React.FC<ASelectAuthorProps> = ({ assets, selectedAssets, onChange }) => (
  <Layout className='flex justify-end my-2 items-end pr-2'>
    <Select
      mode='multiple'
      className='w-10 '
      value={selectedAssets}
      size='large'
      placeholder='Please select'
      onChange={onChange}
      style={{ width: '40%' }}
    >
      {assets?.map((assets) => (
        <Select.Option key={assets.id} value={assets.id}>
          {selectAuthorComponent(assets)}
        </Select.Option>
      ))}
    </Select>
  </Layout>
)

export default ASelectAasset
