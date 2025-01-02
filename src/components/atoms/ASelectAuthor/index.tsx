// components/atoms/SelectAuthor.tsx
import { Avatar, Layout, Select } from 'antd'
import { UserOutlined } from '@ant-design/icons'
const selectAuthorComponent = (author: any) => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Avatar style={{ backgroundColor: '#87d068' }} icon={!author.avatar && <UserOutlined />} src={author.avatar} />
    <span style={{ marginLeft: 8 }}>{author.name}</span>
  </div>
)
const ASelectAuthor = ({ authors, selectedAuthors, onChange }) => (
  <Layout className='flex justify-end my-2 items-end pr-2'>
    <Select
      mode='multiple'
      className='w-10 '
      value={selectedAuthors}
      size='large'
      placeholder='Please select'
      onChange={onChange}
      style={{ width: '40%' }}
    >
      {authors.map((author) => (
        <Select.Option key={author.id} value={author.id}>
          {selectAuthorComponent(author)}
        </Select.Option>
      ))}
    </Select>
  </Layout>
)

export default ASelectAuthor
