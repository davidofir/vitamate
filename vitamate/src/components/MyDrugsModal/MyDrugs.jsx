import { Modal,ModalDialog,Typography,ModalClose, Button,IconButton } from "@mui/joy";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Stack from 'react-bootstrap/Stack';
import { FaEnvelope } from "react-icons/fa";
export default function MyDrugs({selectedResults,setSelectedResults,existingResults,setExistingResults}){
    const [show,setShow] = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const sendEmail = () => {
      const subject = encodeURIComponent('Health Profile Information');
      const body = encodeURIComponent(`Medications and drugs taken by the patient: ${selectedResults}`)
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
  }
    const removeResult = (resultToRemove) => {
      setSelectedResults(prevSelectedResults => prevSelectedResults.filter(item => item !== resultToRemove));
      setExistingResults(prev => {
          const newResults = { ...prev };
          delete newResults[resultToRemove];
          return newResults;
      });
  };
    return(
        <>
                <Button variant="outlined" onClick={handleShow} sx={{ borderRadius: '10px' }}>
          List
        </Button>
        <Modal open={show} onClose={handleClose}>
  <ModalDialog>
    <ModalClose />
    <Typography>My Selected Drugs</Typography>
    <Stack style={{padding:'20%'}}>
                        
                        {selectedResults.map((result, index) => 
                            (
                            <div className={`selected-result-item`} key={index}>
                                <div style={{width:'100%',textAlign:'center'}} onClick={() => {
                                     }}>
                                    {result}
                                </div>
                                <IconButton
                                    className="remove-button"
                                    style={{ borderRadius:'30px' }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        removeResult(result);
                                    }}
                                    aria-label={`Remove ${result}`}
                                    variant='solid'
                                    color='primary'
                                >
                                    X
                                </IconButton>
                                
                            </div>
                            
                        )
                        )}
                                
                    </Stack>
                    <div style={{display:'flex',justifyContent:'flex-end',marginLeft:'10px'}}>
                      <FaEnvelope size={20} onClick={()=>sendEmail()}/>
                    </div>
            
  </ModalDialog>
</Modal>
</>
    );
}