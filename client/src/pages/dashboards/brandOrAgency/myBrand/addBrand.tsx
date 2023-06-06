import AddBrandTabsForm from '../../../../components/forms/AddBrandTabsForm'

type Props = {}

const AddBrand = (props: Props) => {
  return (
    <main className="p-0 md:p-10 w-full">
      <h1 className="text-4xl font-semibold text-main">Add a Brand</h1>

      <AddBrandTabsForm />
    </main>
  )
}

export default AddBrand
