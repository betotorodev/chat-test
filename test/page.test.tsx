import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { Header } from '../ui/header'
import { getChats } from '../lib/db/queries'

vi.mock('../lib/db/queries', () => ({
  getChats: vi.fn()
}))

describe('Header Component', () => {
  const mockChats = [
    { id: 1, list_of_messages: [{ content: 'Hello' }], created_at: '2023-10-01T00:00:00Z' },
    { id: 2, list_of_messages: [{ content: 'Hi' }], created_at: '2023-10-02T00:00:00Z' }
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders user information correctly', async () => {
    getChats.mockResolvedValueOnce(mockChats)

    render(<Header />)

    expect(screen.getByText('Leo')).toBeInTheDocument()
    expect(screen.getByText('Coach')).toBeInTheDocument()
  })
})
