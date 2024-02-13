import {Link} from 'react-router-dom'
export default function Home(){
    return (
        <>
            <h1>Welcome</h1>
            <Link to={'upload-audio'}>Upload Page</Link>
        </>
        
    )
}