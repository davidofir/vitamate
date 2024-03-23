import React, { useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SignInModal({ handleGoogleLogin }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
      <>
        <Button variant="solid" onClick={handleShow} sx={{ borderRadius: '20px' }}>
          Login
        </Button>

        <Modal open={show} onClose={handleClose}>
          <ModalDialog>
            <Sheet variant="outlined" sx={{ width: 'auto', borderRadius: 'md' }}>
              <Typography level="h4" component="h3" sx={{ m: 2 }}>
                Select Login Option
              </Typography>
              <ModalClose />
            </Sheet>
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
