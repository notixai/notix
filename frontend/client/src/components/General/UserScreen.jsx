import {Outlet} from 'react-router-dom';

import Header from './Header.jsx'
import NavMenu from './NavMenu.jsx'

export default function UserScreen(){
    return (
        <>
            <Header />
            <NavMenu />
            <main>
                <Outlet />
            </main>
        </>
    )
}