const API_BASE_URL = 'http://localhost:3000/api'

export interface Stock {
  symbol: string
  price: number
  change: number
  volume: number
  lastUpdated: string
}

class ApiService {
  async getStock(symbol: string): Promise<Stock> {
    const response = await fetch(`${API_BASE_URL}/stocks/${symbol}`)
    if (!response.ok) {
      throw new Error(`Failed to fetch stock data for ${symbol}`)
    }
    return response.json()
  }

  async getAllStocks(): Promise<Stock[]> {
    const response = await fetch(`${API_BASE_URL}/stocks`)
    if (!response.ok) {
      throw new Error('Failed to fetch all stocks')
    }
    return response.json()
  }
}

export const apiService = new ApiService() 