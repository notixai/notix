import {useNavigate} from 'react-router-dom'
export default function ResultScreen({title,message,status}){
    const navigate = useNavigate();

    function handleReturn(){
        navigate(-1,{ replace: true })
    }
    return (
        <div className="dialog-box">
            <h2 className="dialog-box-heading">{title}</h2>
            {status === 'success' ? <img className="success-image" src="" /> : <img className="failure-image" src="" />}
            <p className="dialog-box-title">{message}</p>
            <button className="button" onClick={handleReturn}>
                Go Back
            </button>
        </div>
    )
}