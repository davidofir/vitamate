import { useEffect, useState } from 'react';
import SearchBar from '../../components/Searchbar/SearchBar';
import './Search.css'
import SearchResultsList from '../../components/SearchResultsList/SearchResultsList';
import Button from '@mui/joy/Button';
import { fetchDrugs } from '../../Repositories/DrugsRepository';
import { FaEnvelope } from 'react-icons/fa';
import SignInModal from '../../components/SignInModal/SignInModal';
import IconButton from '@mui/joy/IconButton';
import Container from '@mui/joy/Container'; // or import { Container } from '@mui/joy';
import Card from '@mui/joy/Card'; // or import { Card } from '@mui/joy';
import Typography from '@mui/joy/Typography'; // or import { Typography } from '@mui/joy';
import Stack from 'react-bootstrap/Stack';
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel'
import 'bootstrap/dist/css/bootstrap.min.css';

function Search() {

    const MAX_WORD_COUNT = 400;
    const [results, setResults] = useState([]);
    const [selectedResults, setSelectedResults] = useState([]);
    const [drugName, setDrugName] = useState('');
    const [drugData, setDrugData] = useState();
    const [input,setInput] = useState('');
    const [existingResults,setExistingResults] = useState({});
    const [currentSelectedItem,setCurrentSelectedItem] = useState(null);
    const [loggedIn,setLoggedIn] = useState(false);
    const [summarizedDrugData, setSummarizedDrugData] = useState({});
    const [isLoading, setIsLoading] = useState(false);
    const [isSummarizing, setIsSummarizing] = useState({});
    const [value, setValue] = useState(0);
    const [show, setShow] = useState(false);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };
    const removeResult = (resultToRemove) => {
        setSelectedResults(prevSelectedResults => prevSelectedResults.filter(item => item !== resultToRemove));
        setExistingResults(prev => {
            const newResults = { ...prev };
            delete newResults[resultToRemove];
            return newResults;
        });
    };
    const serverUrl = process.env.REACT_APP_SERVER_URL;

    const fetchNodeGemini = async (text) => {
    try {
        const response = await fetch(`${process.env.REACT_APP_SUMMARY_API_URL}/summarize`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                textToSummarizeBase64: text
            })
            
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.summarizedText;
    } catch (error) {
        console.error('Error fetching data: ', error);
    }
}
    const handleLogoutClick = async () => {
        try {
            const response = await fetch(`${serverUrl}/logout`, {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                setLoggedIn(false);
                window.location.reload();
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };
    const sendEmail = () => {
        const subject = encodeURIComponent('Health Profile Information');
        const body = encodeURIComponent(`Medications and drugs taken by the patient: ${selectedResults}`)
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }
    const getDrugs = async () => {
        try {
            const response = await fetch(`${serverUrl}/drugs`, {
                method: 'GET',
                redirect: 'follow',
                credentials: 'include'
            });
    
            if (!response.ok) {
                throw new Error('Failed to fetch drugs');
            }
    
            const drugs = await response.json();
    
            if (response.redirected) {
                document.location = response.url;
            } else {


                setSelectedResults(drugs);
                const newExistingResults = {};

                drugs.forEach(drugName => {
                    if(!existingResults[drugName]){
                        newExistingResults[drugName] = true;
                    }
                });

                setExistingResults(newExistingResults)
            }
        } catch (error) {
            console.error('Error fetching drugs:', error);
        }
    };
    const persistDrugs = async () => {
        try {
            const response = await fetch(`${serverUrl}/drugs`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body: JSON.stringify( Object.keys(existingResults) )
            });
    
            if(response.redirected) {
                window.location.href = response.url;
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSaveClick = () => {
        if (loggedIn) {
            persistDrugs();
        } else {
            setShow(true)
        }
    };

    const handleGoogleClick = () => {
        window.location.href = `${serverUrl}/auth/google`;
    };
    const renderLoadingIndicator = () => {
        return isLoading ? <div>Loading...</div> : null;
    };
    const stripHtml = (htmlString) => {
        const temporalDivElement = document.createElement("div");
        temporalDivElement.innerHTML = htmlString;
        let text = temporalDivElement.textContent || temporalDivElement.innerText || "";

        text = text.replace('•', '\n•');
        
        return text;
    };
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                const response = await fetch(`${serverUrl}/users/auth/status`, {
                    credentials: 'include',
                });
                console.log(response)
                if (response.status === 200) {
                    setLoggedIn(true);
                } else {
                    throw new Error('Not authenticated');
                }
            } catch (error) {
                console.error('Error checking auth status:', error);
                setLoggedIn(false);
            }
        };
        checkAuthStatus();
    }, []);
    useEffect(() => {
        const workerUrl = new URL(`${process.env.PUBLIC_URL}/summarizationWorker.js`, window.location);
        const summarizationWorker = new Worker(workerUrl);
      
        summarizationWorker.onmessage = (e) => {
            const { key, summarizedText, error } = e.data;
            if (error) {
                console.error(`Error summarizing text for key ${key}:`, error);
                return;
            }
            setSummarizedDrugData(prev => ({
                ...prev,
                [key]: summarizedText
            }));
            setIsSummarizing(prev => ({
                ...prev,
                [key]: false
            }));
        };
      
        if (drugName.length > 0) {
            setIsLoading(true);
            const newIsSummarizing = { ...isSummarizing };
      
            (async () => {
                try {
                    const data = await fetchDrugs(drugName);
                    const originalTexts = {};
      
                    for (const [key, value] of Object.entries(data)) {
                        const plainText = stripHtml(value);
                        originalTexts[key] = plainText;
      
                        if (plainText.split(' ').length > MAX_WORD_COUNT) {
                            newIsSummarizing[key] = true;
                            setIsSummarizing(newIsSummarizing);
      
                            summarizationWorker.postMessage({
                                action: 'summarize',
                                text: plainText,
                                key: key,
                                apiUrl: process.env.REACT_APP_SUMMARY_API_URL
                            });
                        } else {
                            setSummarizedDrugData(prev => ({
                                ...prev,
                                [key]: plainText
                            }));
                        }
                    }
                    setDrugData(originalTexts);
                } catch (e) {
                    console.error(e);
                    setDrugData({ 'Drug not found': 'Please try a different drug' });
                } finally {
                    setIsLoading(false);
                }
            })();
        }
      
        return () => summarizationWorker.terminate();
      }, [drugName]);
    useEffect(() => {
        if (loggedIn) {
            getDrugs();
        }
    }, [loggedIn]);
    const renderDrugDataTabs = () => {
        if (!drugData) {
            return <div></div>;
        }
        const tabsArray = Object.entries(drugData);
        return (
            
                <Tabs style={{backgroundColor: 'transparent',marginTop:'0.5rem'}} aria-label="drug data tabs" defaultValue={0}>
                    <div style={{display:'flex',justifyContent:'center'}}>
                    <TabList sx={{ display: 'flex', 
  flexWrap: 'wrap',
  '& .MuiTab-root': { 
    minWidth: 100, 
  } }}>
                        {tabsArray.map(([key], index) => (
                            <Tab key={index}>{key}</Tab>
                        ))}
                    </TabList>
                    </div>
                    {tabsArray.map(([key, originalValue], index) => (
                        <TabPanel style={{backgroundColor: 'transparent'}} value={index} key={index}>
                            <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}>
                                <Card sx={{ padding: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: 2 }}>
                                    <Typography level="body2">
                                        {isSummarizing[key] ? 
                                        <div>
                                            <div>Loading summary...</div>
                                            {originalValue} 
                                        </div>
                                            : 
                                            (summarizedDrugData[key])
                                        }
                                    </Typography>
                                </Card>
                                
                            </Container>
                            
                        </TabPanel>
                        
                    ))}

                </Tabs>

        );
    };
    return (
        <div className="parent-search">
            <div style={{display:'flex',justifyContent:'space-between'}}>
            <img style={{width:'250px'}} src='VitaMateLogo.png' alt="Vitamate Logo"/>
            <div style={{ marginRight:'10px',marginTop:'10px'}}>
                
            { !loggedIn ? (<SignInModal show={show} setShow={setShow} handleGoogleLogin={handleGoogleClick}/>): (<Button onClick={()=>{
                handleLogoutClick();
            }} style={{borderRadius:'20px'}}>Logout</Button>) }
            
            </div>
                
            </div>
            
            <div className="search-bar-container">

                    <div style={{display:'flex',width:'100%'}}>
                    <SearchBar setResults={setResults} input={input} setInput={setInput} />
                    <div style={{display:'flex',flexDirection:'horizontal'}}>
                    <Button onClick={()=>{
                          setSelectedResults(prevSelectedResults => {
                            const newResult = input.trim().toLocaleUpperCase();
                            
                            if (newResult && !existingResults[newResult]) {
                                setExistingResults(prev => ({ ...prev, [newResult]: true }));
                                if (currentSelectedItem !== newResult) {
                                    setCurrentSelectedItem(newResult);
                                }
                                return [...prevSelectedResults, newResult];
                            }
                            return prevSelectedResults;
                        });  
                    }
                    
                    } style={{marginLeft:'10px',borderRadius:'10px'}}>Add</Button>
                                <Button variant='outlined' style={{marginLeft:'10px',borderRadius:'10px'}} onClick={()=>{
                handleSaveClick();
            }} >Save</Button>
            <div style={{display:'flex',alignItems:'center',marginLeft:'10px'}}>
            <FaEnvelope onClick={()=>sendEmail()}/>
            </div>
            </div>
                    </div>
                    {results ? <SearchResultsList results={results} setSelectedResults={setSelectedResults} selectedResults={selectedResults} existingResults={existingResults} setExistingResults={setExistingResults} /> : <></>}
                        
                    <Stack>
                        
    {selectedResults.map((result, index) => 
        (
        <div className={`selected-result-item ${currentSelectedItem === result ? 'selected' : ''}`} key={index}>
            <div style={{width:'100%',textAlign:'center'}} onClick={() => {
                setDrugName(result);
                setCurrentSelectedItem(result);
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
            </div>
            <div>
                {renderDrugDataTabs()}

            </div>
                
        </div>
    );
}
export default Search;