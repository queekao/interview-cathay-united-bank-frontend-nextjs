import TestOne from '@/pages/testOne'
import { render, screen } from '@testing-library/react'
// import userEvent from '@testing-library/user-event'

describe('TestOne Page ', () => {
  describe('Rendering', () => {
    it('should have Test Page text', () => {
      render(<TestOne />)
      expect(screen.getByText('test one'))
    })
  })
})
