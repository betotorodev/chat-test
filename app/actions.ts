'use server'

import { createStreamableValue } from 'ai/rsc'
import { CoreMessage, streamText } from 'ai'
import { createOpenAI as createGroq } from '@ai-sdk/openai'
import { createChat, createUser, updateChat } from '@/lib/db/queries'

const groq = createGroq({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY
})

export async function continueConversation (messages: CoreMessage[]): Promise<string | any> {
  const result = await streamText({
    model: groq('llama-3.1-70b-versatile'),
    system: 'You are a helpful assistant.',
    messages
  })

  const stream = createStreamableValue(result.textStream)
  return stream.value
}

export async function addChat (userId: string): Promise<any> {
  const chatId = crypto.randomUUID()

  const chat = {
    id: chatId,
    user_id: userId,
    list_of_messages: []
  }
  try {
    await createChat(chat)
    return { success: true, chat }
  } catch (error) {
    console.error(error)
    return { success: false, chat: null }
  }
}

export async function editChat (chat: any): Promise<any> {
  try {
    await updateChat(chat)
    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}

export async function addUser (formData: FormData): Promise<any> {
  const name = formData.get('user_name')
  const userId = crypto.randomUUID()
  const chatId = crypto.randomUUID()

  const user = {
    id: userId,
    user_name: name
  }
  const chat = {
    id: chatId,
    user_id: userId,
    list_of_messages: []
  }

  try {
    await createUser(user)
    await createChat(chat)
    return { success: true, user, chat }
  } catch (error) {
    console.error(error)
    return { success: false, user: null, chat: null }
  }
}
