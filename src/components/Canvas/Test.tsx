import React, { useState, useRef, useEffect, memo, useContext } from 'react'
import { assertIsNotNull } from '../../common/assertion-functions'

const Inner = memo(() => {
	console.log('Inner')
	return (
		<div>
			<Inner2 />
		</div>
	)
})

const Inner2 = memo(() => {
	console.log('Inner2')
	const context = useContext(GlobalContext)
	return <div>{context.num}</div>
})

const GlobalContext = React.createContext({
	num: 0,
	update: (num: number) => {},
})

const Container = () => {
	console.log('Container')

	const ref = useRef(null)
	const [a, setA] = useState(1)

	useEffect(() => {
		const curr = ref.current
		assertIsNotNull(curr)
		const ele = curr as HTMLDivElement

		ele.addEventListener('click', () => {
			setA((num) => {
				return num + 1
			})
		})
	}, [])

	return (
		<GlobalContext.Provider value={{ num: a, update: setA }}>
			<div style={{ padding: '30px', backgroundColor: 'gray' }} ref={ref}>
				<Inner />
			</div>
		</GlobalContext.Provider>
	)
}

export default memo(Container)
