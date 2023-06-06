import { NavLink } from "react-router-dom";

type Props = {}

const HomePage = (props: Props) => {
  return (
    <div>
      <section className="h-screen bg-main w-full flex flex-col text-center items-center gap-8 justify-center p-2">
        <h1 className="md:text-9xl text-7xl text-white font-semibold">Creatorly.</h1>
        <p className="text-sm text-white max-w-2xl">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis
          corporis modi, harum, id ipsum accusantium quas placeat quidem eius
          nihil atque, obcaecati autem impedit consequuntur ullam porro maxime
          officia? Perspiciatis.
        </p>
        <NavLink to={'Who-you-are'} className="ease-in duration-300 font-semibold text-main bg-white hover:-translate-y-1 hover:scale-110 hover:bg-white py-4 px-5 rounded-full">
          Join Now
        </NavLink>
      </section>
    </div>
  )
}

export default HomePage
