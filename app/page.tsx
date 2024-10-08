import Chat from '@/ui/chat'
import { UserModal } from '@/ui/user-modal'
import { Header } from '@/ui/header'

export default function Home (): JSX.Element {
  return (
    <main className='flex gap-2 p-4 h-dvh'>
      <UserModal />
      <Header />
      <Chat />
    </main>
  )
}
