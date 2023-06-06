import React from 'react'
import { ProfileDataType } from '../../types/linkTree.types'
import Avatar from '../other/avatar'
import TagComp from '../forms/createCampaignForms/PreviewComponents/TagComp'
import TagListComp from '../forms/createCampaignForms/PreviewComponents/TagListComp'
import { NavLink } from 'react-router-dom';
import TitlebarComponent from '../other/titlebar';

const ProfileTemplate = ({
  creatorOnlinePressence,
  getUserName,
  profile,
}: ProfileDataType) => {
  return (
    <aside className="w-3/4 mb-16">
      <TitlebarComponent title='Creator Profile' />

      <section className="flex items-center justify-between space-x-5">
        <div className="flex items-center space-x-5">
          <Avatar
            imageURL={profile?.profile_image_url}
            title={getUserName?.userName[0]}
            sizeX="40"
            sizeY="32"
          />

          <div className="">
            <h2 className="text-xl font-bold ">{getUserName?.userName}</h2>
            <p className="text-md font-medium ">
              {creatorOnlinePressence?.instagramUserName}
            </p>
          </div>
        </div>

        {/* this button */}
        <NavLink 
          to={'/single-creator-campaign/create'}  
          className="ml-auto flex items-center justify-center gap-2 ease-in duration-300 hover:-translate-y-1 hover:scale-110 border-1 border-main bg-main text-white font-medium rounded-full p-3 px-5 "
        >
          Collab with me
        </NavLink>
      </section>

      <section className="my-5 py-4 px-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-black mb-4">Personal</h1>

        <aside className="flex flex-col gap-4">
          <TagComp label="Email" value={profile?.contact_email} />
          <TagComp label="Phone" value={getUserName?.phoneNumber} />
          <div className="flex items-center justify-between flex-wrap gap-4 w-3/4">
            <TagComp label="Gender" value={profile?.gender} />
            <TagComp label="DOB" value={profile?.date_of_birth?.split('T')[0]} />
          </div>
        </aside>
      </section>

      <section className="my-5 py-4 px-4 border-b border-gray-200">
        <h1 className="text-xl font-semibold text-black mb-4">
          Profile Details
        </h1>

        <aside className="flex flex-col gap-4">
          <TagListComp label="Category" tagList={profile?.category!} />
          <div className="flex items-center justify-between flex-wrap gap-4 w-3/4">
            <TagComp label="Region" value={profile?.region} />
          </div>
          <TagListComp label="Language" tagList={profile?.languages!} />
        </aside>
      </section>

      <section className="my-5 py-4 px-4">
        <TagComp label="About" value={profile?.about} />
      </section>
    </aside>
  )
}

export default ProfileTemplate
