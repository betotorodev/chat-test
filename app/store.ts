import { create } from 'zustand'

interface User {
  id: string
  user_name: string
}

interface UserState {
  user: User | null
  setUser: (user: User) => void
}

interface CurrentChat {
  currentChat: any
  setCurrentChat: (currentChat: any) => void
  setMessages: (messages: any) => void
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set(() => ({ user }))
}))

export const useCurrentChatStore = create<CurrentChat>((set) => ({
  currentChat: null,
  setCurrentChat: (currentChat) => set(() => ({ currentChat })),
  setMessages: (messages) => set((state) => ({
    ...state,
    currentChat: {
      ...state.currentChat,
      list_of_messages: messages
    }
  }))
}))
