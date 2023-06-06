import CreatorOnlinePresenceForm from '../../../components/forms/CreatorOnlinePresenceForm'

type Props = {}

const CreatorOnBoardingPage = (props: Props) => {
  return (
    <main className="p-0 md:p-10 max-md:pb-[50%] w-full">
      <h1 className="text-3xl font-semibold text-main">Welcome</h1>
      <CreatorOnlinePresenceForm />
    </main>
  )
}

export default CreatorOnBoardingPage