import React, { memo } from 'react'

export interface IDynamicCanvas {
	scale: number
	transition: { x: number; y: number }
}

export default memo(({ scale, transition }: IDynamicCanvas) => {
	return (
		<div
			data-testid="Canvas-dynamic"
			className="Canvas-dynamic"
			style={{
				transform: `translate(${transition.x}px, ${transition.y}px) scale(${scale})`,
				backgroundColor: 'black',
			}}
		></div>
	)
})
