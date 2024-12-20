import React from 'react'

const HeaderForm: React.FC<{ title: string }> = ({ title }) => (
  <label htmlFor='form-header' className='inline-block mx-auto flex w-full justify-center items-center mb-10 pt-10'>
    <span className='text-4xl'>{title}</span>
  </label>
)

export default HeaderForm
