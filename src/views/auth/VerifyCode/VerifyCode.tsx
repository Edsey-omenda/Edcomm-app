import VerifyCodeForm from './VerifyCodeForm'
import {useLocation} from 'react-router-dom';

const VerifyCode = () => {
    const location = useLocation();
    return <VerifyCodeForm email={location.state.email} timestamp={location.state.timestamp}/>
}

export default VerifyCode