// components/atoms/SelectAuthor.tsx
import { Avatar, Select } from 'antd'
import { UserOutlined } from '@ant-design/icons'
const selectAuthorComponent = (author: any) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Avatar style={{ backgroundColor: '#87d068' }} icon={!author.avatar && <UserOutlined />} src={author.avatar} />
    <span style={{ marginLeft: 8 }}>{author.name}</span>
  </div>
)
const ASelectAuthor = ({ authors, selectedAuthors, onChange }) => (
  <Select
    mode='multiple'
    className='w-10'
    value={selectedAuthors}
    size='large'
    placeholder='Please select'
    onChange={onChange}
    style={{ width: '100%' }}
  >
    {authors.map((author) => (
      <Select.Option key={author.id} value={author.id}>
        {selectAuthorComponent(author)}
      </Select.Option>
    ))}
  </Select>
)

export default ASelectAuthor
