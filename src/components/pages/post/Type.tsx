import React, { useState } from 'react'
import { Tag, Tooltip } from 'antd'
import { IPostType } from '../../../utils/AxiosApiServiceLogin'
import index from '../../molecules/MFooter/index'

// Định nghĩa Interface cho Tag

// Component để hiển thị danh sách các tag
const TypeList: React.FC<{ types: IPostType[] }> = ({ types }) => {
  const [showMoreTags, setShowMoreTags] = useState(false) // Trạng thái để kiểm soát hiển thị tag ẩn

  // Giới hạn số lượng tag hiển thị
  const maxTags = 2
  const visibleTags = types.slice(0, maxTags)
  const remainingTags = types.slice(maxTags)

  // Hàm trả về biểu tượng dựa trên slug của tag hoặc null nếu không có iconUrl
  const getTagIcon = (slug: string, iconUrl?: string): React.ReactNode => {
    // Nếu không có iconUrl, không hiển thị icon
    if (!iconUrl) {
      return null
    }

    // Nếu có iconUrl, hiển thị icon từ URL
    return <img src={iconUrl} alt={slug} style={{ width: 16, height: 16, marginRight: 8 }} />
  }

  return (
    <div>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        {/* Hiển thị các tag đã giới hạn */}
        {visibleTags &&
          visibleTags.map((tag, index) => (
            <Tooltip key={index} title={`Slug: ${tag.slug}`} placement='top'>
              {tag.name && (
                <Tag
                  icon={getTagIcon(tag.slug as string, tag.iconUrl)}
                  color='#55acee'
                  style={{
                    margin: '5px',
                    display: 'flex',
                    alignItems: 'center', // Cả icon và text sẽ căn chỉnh theo hàng ngang
                    padding: '0 10px',
                    height: '30px'
                  }}
                >
                  {/* Nếu không có iconUrl, chỉ hiển thị text */}
                  {tag.name}
                </Tag>
              )}
            </Tooltip>
          ))}

        {/* Hiển thị các tag còn lại khi "More" được click */}
        {showMoreTags &&
          remainingTags.map((tag) => (
            <Tooltip key={tag.id} title={`Slug: ${tag.slug}`} placement='top'>
              <Tag
                icon={getTagIcon(tag.slug as string, tag.iconUrl)}
                color='#55acee'
                style={{
                  margin: '5px',
                  display: 'flex',
                  alignItems: 'center', // Cả icon và text sẽ căn chỉnh theo hàng ngang
                  padding: '0 10px',
                  height: '30px'
                }}
              >
                {tag.name}
              </Tag>
            </Tooltip>
          ))}

        {/* Hiển thị nút "More" hoặc "Less" nếu có tag bị ẩn */}
        {remainingTags.length > 0 && (
          <Tooltip title={showMoreTags ? 'Click to hide tags' : 'Click to view more tags'} placement='top'>
            <Tag
              color='default'
              key='more'
              onClick={() => setShowMoreTags(!showMoreTags)} // Click để hiển thị/ẩn các tag còn lại
              style={{
                margin: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                backgroundColor: '#f0f0f0',
                borderColor: '#d9d9d9',
                display: 'flex',
                alignItems: 'center', // Cả icon và text sẽ căn chỉnh theo hàng ngang
                padding: '0 10px'
              }}
            >
              {showMoreTags ? 'Less' : `+${remainingTags.length} more`}
            </Tag>
          </Tooltip>
        )}
      </div>
    </div>
  )
}

// Component chính nhận dữ liệu tags qua props
interface AProps {
  types: IPostType[] // Nhận dữ liệu tags từ props
}

const Types: React.FC<AProps> = ({ types = [] }) => {
  return <TypeList types={[types]} />
}

export default Types