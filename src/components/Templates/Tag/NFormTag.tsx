import { App, Breadcrumb, FormInstance, Layout } from 'antd'
import NFormSection from '../../organisms/NFormSection'
import useCustomNavigate from '../../../hook/useCustomNavigate'
import { ITag } from '../../../interfaces'

interface PageTemplateProps {
  dataReceived?: ITag
  initialValues?: ITag
  form: FormInstance
  handleFinish: (values: object) => void
  isPending: boolean
  autoCreateSlug?: boolean
  // evenEdit: any
  // setEvenEdit: any
}

const NFormTag: React.FC<PageTemplateProps> = ({
  autoCreateSlug,
  dataReceived,
  initialValues,
  form,
  handleFinish,
  isPending
  // evenEdit,
  // setEvenEdit
}) => {
  // const { evenEdit, setEvenEdit } = useEvenEdit()
  // const handleNavigate = usePreventNavigation(evenEdit)
  const navigate = useCustomNavigate()
  const handleNavigate = (to: string) => {
    navigate(to) // Điều hướng đến trang được chỉ định
  }
  return (
    <Layout>
      <Breadcrumb
        className='my-2 mx-2'
        // items={[{ title: <Link to='/dashboard/tag'>Tag</Link> }, { title: dataReceived?.name }]}
        items={[
          {
            title: (
              <span onClick={() => handleNavigate('/dashboard/tag')} style={{ cursor: 'pointer' }}>
                Tag
              </span>
            )
          },
          { title: dataReceived?.name }
        ]}
      />
      {/* {dataReceived ? ( */}
      <App>
        <NFormSection
          autoCreateSlug={autoCreateSlug}
          initialValues={initialValues}
          form={form}
          handleFinish={handleFinish}
          isPending={isPending}
          // evenEdit={evenEdit}
          // setEvenEdit={setEvenEdit}
        />
      </App>
      {/* ) : (
      <p>No data received.</p>
    )} */}
    </Layout>
  )
}

export default NFormTag
