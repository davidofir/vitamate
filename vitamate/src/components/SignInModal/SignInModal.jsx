import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function SignInModal({handleGoogleLogin}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    return (
      <>
        <Button variant="primary" style={{borderRadius:'20px'}} onClick={handleShow}>
          Login
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Select Login Option</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div style={{display:'flex',justifyContent:'center'}}>
            <Button onClick={()=>handleGoogleLogin()} style={{borderRadius:'20px'}} variant="light">
                <FontAwesomeIcon icon={faGoogle} /> Continue with Google
            </Button>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }
  
  export default SignInModal;