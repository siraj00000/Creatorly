import { AboutMyBrand } from '../../types/loader.types'

type Props = {
  myBrands: AboutMyBrand[]
}

const MyBrandCard = ({ myBrands }: Props) => {
  return (
    <section className="my-10 grid md:grid-cols-2 grid-cols-1 gap-5">
      {myBrands.map((item, index) => (
        <div
          key={index}
          className="w-full grid grid-cols-3 gap-5 rounded-lg overflow-hidden shadow-lg p-2"
        >
          <img
            className="w-20 h-20 col-span-1 m-auto rounded-full object-cover"
            src={item.company_logo}
            alt={item.company_name}
          />
          <div className="w-full col-span-2">
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{item.company_name}</div>
              <p className="text-gray-700 text-base">
                {item.about_brand.substring(0, 30)}
              </p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
                {item.country}
              </span>
            </div>
          </div>
        </div>
      ))}
    </section>
  )
}

export default MyBrandCard
