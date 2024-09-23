'use client'

import { type CoreMessage } from 'ai'
import { useEffect, useRef, useState } from 'react'
import { continueConversation } from '@/app/actions'
import { readStreamableValue } from 'ai/rsc'
import { useCurrentChatStore } from '@/app/store'

export default function Chat (): JSX.Element {
  const [currentConversation, setCurrentConversation] = useState<CoreMessage[]>([])
  const setMessages = useCurrentChatStore((state) => state.setMessages)
  const currentChat = useCurrentChatStore((state) => state.currentChat)
  const [input, setInput] = useState('')
  const messagesContainer = useRef<HTMLDivElement>(null)

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault()
    const newMessages: CoreMessage[] = [
      ...currentConversation,
      { content: input, role: 'user' }
    ]

    setCurrentConversation(newMessages)
    setInput('')

    const result = await continueConversation(newMessages)
    let botMessages = ''
    for await (const content of readStreamableValue(result)) {
      setCurrentConversation([
        ...newMessages,
        {
          role: 'assistant',
          content: content as string
        }
      ])
      botMessages = content as string
    }
    setMessages([...newMessages, { role: 'assistant', content: botMessages }])
  }
  useEffect(() => {
    if (messagesContainer.current != null) {
      messagesContainer.current.scrollTop = messagesContainer.current.scrollHeight
    }
  }, [currentConversation])

  useEffect(() => {
    if (currentChat !== null) {
      setCurrentConversation(currentChat.list_of_messages)
    }
  }, [currentChat])

  return (
    <section className='flex flex-col justify-between flex-1 relative border border-[#282828] rounded-2xl'>
      <div ref={messagesContainer} className='grid grid-cols-12 relative w-full mx-auto overflow-y-auto max-h-full' style={{ maxHeight: 'calc(100vh - 82px)' }}>
        <div className='col-start-4 col-end-10 py-10 w-full'>
          {currentConversation.map((m, index) => {
            const date = new Date(Date.now())
            const current = Intl.DateTimeFormat('en-ES', { month: 'long', day: 'numeric' }).format(date)
            return (
              <div key={`content-${index}`} className='flex gap-4 whitespace-pre-wrap mb-6 last:mb-0'>
                <span>{m.role === 'user' ? '😎' : '⚽️'}</span>
                <div className='flex flex-col gap-2'>
                  <p>{m.content as string}</p>
                  <small className='text-[#7e7e7e]'>{current}</small>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <form className='grid grid-cols-12 gap-6 self-end w-full justify-center pb-10' onSubmit={(e) => { void handleSubmit(e) }}>
        <input
          className='col-start-3 col-end-11 w-full mx-auto p-3 border border-[#282828] rounded-2xl shadow-xl bg-[#1a1a1a] outline-none '
          value={input}
          placeholder='Say something...'
          onChange={e => setInput(e.target.value)}
        />
      </form>
    </section>
  )
}
