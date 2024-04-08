import React from 'react'
import { render, screen } from '@testing-library/react'
import LoadingSpinner from '@/components/LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders the loading backdrop and circular progress', () => {
    render(<LoadingSpinner />)
    const backdrop = screen.getByTestId('backdrop')
    expect(backdrop).toBeInTheDocument()
    const circularProgress = screen.getByTestId('progressbar')
    expect(circularProgress).toBeInTheDocument()
  })
})
