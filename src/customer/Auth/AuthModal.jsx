import { Box, Modal } from "@mui/material"
import LoginForm from "./LoginForm";
import { useLocation } from "react-router-dom";
import RegiterForm from './RegisterForm'
import { useState } from "react";
import VetyfiForm from "./VertyfiForm";
import { useDispatch } from "react-redux";
import { register } from "../../State/Auth/Action";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    outline: 'none',
};

const AuthModal = ({ open, handleClose }) => {
    const location = useLocation()
    const [verify, setVerify] = useState({ email: "", code: 0, firstName:"", lastName:"", password:""})
    const [back, setBack] = useState(false)
    const dispatch = useDispatch()

    const handleCheckEmailSuccess = (email, code, firstName, lastName, password) => {
        setVerify({ email, code, firstName, lastName, password })
    }

    const reset = () => {
        setVerify({ email: "", code: 0, firstName:"", lastName:"", password:"" })
        setBack(false)
    }

    const handleBack = () => {
        setBack(true)
        setVerify({ email: "", code: 0 })
    }
    
    const createUser = ()=>{
        dispatch(register({email: verify.email, password: verify.password, firstName: verify.firstName, lastName: verify.lastName, role: "customer"}))
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={() => handleClose(reset)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>

                    {
                        verify.email ?
                            (<VetyfiForm email={verify.email} vetyfiCode={verify.code} handleClose={handleClose} reset={reset} backHandler={handleBack} createUser={createUser} />)
                            : (

                                (location.pathname === '/register') || back ?
                                    <RegiterForm handleCheckEmailSuccess={handleCheckEmailSuccess} />

                                    :
                                    <LoginForm handleClose={handleClose} />

                            )
                    }
                </Box>


            </Modal>
        </div>
    )
}
export default AuthModal