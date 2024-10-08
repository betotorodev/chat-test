'use client'

import { AddIcon } from '@/icons/add'
import { useCurrentChatStore, useUserStore } from '@/app/store'
import { useEffect, useState } from 'react'
import { getChats } from '@/lib/db/queries'
import { formatTime } from '@/lib/utils'
import { addChat, editChat } from '@/app/actions'
import { Badge } from '@/components/badge'
import { Chat } from '@/lib/types'

export function Header (): JSX.Element {
  const user = useUserStore((state) => state.user)
  const currentChat = useCurrentChatStore((state) => state.currentChat)
  const setCurrentChat = useCurrentChatStore((state) => state.setCurrentChat)
  const [chats, setChats] = useState<Chat[]>([])

  const handleAction = async (): Promise<void> => {
    if (user === null) {
      return
    }
    const { chat } = await addChat(user.id)
    if (currentChat !== null) {
      await editChat(currentChat)
    }
    if (chat !== undefined) {
      setCurrentChat(chat)
    }
  }

  const handleChats = async (chat: Chat): Promise<void> => {
    if (currentChat !== null) {
      await editChat(currentChat)
    }
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
        <div className='flex flex-col gap-1 flex-1 overflow-hidden'>
          <h1 className='leading-none truncate'>{user?.user_name ?? 'Leo'}</h1>
          <small className='leading-none text-[#959595]'>Coach</small>
        </div>
      </nav>
      <section className='relative flex-1 border-[#282828] rounded-2xl border overflow-y-scroll'>
        <form action={() => { void handleAction() }} className='sticky top-0 bg-[#141414]/30 backdrop-blur-sm'>
          <div className='flex p-4 pr-0 justify-between items-center'>
            <h2 className='text-base'>Chats</h2>
            <button type='submit'>
              <AddIcon />
            </button>
          </div>
        </form>
        <ul className='flex flex-col gap-2 pl-4'>
          {
            chats.map((chat, index) => (
              <li onClick={() => { void handleChats(chat) }} key={`chat-${index}`} className='flex flex-col items-center gap-2 p-2 border border-[#282828] rounded-2xl shadow-sm cursor-pointer'>
                <div className='flex justify-between items-center gap-1 w-full self-start text-sm h-6'>
                  {chat?.list_of_messages?.[0]?.content === undefined && <span className='truncate'>New chat</span>}
                  {chat?.list_of_messages?.[0]?.content !== undefined && chat?.list_of_messages?.[0]?.content !== null && <span className='truncate'>{String(chat?.list_of_messages[0]?.content)}</span>}
                  {currentChat?.id === chat.id && <Badge variant='success'>current</Badge>}
                </div>
                {chat?.created_at !== null && chat?.created_at !== undefined && <small className='self-end text-xs text-[#959595]'>{formatTime(chat.created_at)}</small>}
              </li>
            ))
          }
        </ul>
      </section>
    </header>
  )
}
