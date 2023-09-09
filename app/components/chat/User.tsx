import { TConverstation, TUserWithChat } from '@/types'
import React from 'react'
import Avatar from '../Avatar'
import { fromNow } from '@/helpers/dayjs'

interface UserProps {
  user: TUserWithChat
  currentUserId: string
}

const User = ({
  user,
  currentUserId,
}: UserProps) => {
  const messageWithCurrentUser = user.conversations.find((conversation: TConverstation) =>
    conversation.users.find((user) => user.id === currentUserId)
  );

  const latestMessage = messageWithCurrentUser?.messages.slice(-1)[0]

  return (
    <div className='grid grid-cols-[40px_1fr_50px] grid-rows-[40px] gap-3 py-3 px-4 border-b-[px] hover:cursor-pointer hover:bg-orange-500'>
      <div className=''>
        <Avatar src={user.image} />
      </div>
      <div>
        <h3>{user.name}</h3>
        {latestMessage && <p className='overflow-hidden text-xs font-medium text-gray-600 break-words whitespace-pre-wrap'>{latestMessage.text}</p>}
        {latestMessage && latestMessage.image &&
        <p className=' text-xs font-medium text-gray-600'>[이미지]</p>
        }
      </div>
      <div>
        {latestMessage && (
          <p>
            {fromNow(latestMessage.createdAt)}
          </p>
        )}
      </div>
    </div>
  )
}

export default User