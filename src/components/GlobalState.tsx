import React, { PropsWithChildren } from 'react'

interface IGlobalState {}

export default (props: PropsWithChildren<IGlobalState>) => {
	return props.children
}
