import { Box, Modal } from "@mui/material"
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";
import { useLocation } from "react-router-dom";


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

const AuthModal = ({open, handleClose}) => {
    const  location = useLocation()
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    {
                        (location.pathname === "/login") ?
                            <LoginForm />
                        :
                            <RegisterForm />
                    }     
                </Box>
            </Modal>
        </div>
    )
}
export default AuthModal