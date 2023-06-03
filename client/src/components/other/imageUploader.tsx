import React, { useState, ChangeEvent } from 'react'
import { BsFillCameraFill } from 'react-icons/bs'

type ImageUploaderProps = {
  currentImageURL?: string
  onUploadImage: (file: File) => void
  profiler?: string
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  currentImageURL,
  onUploadImage,
  profiler,
}) => {
  const [profilePicture, setProfilePicture] = useState<string | undefined>(
    currentImageURL,
  )

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    const reader = new FileReader()

    reader.onload = function (event) {
      setProfilePicture(event.target?.result as string)
    }

    if (file) {
      reader.readAsDataURL(file)
      onUploadImage(file)
    }
  }

  return (
    <React.Fragment>
      <div className="relative w-32 h-32">
        <label
          htmlFor="upload-input"
          className="w-full h-full group hover:bg-gray-200 rounded-full flex justify-center items-center cursor-pointer transition duration-500"
        >
          <input
            type="file"
            name="upload-input"
            className="hidden"
            id="upload-input"
            onChange={handleImageUpload}
          />
          {profilePicture ? (
            <img
              id="profile-picture"
              className="w-32 h-32 rounded-full absolute object-cover object-top"
              src={profilePicture}
              alt="profile"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-main text-light flex items-center justify-center absolute text-5xl">
              <h1>{profiler && profiler[0]}</h1>
            </div>
          )}
          <div className="bg-main scale-100 hover:scale-125 absolute border-2 border-light bottom-0 right-2 rounded-full">
            <BsFillCameraFill
              className="m-2 text-light text-md cursor-pointer"
              title="Upload"
            />
          </div>
        </label>
      </div>
    </React.Fragment>
  )
}

export default ImageUploader
