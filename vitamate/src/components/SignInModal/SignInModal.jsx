import React, { useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SignInModal({ handleGoogleLogin,showSignIn,setShowSignIn }) {
    

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
            <div style={{ display: 'flex', justifyContent: 'center', padding: 2 }}>
                <Button 
                  onClick={handleGoogleLogin} 
                  sx={{ borderRadius: '20px', display: 'flex', alignItems: 'center', gap: 1 }} 
                  variant="outlined"
                >
                  <FontAwesomeIcon icon={faGoogle} /> Continue with Google
                </Button>
              </div>
          </ModalDialog>
        </Modal>
      </>
    );
}

export default SignInModal;
