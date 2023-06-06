import React from 'react'
import { LoaderFunctionArgs, defer, useLoaderData } from 'react-router-dom'
import { handleFetchAction } from '../../utils/api'
import { GetResponse } from '../../types/response.types'
import { LinkTreeResponseTypes } from '../../types/linkTree.types'
import { encryptData } from '../../utils/encryption'

const CreatorLinkTree = () => {
  const { linkTree } = useLoaderData() as { linkTree: LinkTreeResponseTypes }

  const setLinkTreeRoutes = () => {
    const encryptedKey = encryptData(linkTree.creatorOnlinePresence.user)
    sessionStorage.setItem('_#@ena', encryptedKey)
  }
  return (
    <aside className="w-full h-screen flex flex-col items-center gap-10 p-10 bg-main bg-opacity-70">
      <section className="flex flex-col items-center gap-10">
        <div className="w-24 pl-2">
          {linkTree?.userProfile?.profile_image_url ? (
            <img
              id="profile-picture"
              className={`w-16 h-16 scale-150 rounded-full object-cover ring-2 ring-light`}
              src={linkTree?.userProfile?.profile_image_url}
              alt="profile"
            />
          ) : (
            <div
              className={`w-16 h-16 scale-150 p-4 rounded-full bg-main text-light flex items-center justify-center text-5xl`}
            >
              <h1>{linkTree?.creatorOnlinePresence?.instagramUserName[0]}</h1>
            </div>
          )}
        </div>
        <h1 className="text-xl text-black font-semibold bg-light p-2 rounded-md">
          Hi, I'm {linkTree.creatorOnlinePresence.instagramUserName}
        </h1>
      </section>

      <section className="w-full flex flex-col items-center gap-3">
        {linkTree.creatorLinkTree.customLink.map(({ _id, link, title }) => (
          <a
            key={_id}
            href={link}
            target="_blank"
            rel="noreferrer"
            className="bg-light text-center text-main font-semibold capitalize max-w-lg p-4 rounded-xl hover:shadow-md scale-100 hover:scale-110 hover:delay-75 w-full"
          >
            {title}
          </a>
        ))}
        <a
          href={'/signup/brand'}
          onClick={setLinkTreeRoutes}
          className="bg-light text-center text-main font-semibold capitalize max-w-lg p-4 rounded-xl w-full scale-100 hover:scale-110 hover:delay-75"
        >
          colab with me
        </a>
      </section>

      <section>
        <p className="text-light font-medium text-lg text-center">Creatorly</p>
      </section>
    </aside>
  )
}

export default CreatorLinkTree

export const linkTreeLoader = async ({ params }: LoaderFunctionArgs) => {
  const { username } = params
  const response = (await handleFetchAction({
    url: `/api/creator-online-presence/${username}`,
  })) as GetResponse

  return defer({ linkTree: response.data.data })
}
