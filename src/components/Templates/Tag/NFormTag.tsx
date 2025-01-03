import { App, Breadcrumb, FormInstance, Layout } from 'antd'
import { Link } from 'react-router-dom'
import NFormSection from '../../organisms/NFormSection'
import { ITag } from '../../../utils/AxiosApiServiceLogin'

interface PageTemplateProps {
  dataReceived?: ITag
  initialValues?: ITag
  form: FormInstance
  handleFinish: (values: object) => void
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
    <Breadcrumb
      className='my-2 mx-2'
      items={[{ title: <Link to='/dashboard/tag'>Tag</Link> }, { title: dataReceived?.name }]}
    />
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
