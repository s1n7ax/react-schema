import React, { WheelEvent, memo, useState, useRef, useEffect } from 'react'
import './Canvas.css'
import { assertIsNotNull } from '../../common/assertion-functions'

export interface ICanvasProps {
	scalable?: boolean
	scale?: number
	onScaleChange?: (event?: WheelEvent<HTMLDivElement>) => void
}

/**
 * Canvas has following components
 *
 * static canvas container - static wrapper for inner element
 * dynamic canvas - holds all components. this transform and constantly changing on events
 *
 *  +--------------------------static canvas container-------+
 *  | +--dynamic canvas------------------------------------+ |
 *  | |                                                    | |
 *  | |                                                    | |
 *  | |    +---------+                                     | |
 *  | |    | node 1  |                                     | |
 *  | |    +----+----+                                     | |
 *  | |         |                                          | |
 *  | |         |                                          | |
 *  | |         |                           +---------+    | |
 *  | |         +---------------------------+ node 2  |    | |
 *  | |                                     +---------+    | |
 *  | |                                                    | |
 *  | |                                                    | |
 *  | +----------------------------------------------------+ |
 *  +--------------------------------------------------------+
 */
export default memo((props: ICanvasProps) => {
	console.log('>>>>>>>>>>>>>>> re rendering')

	// props
	const scalable = props.scalable ?? true
	const scaleChangeAmountMin = 0.01
	const scaleChangeAmountMax = 0.02

	// state
	const [scale, setScale] = useState(props.scale ?? 1)
	const [transition, setTransition] = useState({
		x: 0,
		y: 0,
	})

	const staticCanvasContainerRef = useRef(null)
	const dynamicCanvasRef = useRef(null)
	useEffect(() => {
		console.log('>>>>>>>>>>>>>>> on effect')
		const staticCurrent = staticCanvasContainerRef.current
		assertIsNotNull(staticCurrent)
		const staticContainer = staticCurrent as HTMLDivElement

		let dragStartPoint: { x: number; y: number }

		const mouseMove = (event: MouseEvent) => {
			const dragDiff = {
				x: event.screenX - dragStartPoint.x,
				y: event.screenY - dragStartPoint.y,
			}

			dragStartPoint.x = event.screenX
			dragStartPoint.y = event.screenY

			movePosition(dragDiff)
		}

		const mouseDown = (event: MouseEvent) => {
			dragStartPoint = {
				x: event.screenX,
				y: event.screenY,
			}

			staticContainer.addEventListener('mousemove', mouseMove)
			staticContainer.addEventListener('mouseup', mouseUp)
		}

		const mouseUp = () => {
			staticContainer.removeEventListener('mousemove', mouseMove)
			staticContainer.removeEventListener('mouseup', mouseUp)
		}

		staticContainer.addEventListener('mousedown', mouseDown)
	}, [])

	/** movePosition - changes the dynamic canvas position
	 *
	 */
	const movePosition = (pixelDiff: { x: number; y: number }) => {
		setTransition((prev) => {
			return {
				x: prev.x + pixelDiff.x,
				y: prev.y + pixelDiff.y,
			}
		})
	}

	/** changeScale - zoom in and out on mouse wheel event
	 *
	 * WHEN scalable is true
	 * 	IF shift key is pressed scale change is 0.01
	 * 	IF shift key is NOT pressed scale change is 0.02
	 */
	const changeScale = (event: WheelEvent<HTMLDivElement>): void => {
		const scaleChangeAmount = event.shiftKey
			? scaleChangeAmountMin
			: scaleChangeAmountMax

		const updatedScale =
			event.deltaY > 0
				? scale - scaleChangeAmount
				: scale + scaleChangeAmount

		if (updatedScale < 0) return

		setScale(updatedScale)
	}

	return (
		<div
			data-testid="Canvas-static-container"
			className="Canvas-static-container"
			onWheel={scalable ? changeScale : undefined}
			draggable={false}
			ref={staticCanvasContainerRef}
		>
			<div
				data-testid="Canvas-dynamic"
				className="Canvas-dynamic"
				style={{
					transform: `translate(${transition.x}px, ${transition.y}px) scale(${scale})`,
					backgroundColor: 'black',
				}}
				ref={dynamicCanvasRef}
			></div>
		</div>
	)
})
