import { CoreMessage } from 'ai'

export interface Chat {
  id: string
  user_id: string
  list_of_messages: CoreMessage[]
  created_at?: string
}

export interface User {
  id: string
  user_name: string
}

export interface BasicType {
  success: boolean
  chat?: Chat | null
  user?: User | null
}
