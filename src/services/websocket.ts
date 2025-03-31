import { Stock } from './api'

type MessageHandler = (data: Stock[]) => void
type ErrorHandler = (error: Error) => void

class WebSocketService {
  private ws: WebSocket | null = null
  private messageHandlers: MessageHandler[] = []
  private errorHandlers: ErrorHandler[] = []

  constructor(private url: string) {}

  connect() {
    if (this.ws?.readyState === WebSocket.OPEN) return

    this.ws = new WebSocket(this.url)

    this.ws.onopen = () => {
      console.log('WebSocket connected')
    }

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        this.messageHandlers.forEach(handler => handler(data))
      } catch (error) {
        this.handleError(error instanceof Error ? error : new Error('Failed to parse WebSocket data'))
      }
    }

    this.ws.onerror = (error) => {
      this.handleError(error instanceof Error ? error : new Error('WebSocket error occurred'))
    }

    this.ws.onclose = () => {
      console.log('WebSocket connection closed')
      setTimeout(() => this.connect(), 5000)
    }
  }

  subscribe(handler: MessageHandler) {
    this.messageHandlers.push(handler)
    return () => {
      this.messageHandlers = this.messageHandlers.filter(h => h !== handler)
    }
  }

  onError(handler: ErrorHandler) {
    this.errorHandlers.push(handler)
    return () => {
      this.errorHandlers = this.errorHandlers.filter(h => h !== handler)
    }
  }

  private handleError(error: Error) {
    this.errorHandlers.forEach(handler => handler(error))
  }

  disconnect() {
    if (this.ws) {
      this.ws.close()
      this.ws = null
    }
  }
}

export const websocketService = new WebSocketService('ws://localhost:3001') 