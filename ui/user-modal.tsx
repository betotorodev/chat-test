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
  const [loading, setLoading] = useState(false)
  const setUser = useUserStore((state) => state.setUser)
  const setCurrentChat = useCurrentChatStore((state) => state.setCurrentChat)
  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault()
    setLoading(true)
    const formData = new FormData(event.currentTarget as HTMLFormElement)
    const { success, user, chat } = await addUser(formData)
    if (user !== undefined && user !== null) setUser(user)
    if (chat !== undefined && chat !== null) setCurrentChat(chat)
    if (success) {
      setOpen(false)
    }
    setLoading(false)
  }

  return (
    <div className='flex justify-center'>
      <Dialog open={open}>
        <DialogContent className='bg-[#1a1a1a] border-[#282828] ring-0 sm:max-w-lg'>
          <DialogHeader>
            <DialogTitle className='text-[#f9f9f9]'>Hi! welcome to soccer chat</DialogTitle>
          </DialogHeader>
          <DialogDescription className='mb-6'>
            ⚽️ Please provide a user name and star talking with jarvis
          </DialogDescription>
          <form className='flex flex-col gap-4' onSubmit={(e) => { void handleSubmit(e) }} data-testid='user-form'>
            <Input type='text' name='user_name' className='bg-[#1a1a1a]' aria-label='user_name' placeholder='Say something...' />
            <Button isLoading={loading} type='submit' className='w-full ring-0 outline-none mt-2' variant='primary'>Ok, got it!</Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
