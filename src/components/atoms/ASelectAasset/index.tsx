// components/atoms/SelectAuthor.tsx
import { Avatar, Select, Tooltip } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { IAsset } from '../../../interfaces'
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
  <div className='w-60'>
    <Select
      mode='multiple'
      value={selectedAssets}
      size='large'
      maxTagCount={1}
      style={{ width: '100%' }}
      placeholder='Please select'
      onChange={onChange}
      maxTagPlaceholder={(omittedValues) => (
        <Tooltip
          title={omittedValues.map(({ label }) => label)} // Nối các nhãn thành chuỗi
          mouseEnterDelay={0.5} // Thêm độ trễ cho tooltip khi hover
        >
          <span>+{omittedValues.length}</span>
        </Tooltip>
      )}
    >
      {assets?.map((assets) => (
        <Select.Option key={assets.id} value={assets.id}>
          {selectAuthorComponent(assets)}
        </Select.Option>
      ))}
    </Select>
  </div>
)

export default ASelectAasset
