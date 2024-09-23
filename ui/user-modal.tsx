'use client'

import { Button } from '@/components/button'
import { Input } from '@/components/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle
} from '@/components/dialog'
import { useState } from 'react'
import { addUser } from '@/app/actions'
import { useCurrentChatStore, useUserStore } from '@/app/store'

export const UserModal = (): JSX.Element => {
  const [open, setOpen] = useState(true)
  const setUser = useUserStore((state) => state.setUser)
  const setCurrentChat = useCurrentChatStore((state) => state.setCurrentChat)
  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget as HTMLFormElement)
    const { success, user, chat } = await addUser(formData)
    setUser(user)
    setCurrentChat(chat)
    if (success === true) {
      setOpen(false)
    }
  }

  return (
    <div className='flex justify-center'>
      <Dialog open={open} onOpenChange={() => setOpen(false)}>
        <DialogContent className='bg-[#282828 border-[#959595] ring-0 sm:max-w-lg'>
          <DialogHeader>
            <DialogTitle className='text-[#f9f9f9]'>Hi! welcome to soccer chat</DialogTitle>
          </DialogHeader>
          <DialogDescription className='mb-6'>
            ⚽️ Please provide a user name and star talking with jarvis
          </DialogDescription>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <Input type='text' name='user_name' className='bg-[#1a1a1a]' />
            <Button type='submit' className='w-full ring-0 outline-none mt-2' variant='primary'>Ok, got it!</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
