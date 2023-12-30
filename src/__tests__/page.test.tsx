import '@testing-library/jest-dom'
import {render, screen} from '@testing-library/react'
import Page from '../app/page'

// @ts-ignore
describe('Page', () => {
    // @ts-ignore
    it('renders a heading', () => {
        render(<Page/>)

        const heading = screen.getByText('Workspace')

        // @ts-ignore
        expect(heading).toBeInTheDocument()
    })
})