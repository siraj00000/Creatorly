type activeTabComponentType = {
  activeIndex: number
  tabTitle: string
  tabIndex: number
}

export const ActiveTabComponent = (_props: activeTabComponentType) => {
  let isActiveTab = _props.activeIndex === _props.tabIndex
  return (
    <div
      className={`${
        isActiveTab ? 'bg-main' : 'bg-white'
      } p-3 rounded-md w-max shadow-lg cursor-default`}
    >
      <h6
        className={`${
          isActiveTab ? 'text-white text-center' : 'text-main'
        } text-sm capitalize font-medium`}
      >
        {_props.tabTitle}
      </h6>
    </div>
  )
}
