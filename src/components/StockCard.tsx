import React from 'react'

interface StockCardProps {
  symbol: string
  price: number
  change: number
  volume: number
  lastUpdated: string
  onRemove: (symbol: string) => void
  onRefresh: (symbol: string) => void
}

export const StockCard: React.FC<StockCardProps> = ({
  symbol,
  price,
  change,
  volume,
  lastUpdated,
  onRemove,
  onRefresh
}) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center">
          <h5 className="card-title mb-0">{symbol}</h5>
          <div>
            <button 
              className="btn btn-sm btn-outline-secondary me-2"
              onClick={() => onRefresh(symbol)}
            >
              ↻
            </button>
            <button 
              className="btn btn-sm btn-outline-danger"
              onClick={() => onRemove(symbol)}
            >
              ×
            </button>
          </div>
        </div>
        <div className="mt-3">
          <h3 className="mb-2">${price.toFixed(2)}</h3>
          <p className={`mb-1 ${change >= 0 ? 'text-success' : 'text-danger'}`}>
            {change >= 0 ? '+' : ''}{change.toFixed(2)}%
          </p>
          <p className="text-muted mb-1">Volume: {volume.toLocaleString()}</p>
          <small className="text-muted">
            Updated: {new Date(lastUpdated).toLocaleTimeString()}
          </small>
        </div>
      </div>
    </div>
  )
} 