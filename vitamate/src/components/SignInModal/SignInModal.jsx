import React, { useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import { faGoogle,faFacebook } from '@fortawesome/free-brands-svg-icons';
import LoginButton from '../LoginButton/LoginButton';

function SignInModal({showSignIn,setShowSignIn }) {
    

    const handleClose = () => setShowSignIn(false);
    const handleShow = () => setShowSignIn(true);


    return (
      <>
        <Button variant="solid" onClick={handleShow} sx={{ borderRadius: '20px' }}>
          Login
        </Button>

        <Modal open={showSignIn} onClose={handleClose}>
          <ModalDialog>
            <Sheet variant="outlined" sx={{ width: 'auto', borderRadius: 'md' }}>
              <Typography level="h4" component="h3" sx={{ m: 2 }}>
                Select a Login Option
              </Typography>
              <ModalClose />
            </Sheet>
            <Typography>
        Login to save the pinned drugs
      </Typography>
            <div style={{ display: 'flex', justifyContent: 'center', padding: 2,flexDirection:'column' }}>
              <LoginButton text={'Continue with Google'} icon={faGoogle} event={()=> window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/google`}/>
              {/* <LoginButton text={'Continue with Facebook'} icon={faFacebook} event={()=> window.location.href = `${process.env.REACT_APP_SERVER_URL}/auth/facebook`}/> */}
              </div>
          </ModalDialog>
        </Modal>
      </>
    );
}

export default SignInModal;
