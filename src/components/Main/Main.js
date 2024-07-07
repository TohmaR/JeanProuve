import React from 'react'
import { useMediaQuery } from 'react-responsive'
import MainDesktop from './MainDesktop/MainDesktop';
import MainMobile from './MainMobile/MainMobile';

function Main() {
  	const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' });
	const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
	return(
		<>
			{isDesktop ? <MainDesktop /> : <MainMobile />}
			
    	</>
	);
}

export default Main;