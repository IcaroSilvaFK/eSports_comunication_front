import create from 'zustand'
import { devtools } from 'zustand/middleware'

interface IModalProps {
  isOpen: boolean
  close(): void
  open(): void
}

export const useModal = create<IModalProps>()(
  devtools((set) => ({
    isOpen: false,
    open() {
      set((state) => ({ ...state, isOpen: true }))
    },
    close() {
      set((state) => ({ ...state, isOpen: false }))
    },
  }))
)
