import {Outlet} from 'react-router-dom';
import Header from './Header.jsx'
import {useNavigation} from 'react-router-dom'
import SideNav from './SideNav.jsx'

export default function UserScreen(){
    const navigation = useNavigation();
    return (
        <div className="main-screen logged-in-screen">
            {navigation.state === "loading" && <h2>Waiting</h2>}
            <Header />
            <SideNav />
            <main className="main-content">
                <Outlet />
            </main>
        </div>
    )
}