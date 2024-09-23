'use server'
import { createClient } from '@/lib/db/supabase/server'

const supabase = await createClient()

export const createUser = async (user) => {
  const { data, error } = await supabase
    .from('users')
    .insert(user)

  if (error != null) {
    console.log(error)
    throw new Error(error)
  }
}

export const createChat = async (chat) => {
  const { data, error } = await supabase
    .from('chats')
    .insert(chat)

  if (error != null) {
    console.log(error)
    throw new Error(error)
  }
}

export const getChats = async (user_id: string) => {
  const { data, error } = await supabase
    .from('chats')
    .select()
    .eq('user_id', user_id)

  if (error != null) {
    console.log(error)
    throw new Error(error)
  }

  return data
}

export const updateChat = async (chat) => {
  const { data, error } = await supabase
    .from('chats')
    .update({ list_of_messages: chat.list_of_messages })
    .eq('id', chat.id)

  if (error != null) {
    console.log(error)
    throw new Error(error)
  }
}
