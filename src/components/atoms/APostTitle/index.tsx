import React from 'react'

// Khai báo kiểu cho các props của thành phần Title
interface TitleProps {
  text: string
}

const ATitlePost: React.FC<TitleProps> = ({ text }) => <h2>{text}</h2>

export default ATitlePost
