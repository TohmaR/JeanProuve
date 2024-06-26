import React from 'react'
import { useMediaQuery } from 'react-responsive'
import NavDesktop from './NavDesktop/NavDesktop';
import NavMobile from './NavMobile/NavMobile';

function Nav() {
  const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' });
  const isMobile = useMediaQuery({ query: '(max-width: 1024px)' });
	return(
		<div>
			{isDesktop && <NavDesktop />}
			{isMobile && <NavMobile/>}
    </div>
	);
}

export default Nav;