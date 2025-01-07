import ATitlePost from '../../atoms/APostTitle'

// components/molecules/PostListHeader.tsx
const PostListHeader = () => (
  <div className='pl-5 sticky top-16 w-[-webkit-fill-available] mt-0 z-20 border-b-1 bg-slate-300 h-12 border-indigo-500 justify-center items-center ml-0 mr-0 gap-x-1 flex flex-row'>
    <div className='basis-7/12'>
      <ATitlePost text='TITLE' />
    </div>
    <div className='basis-1/12'>
      <ATitlePost text='TYPE' />
    </div>
    <div className='basis-2/12'>
      <ATitlePost text='SECTORS' />
    </div>
    <div className='basis-1/12'>
      <ATitlePost text='ASSETS' />
    </div>
    <div className='basis-1/12'>
      <ATitlePost text='ACTION' />
    </div>
  </div>
)

export default PostListHeader
