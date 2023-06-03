import React, { memo } from 'react'

type AvatarProps = {
  imageURL?: string | null
  title?: string
  sizeX: string
  sizeY: string
}

const Avatar: React.FC<AvatarProps> = ({ imageURL, title, sizeX, sizeY }) => {
  let isImgString = Boolean(imageURL)
  return (
    <span
      className={`w-${sizeX} h-${sizeY} hover:drop-shadow-xl flex justify-center items-center cursor-pointer transition duration-500`}
    >
      {isImgString ? (
        <img
          id="profile-picture"
          className={`w-full h-full rounded-full object-cover ring-2 ring-light`}
          src={imageURL!}
          alt="profile"
        />
      ) : (
        <div
          className={`w-full h-full p-4 rounded-full bg-main text-light flex items-center justify-center text-5xl`}
        >
          <h1>{title && title[0]}</h1>
        </div>
      )}
    </span>
  )
}

export default memo(Avatar)
