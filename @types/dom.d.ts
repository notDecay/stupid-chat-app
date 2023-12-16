export {}

declare global {
  interface IModalProps {
    isOpen: () => boolean
    onOpen: () => void
    onClose: () => void
  }
}