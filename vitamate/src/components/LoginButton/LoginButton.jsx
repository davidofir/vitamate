import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@mui/joy";

const LoginButton = ({ icon, text, event }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
            <Button 
              onClick={event} 
              sx={{ 
                borderRadius: '20px', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'flex-start',
                padding: '8px 16px',
                width: '100%', 
              }} 
              variant="outlined"
            >
                <FontAwesomeIcon icon={icon} style={{ width: '24px', textAlign: 'center' }} />
                <span style={{ marginLeft: '16px' }}>{text}</span>
            </Button>
        </div>
    );
};

export default LoginButton;