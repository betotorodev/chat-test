import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import React from 'react'
import { UserModal } from '@/ui/user-modal'
import { useCurrentChatStore, useUserStore } from '@/app/store'

// Mock the addUser function
vi.mock('@/app/actions', () => ({
  addUser: vi.fn()
}))

// Mock the stores
vi.mock('@/app/store', () => ({
  useCurrentChatStore: vi.fn(),
  useUserStore: vi.fn()
}))

describe('UserModal', () => {
  beforeEach(() => {
    // Mock the store implementations
    useCurrentChatStore.mockReturnValue({ setCurrentChat: vi.fn() })
    useUserStore.mockReturnValue({ setUser: vi.fn() })
  })
  it('should render the modal correctly', () => {
    render(<UserModal />)
    const dialog = screen.getByRole('heading')
    expect(dialog).toBeInTheDocument()
  })
})
