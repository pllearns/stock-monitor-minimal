import { useState, useEffect, useCallback } from 'react'
import { Stock } from '../services/api'
import { websocketService } from '../services/websocket'
import { apiService } from '../services/api'

interface UseStocksResult {
  stocks: Stock[]
  isLoading: boolean
  error: Error | null
  addStock: (symbol: string) => Promise<void>
  removeStock: (symbol: string) => void
  refreshStock: (symbol: string) => Promise<void>
}

export function useStocks(): UseStocksResult {
  const [stocks, setStocks] = useState<Stock[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const loadInitialStocks = async () => {
      try {
        setIsLoading(true)
        const initialStocks = await apiService.getAllStocks()
        setStocks(initialStocks)
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to load stocks'))
      } finally {
        setIsLoading(false)
      }
    }

    loadInitialStocks()

    const unsubscribe = websocketService.subscribe((updatedStocks) => {
      setStocks(prevStocks => 
        prevStocks.map(stock => {
          const updatedStock = updatedStocks.find(s => s.symbol === stock.symbol)
          return updatedStock || stock
        })
      )
    })

    const errorUnsubscribe = websocketService.onError((err) => {
      setError(err)
    })

    return () => {
      unsubscribe()
      errorUnsubscribe()
    }
  }, [])

  const addStock = useCallback(async (symbol: string) => {
    try {
      setIsLoading(true)
      setError(null)
      const stockData = await apiService.getStock(symbol)
      setStocks(prev => [...prev, stockData])
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to add stock'))
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const removeStock = useCallback((symbol: string) => {
    setStocks(prev => prev.filter(stock => stock.symbol !== symbol))
  }, [])

  const refreshStock = useCallback(async (symbol: string) => {
    try {
      setError(null)
      const stockData = await apiService.getStock(symbol)
      setStocks(prev => 
        prev.map(stock => 
          stock.symbol === symbol ? stockData : stock
        )
      )
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to refresh stock'))
      throw err
    }
  }, [])

  return {
    stocks,
    isLoading,
    error,
    addStock,
    removeStock,
    refreshStock
  }
} 