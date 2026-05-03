import { useState } from "react"

type ToastVariant = "default" | "destructive"

interface Toast {
  id: string
  title?: string
  description?: string
  variant?: ToastVariant
}

interface ToastInput {
  title?: string
  description?: string
  variant?: ToastVariant
}

let listeners: Array<(toasts: Toast[]) => void> = []
let toasts: Toast[] = []

function notify(newToasts: Toast[]) {
  toasts = newToasts
  listeners.forEach((l) => l(toasts))
}

export function toast(input: ToastInput) {
  const id = Math.random().toString(36).slice(2)
  const newToast: Toast = { id, ...input }
  notify([...toasts, newToast])
  setTimeout(() => {
    notify(toasts.filter((t) => t.id !== id))
  }, 4000)
}

export function useToast() {
  const [currentToasts, setCurrentToasts] = useState<Toast[]>(toasts)

  useState(() => {
    listeners.push(setCurrentToasts)
    return () => {
      listeners = listeners.filter((l) => l !== setCurrentToasts)
    }
  })

  return { toasts: currentToasts, toast }
}
