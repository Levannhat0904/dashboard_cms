import { StarOutlined, LikeOutlined, MessageOutlined } from '@ant-design/icons'
import IconText from '../../atoms/AIconTextPost'

const PostActions = () => {
  const actions = [
    { icon: StarOutlined, text: '156', key: 'list-vertical-star-o' },
    { icon: LikeOutlined, text: '156', key: 'list-vertical-like-o' },
    { icon: MessageOutlined, text: '2', key: 'list-vertical-message' }
  ]
  return actions.map(({ icon, text, key }) => <IconText icon={icon} text={text} key={key} />)
}
export default PostActions
