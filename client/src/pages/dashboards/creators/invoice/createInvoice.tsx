import { ActionFunctionArgs, useActionData } from 'react-router-dom'
import InvoiceForm from '../../../../components/forms/invoiceForm'
import {
  ApiErrorResponse,
  UploadResponse,
} from '../../../../types/response.types'
import { handleInsertAction } from '../../../../utils/api'
import SuccessAlert from '../../../../components/alerts/successAlert'
import ErrorAlert from '../../../../components/alerts/errorAlert';

const CreateInvoice = () => {
  const actionData = useActionData() as { data: any }
  return (
    <main className="p-5 max-md:pb-24">
      <section className="my-4">
        <ErrorAlert errorMessage={actionData?.data?.error} />
        <SuccessAlert successMessage={actionData?.data?.message} />
      </section>
      <InvoiceForm />
    </main>
  )
}

export default CreateInvoice

const generateFormDataObjects = (formData: FormData) => {
  let fromObject = {
    Name: formData.get('from.Name') as string,
    Email: formData.get('from.Email') as string,
    Address: formData.get('from.Address') as string,
    Phone: formData.get('from.Phone') as string,
    BusinessNumber: formData.get('from.BusinessNumber') as string,
  }

  let toObject = {
    Name: formData.get('to.Name') as string,
    Email: formData.get('to.Email') as string,
    Address: formData.get('to.Address') as string,
    Phone: formData.get('to.Phone') as string,
    Mobile: formData.get('to.Mobile') as string,
    Fax: formData.get('to.Fax') as string,
  }

  return { form: fromObject, to: toObject }
}

export const action = async ({ request }: ActionFunctionArgs) => {
  try {
    const formData = await request.formData()
    let toFromValue = generateFormDataObjects(formData)
    formData.append('from', JSON.stringify(toFromValue.form))
    formData.append('to', JSON.stringify(toFromValue.to))
  
    const response = (await handleInsertAction({
      url: '/api/create-invoice',
      data: formData,
      type: 'multipart/form-data',
    })) as UploadResponse

    return { data: response.data }
  } catch (error) {
    let err = error as ApiErrorResponse
    return err.response
  }
}
