import { App, Breadcrumb, Layout } from 'antd'
import { Link } from 'react-router-dom'
import NFormSection from '../../organisms/NFormSection'

interface PageTemplateProps {
  dataReceived?: any
  initialValues?: any
  form: any
  handleFinish: (values: any) => void
  isPending: boolean
  autoCreateSlug?: boolean
}

const NFormTag: React.FC<PageTemplateProps> = ({
  autoCreateSlug,
  dataReceived,
  initialValues,
  form,
  handleFinish,
  isPending
}) => (
  <Layout>
    <Breadcrumb items={[{ title: <Link to='/dashboard/tag'>Tag</Link> }, { title: dataReceived?.name }]} />
    {/* {dataReceived ? ( */}
    <App>
      <NFormSection
        autoCreateSlug={autoCreateSlug}
        initialValues={initialValues}
        form={form}
        handleFinish={handleFinish}
        isPending={isPending}
      />
    </App>
    {/* ) : (
      <p>No data received.</p>
    )} */}
  </Layout>
)

export default NFormTag
