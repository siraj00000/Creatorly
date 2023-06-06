import { SingleCampaignFormProps } from '../../../types/campaignForm.types'

const SingleCreatorProductDetailsForm = ({
  activeTab,
  incrementTab,
  decrementTab,
  onChange,
  updateStatus,
  formRef,
}: SingleCampaignFormProps) => {
  const onNext = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const budget = e.currentTarget.elements.namedItem(
      'budget',
    ) as HTMLInputElement

    const productLink = e.currentTarget.elements.namedItem(
      'product_link',
    ) as HTMLTextAreaElement

    const requiredFields = [
      { field: 'Budget', value: budget.value },
      { field: 'Product Link', value: productLink.value },
    ]

    for (const requiredField of requiredFields) {
      if (!requiredField.value) {
        updateStatus({
          errorMessage: `${requiredField.field} is required`,
          successMessage: '',
        })

        // scroll to the top of the form
        formRef && formRef.current?.scrollIntoView({ behavior: 'smooth' })
        return
      }
    }

    // Validate the product link format using regex
    const productLinkRegex = /^https?:\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/
    if (!productLinkRegex.test(productLink.value)) {
      updateStatus({
        errorMessage: 'Product link is not valid',
        successMessage: '',
      })

      // scroll to the top of the form
      formRef && formRef.current?.scrollIntoView({ behavior: 'smooth' })
      return
    }

    if (incrementTab && requiredFields.every((field) => field.value)) {
      updateStatus({
        errorMessage: ``,
        successMessage: '',
      })
      incrementTab()
    }
  }
  let isActiveTab = activeTab === 1
  return (
    <main className={`${isActiveTab ? 'flex' : 'hidden'}`}>
      <form className="w-full" onSubmit={onNext}>
        <section className="flex flex-col gap-3">
          <div className="w-full relative">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Budget
            </label>
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type={'number'}
              name={'budget'}
              placeholder={'Expected Budget'}
              onChange={onChange}
            />
          </div>

          <div className="w-full relative">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Product Link
            </label>
            <input
              className="appearance-none block w-full text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type={'text'}
              name={'product_link'}
              placeholder={'Landing Page'}
              onChange={onChange}
            />
          </div>

          <div className="w-full relative">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              About Product
            </label>
            <textarea
              className="appearance-none block w-full h-24 resize-none text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name={'about_product'}
              placeholder={`Tell us about your product`}
              onChange={onChange}
            ></textarea>
          </div>
        </section>
        <section className="w-full flex items-center justify-between my-10">
          <button
            disabled={!isActiveTab}
            onClick={decrementTab}
            type="button"
            className={`${
              !isActiveTab ? 'bg-gray-200 cursor-not-allowed' : 'bg-main'
            } text-white mr-auto flex items-center justify-center gap-2 ease-in duration-300 hover:-translate-y-1 hover:scale-110 font-medium rounded-full p-3 px-5`}
          >
            Back
          </button>
          <button
            disabled={!isActiveTab}
            type="submit"
            className={`${
              !isActiveTab ? 'bg-gray-200 cursor-not-allowed' : 'bg-main'
            } text-white ml-auto flex items-center justify-center gap-2 ease-in duration-300 hover:-translate-y-1 hover:scale-110 font-medium rounded-full p-3 px-5`}
          >
            Next
          </button>
        </section>
      </form>
    </main>
  )
}

export default SingleCreatorProductDetailsForm
