import React from 'react'
import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'

const NotFound: React.FC = () => (
  <div className='w-screen h-screen flex justify-center items-center'>
    <Result
      status='404'
      title='404'
      subTitle='Sorry, the page you visited does not exist.'
      extra={
        <Link to='/dashboard'>
          <Button type='primary'>Back Home</Button>
        </Link>
      }
    />
  </div>
)

export default NotFound
