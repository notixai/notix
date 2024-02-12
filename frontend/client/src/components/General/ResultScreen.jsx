import {useNavigate, useLocation} from 'react-router-dom'
export default function ResultScreen(){
    const navigate = useNavigate(); //Used to go back while removing success screen
    const location = useLocation(); //Contains data about link or navigate that sent data
    const state = location.state;
    const {title, status, message} = state;
    function handleReturn(){
        navigate(-1,{ replace: true })
    }
    if(!location)
        handleReturn();
    
    return (
        <div className="dialog-box">
            <h2 className="dialog-box-heading">{title}</h2>
            {status === 'success' ? <img className="success-image" src="" alt="Success"/> : <img className="failure-image" src="" alt="Failure" />}
            <p className="dialog-box-title">{message}</p>
            <button className="button" onClick={handleReturn}>
                Go Back
            </button>
        </div>
    )
}