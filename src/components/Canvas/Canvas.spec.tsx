import React from 'react'
import { render } from '@testing-library/react'
import Canvas from './Canvas'

describe('test canvas functionality', () => {
	beforeEach(() => {})

	test('renders canvas', async () => {
		const a = render(<Canvas />)

		const { findAllByTestId } = render(<Canvas />)
		const container = (await findAllByTestId('canvas-static-container'))[0]
		const dynamic = (await findAllByTestId('canvas-dynamic'))[0]

		expect(container).toBeInTheDocument()
		expect(dynamic).toBeInTheDocument()
	})

	test('', async () => {
		const { findAllByTestId } = render(<Canvas scalable={false} />)
		const container = (await findAllByTestId('canvas-static-container'))[0]
		const dynamic = (await findAllByTestId('canvas-dynamic'))[0]
	})
})
