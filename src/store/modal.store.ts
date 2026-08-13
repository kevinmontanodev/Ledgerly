import { create } from "zustand"
import { ReactNode } from "react"

type ModalState = {
  isOpen: boolean
  originElement: HTMLElement | null

  open: (params: { element: HTMLElement }) => void
  close: () => void
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  originElement: null,

  open: ({ element }) =>
    set({
      isOpen: true,
      originElement: element,
    }),

  close: () =>
    set({
      isOpen: false,
      originElement: null,
    }),
}))