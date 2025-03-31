import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { StockCard } from './StockCard'

describe('StockCard', () => {
  const mockStock = {
    symbol: 'AAPL',
    price: 150.50,
    change: 2.5,
    volume: 1000000,
    lastUpdated: '2024-03-20T10:00:00Z'
  }

  const mockOnRemove = vi.fn()
  const mockOnRefresh = vi.fn()

  it('renders stock information correctly', () => {
    render(
      <StockCard
        {...mockStock}
        onRemove={mockOnRemove}
        onRefresh={mockOnRefresh}
      />
    )

    expect(screen.getByText('AAPL')).toBeInTheDocument()
    expect(screen.getByText('$150.50')).toBeInTheDocument()
    expect(screen.getByText('+2.50%')).toBeInTheDocument()
    expect(screen.getByText('Volume: 1,000,000')).toBeInTheDocument()
  })

  it('calls onRemove when remove button is clicked', () => {
    render(
      <StockCard
        {...mockStock}
        onRemove={mockOnRemove}
        onRefresh={mockOnRefresh}
      />
    )

    fireEvent.click(screen.getByText('×'))
    expect(mockOnRemove).toHaveBeenCalledWith('AAPL')
  })

  it('calls onRefresh when refresh button is clicked', () => {
    render(
      <StockCard
        {...mockStock}
        onRemove={mockOnRemove}
        onRefresh={mockOnRefresh}
      />
    )

    fireEvent.click(screen.getByText('↻'))
    expect(mockOnRefresh).toHaveBeenCalledWith('AAPL')
  })
}) 