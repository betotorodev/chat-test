'use client'

import { AddIcon } from '@/icons/add'
import { useCurrentChatStore, useUserStore } from '@/app/store'
import { useEffect, useState } from 'react'
import { getChats } from '@/lib/db/queries'
import { formatTime } from '@/lib/utils'
import { addChat, editChat } from '@/app/actions'
import { Badge } from '@/components/badge'

export function Header (): JSX.Element {
  const user = useUserStore((state) => state.user)
  const currentChat = useCurrentChatStore((state) => state.currentChat)
  const setCurrentChat = useCurrentChatStore((state) => state.setCurrentChat)
  const [chats, setChats] = useState([])

  const handleAction = async () => {
    if (user === null) {
      return
    }
    const { chat } = await addChat(user.id)
    await editChat(currentChat)
    setCurrentChat(chat)
  }

  useEffect(() => {
    if (user !== null) {
      getChats(user.id)
        .then(chat => {
          setChats(chat)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [user, currentChat])

  return (
    <header className='flex flex-col gap-2 w-52'>
      <nav className='flex items-center border-[#282828] rounded-2xl border p-2'>
        <div className='w-12 h-12 mr-3 rounded-full bg-[#f0f0f0] text-2xl flex items-center justify-center'>
          😎
        </div>
        <div className='flex flex-col gap-1'>
          <h1 className='leading-none'>{user?.user_name ?? 'beto'}</h1>
          <small className='leading-none text-[#959595]'>Súper user</small>
        </div>
      </nav>
      <section className='flex-1 border-[#282828] rounded-2xl border p-4'>
        <form action={handleAction} className='flex justify-between items-center mb-4'>
          <h2 className='text-base'>Chats</h2>
          <button type='submit'>
            <AddIcon />
          </button>
        </form>
        <ul className='flex flex-col gap-2'>
          {
            chats.map((chat, index) => (
              <li onClick={() => setCurrentChat(chat)} key={`chat-${index}`} className='flex flex-col items-center gap-2 p-2 border border-[#282828] rounded-2xl shadow-sm cursor-pointer'>
                <p className='flex justify-between items-center w-full self-start text-sm'>
                  <span>{chat?.list_of_messages[0]?.content ?? 'New chat'}</span>
                  {currentChat.id === chat.id && <Badge variant='success'>current</Badge>}
                </p>
                <small className='self-end text-xs text-[#959595]'>{formatTime(chat.created_at)}</small>
              </li>
            ))
          }
        </ul>
      </section>
    </header>
  )
}
