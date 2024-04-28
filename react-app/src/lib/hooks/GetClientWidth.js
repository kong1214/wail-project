import { useState, useEffect, useContext, useCallback } from 'react'

export function GetClientWidth() {
	const [deviceWidth, setDeviceWidth] = useState(window.innerWidth)


	useEffect(() => {
        setDeviceWidth(window.innerWidth)
	}, [window.innerWidth])

	return { deviceWidth, isMobile: deviceWidth < 500 }
}
