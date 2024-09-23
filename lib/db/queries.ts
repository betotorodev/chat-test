'use server'
import { createClient } from '@/lib/db/supabase/server'
import { Chat, User } from '@/lib/types'

const supabase = await createClient()

export const createUser = async (user: User): Promise<void> => {
  const { error } = await supabase
    .from('users')
    .insert(user)

  if (error != null) {
    console.log(error)
    throw new Error(error.message)
  }
}

export const createChat = async (chat: Chat): Promise<void> => {
  const { error } = await supabase
    .from('chats')
    .insert(chat)

  if (error != null) {
    console.log(error)
    throw new Error(error.message)
  }
}

export const getChats = async (userId: string): Promise<Chat[]> => {
  const { data, error } = await supabase
    .from('chats')
    .select()
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error != null) {
    console.log(error)
    throw new Error(error.message)
  }

  return data
}

export const updateChat = async (chat: Chat): Promise<void> => {
  const { error } = await supabase
    .from('chats')
    .update({ list_of_messages: chat.list_of_messages })
    .eq('id', chat.id)

  if (error != null) {
    console.log(error)
    throw new Error(error.message)
  }
}
