import { useState } from 'react'
import { StockCard } from './components/StockCard'
import { useStocks } from './hooks/useStocks'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
  const [newSymbol, setNewSymbol] = useState('')
  const { stocks, isLoading, error, addStock, removeStock, refreshStock } = useStocks()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSymbol.trim()) return

    try {
      await addStock(newSymbol.toUpperCase())
      setNewSymbol('')
    } catch (err) {
      // Error is handled by the hook
    }
  }

  return (
    <div className="container py-4">
      <h1 className="mb-4">Stock Monitor</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Enter stock symbol (e.g., AAPL)"
            value={newSymbol}
            onChange={(e) => setNewSymbol(e.target.value)}
            disabled={isLoading}
          />
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Adding...' : 'Add Stock'}
          </button>
        </div>
      </form>

      {error && (
        <div className="alert alert-danger" role="alert">
          {error.message}
        </div>
      )}

      {stocks.length === 0 ? (
        <div className="text-center py-5">
          <p className="text-muted">
            No stocks added yet. Add a stock symbol to get started.
          </p>
        </div>
      ) : (
        <div className="row">
          {stocks.map(stock => (
            <div key={stock.symbol} className="col-md-6 col-lg-4">
              <StockCard
                {...stock}
                onRemove={removeStock}
                onRefresh={refreshStock}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
