// components/molecules/PostListItem.tsx
import { Layout, List } from 'antd'
import { EditOutlined } from '@ant-design/icons'
import UserAvatarTooltip from '../../atoms/UserAvatar'
import Tags from '../../atoms/Tags'
import AView from '../../atoms/AView'
import { IPost } from '../../../interfaces'
// Định nghĩa kiểu cho item
interface PostListItemProps {
  item: IPost
}
const PostListItem: React.FC<PostListItemProps> = ({ item }) => (
  <List.Item key={item.title}>
    <List.Item.Meta className='pl-0' />
    <Layout className='flex pl-2 flex-row'>
      <Layout className='basis-7/12'>
        <AView title='Title' value={item.title} />
        <AView title='Excerpt' value={item.excerpt} />
        <AView className='flex items-center' title='Auth' value={<UserAvatarTooltip users={item.authors} />} />
        <AView className='flex items-center' title='Tags' value={<Tags tags={item.tags || []} />} />
      </Layout>
      <Tags className='basis-1/12' tags={item.postType ? [item.postType] : []} />
      <Tags className='basis-2/12' tags={item.sectors || []} />
      <AView className='basis-1/12' value={<UserAvatarTooltip className='' users={item.assets} />} />
      <AView className='basis-1/12 flex justify-center items-start' value={<EditOutlined />} />
    </Layout>
  </List.Item>
)

export default PostListItem
