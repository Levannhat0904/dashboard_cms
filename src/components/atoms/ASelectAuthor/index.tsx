import React from 'react'
import { Avatar, Select, Tooltip } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { IAsset, IAuthor } from '../../../interfaces'

interface FilterSelectProps {
  items: IAsset[] | IAuthor[] | undefined // Mảng chứa danh sách item
  selectedItems: string[] // Mảng chứa ID của các item đã được chọn
  onChange?: (selected: string[]) => void // Hàm callback khi danh sách item được chọn thay đổi
  placeholder?: string // Placeholder cho Select
}

const selectItemComponent = (item: IAsset[] | IAuthor[] | undefined) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Avatar
      // (user as IAuthor)
      style={{ backgroundColor: '#87d068' }}
      icon={!(item as IAuthor).avatar && !(item as IAsset).iconUrl && <UserOutlined />}
      src={(item as IAuthor).avatar || (item as IAsset).iconUrl}
    />
    <span style={{ marginLeft: 8 }}>{(item as IAsset).name}</span>
  </div>
)

const FilterSelect: React.FC<FilterSelectProps> = ({
  items,
  selectedItems,
  onChange,
  placeholder = 'Please select'
}) => (
  <div className='w-60'>
    <Select
      mode='multiple'
      value={selectedItems}
      size='large'
      maxTagCount={1}
      style={{ width: '100%' }}
      placeholder={placeholder}
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
      {items?.map((item) => (
        <Select.Option key={item.id} value={item.id}>
          {selectItemComponent(item)}
        </Select.Option>
      ))}
    </Select>
  </div>
)

export default FilterSelect
