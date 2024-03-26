import React, { useState } from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog from '@mui/joy/ModalDialog';
import Sheet from '@mui/joy/Sheet';
import Button from '@mui/joy/Button';
import Typography from '@mui/joy/Typography';

function SaveModal({ showSave, setShowSave, handleSaveClick, selectedResults}) {
    

    const handleClose = () => setShowSave(false);
    const handleShow = () => setShowSave(true);


    return (
      <>
        <Button variant='outlined' style={{marginLeft:'10px',borderRadius:'10px'}}  onClick={handleShow } >Save</Button>

        <Modal open={showSave} onClose={handleClose}>
          <ModalDialog>
            <Sheet variant="outlined" sx={{ width: 'auto', borderRadius: 'md' }}>
              <Typography level="h4" component="h3" sx={{ m: 2 }}>
                {selectedResults.length > 0 ? `Confirm Save` : `No Drugs Found`}
              </Typography>
              <ModalClose />
            </Sheet>
            <Typography sx={{paddingBottom:'5%'}}>
            {selectedResults.length > 0 ? `By clicking 'Save', the pinned drugs: ${selectedResults.join(', ')} will be saved to your account.
            Do you want to proceed and save?`: `Please select drugs`}
            </Typography>
            {selectedResults.length > 0 ? <div style={{display:'flex',justifyContent:'center'}}><Button onClick={()=>{
                handleSaveClick()
                handleClose()
            }
        }>Save</Button></div> : <></>}
            
          </ModalDialog>
          
        </Modal>
      </>
    );
}

export default SaveModal;
