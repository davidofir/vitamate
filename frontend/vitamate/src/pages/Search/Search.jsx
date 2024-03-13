import { useEffect, useState } from 'react';
import SearchBar from '../../components/Searchbar/SearchBar';
import './Search.css'
import SearchResultsList from '../../components/SearchResultsList/SearchResultsList';
import Stack from 'react-bootstrap/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { fetchDrugs } from '../../Repositories/DrugsRepository';
import Modal from 'react-bootstrap/Modal';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Card from 'react-bootstrap/Card';
import * as Icon from 'react-bootstrap-icons';

function Search() {
    const [results, setResults] = useState([]);
    const [selectedResults, setSelectedResults] = useState([]);
    const [drugName, setDrugName] = useState('');
    const [drugData, setDrugData] = useState();
    const [input,setInput] = useState('');
    const [existingResults,setExistingResults] = useState({});
    const [currentSelectedItem,setCurrentSelectedItem] = useState(null);
    const [drugNames, setDrugNames] = useState([]);
    const [loggedIn,setLoggedIn] = useState(false);
    const removeResult = (resultToRemove) => {
        setSelectedResults(prevSelectedResults => prevSelectedResults.filter(item => item !== resultToRemove));
        setExistingResults(prev => {
            const newResults = { ...prev };
            delete newResults[resultToRemove];
            return newResults;
        });
    };
    const serverUrl = 'http://localhost:8080';
    const getDrugs = async () => {
        try {
            const response = await fetch(`${serverUrl}/users`, {
                method: 'GET',
                redirect:'follow',credentials:'include'
            });
            if (!response.ok) {
                throw new Error('Failed to fetch drugs');
            }
            const drugs = await response.json();
            if(response.redirected){
                document.location = response.url;
            }
            setDrugData(drugs);
        } catch (error) {
            console.error('Error fetching drugs:', error);
        }
    };
    const persistDrugs = async () => {
        try {
            const response = await fetch('http://localhost:8080/users/drugs', {
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
            window.location.href = `${serverUrl}/auth/login`;
        }
    };

    const handleLoginClick = () => {
        window.location.href = `${serverUrl}/auth/login`;
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
                if (response.ok) {
                    setLoggedIn(true);
                } else {
                    setLoggedIn(false);
                }
            } catch (error) {
                console.error('Error checking auth status:', error);
            }
        };
        checkAuthStatus();
    }, []);
    useEffect(()=>{
        if(loggedIn){

        }
    },[loggedIn])
    useEffect(() => {
        (async () => {
            if (drugName.length > 0) {
                try {
                    const data = await fetchDrugs(drugName);
                    setDrugData(data);
                }
                catch (e) {
                    setDrugData({
                        'Drug not found': 'Please try a different drug'
                    })
                }

            }
        })();
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

        return (
            <Tabs defaultActiveKey="first" className="mb-3">
                {Object.entries(drugData).map(([key, value], index) => (
                    <Tab eventKey={key} title={key} key={index}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Card style={{ padding: '10px', width: '80%', height: '80%' }}>
                                {stripHtml(value)}
                            </Card>
                        </div>
                    </Tab>
                ))}
            </Tabs>
        );
    };

    return (
        <div className="parent-search">
            <div style={{textAlign:'end', marginRight:'10px'}} onClick={()=>{
                handleSaveClick();
            }} >Save</div>
            <div style={{textAlign:'end', marginRight:'10px'}} onClick={()=>{
                handleLoginClick();
            }} >Login</div>
            <div className="search-bar-container">
                
                    <div style={{display:'flex',width:'100%'}}>
                    <SearchBar setResults={setResults} input={input} setInput={setInput} />
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
                    
                    } style={{marginLeft:'10px'}}>Search</Button>
                    </div>
                    {results ? <SearchResultsList results={results} setSelectedResults={setSelectedResults} selectedResults={selectedResults} existingResults={existingResults} setExistingResults={setExistingResults} /> : <></>}


                    <Stack>
    {selectedResults.map((result, index) => 
        (
        <div className={`selected-result-item ${currentSelectedItem === result ? 'selected' : ''}`} key={index}>
            <div onClick={() => {
                setDrugName(result);
                setCurrentSelectedItem(result);
                 }}>
                {result}
            </div>
            <Button
                className="remove-button"
                style={{ borderRadius: '10px', borderRadius:'20px' }}
                onClick={(e) => {
                    e.stopPropagation();
                    removeResult(result);
                }}
                aria-label={`Remove ${result}`}
            >
                X
            </Button>
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