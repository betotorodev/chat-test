import { Chat, User } from '@/lib/types'
import { CoreMessage } from 'ai'
import { create } from 'zustand'

interface UserState {
  user: User | null
  setUser: (user: User) => void
}

interface CurrentChat {
  currentChat: Chat | null
  setCurrentChat: (currentChat: Chat | null) => void
  setMessages: (messages: CoreMessage[]) => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user }))
}))

export const useCurrentChatStore = create<CurrentChat>((set) => ({
  currentChat: {
    id: '',
    user_id: '',
    list_of_messages: []
  },
  setCurrentChat: (currentChat) => set(() => ({ currentChat })),
  setMessages: (messages) => set((state) => ({
    ...state,
    currentChat: {
      ...state.currentChat,
      id: state.currentChat?.id ?? '',
      user_id: state.currentChat?.user_id ?? '',
      list_of_messages: messages
    }
  }))
}))
