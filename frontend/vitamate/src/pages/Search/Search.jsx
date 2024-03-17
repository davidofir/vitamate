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
import { FaEnvelope } from 'react-icons/fa';
import { GoogleGenerativeAI } from "@google/generative-ai";



function Search() {
    
    const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
    async function run(textToSummarize){
        try{
            const model = genAI.getGenerativeModel({ model: "gemini-pro"});
            const prompt = `Summarize the following text: ${textToSummarize}`;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            return await response.text();
        }
        catch(e){
            console.error(e);
            return textToSummarize; 
        }
    }
    const MAX_WORD_COUNT = 200;
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

    const fetchNodeGemini = async (text) => {
    try {
        const response = await fetch('https://8596-172-93-153-68.ngrok-free.app/summarize', {
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
        const body = encodeURIComponent(`Medications and drugs taken by the patient: ${results}`)
        window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }
    const getDrugs = async () => {
        try {
            const response = await fetch(`${serverUrl}/users`, {
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
            const response = await fetch(`${serverUrl}/users/drugs`, {
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
    useEffect(() => {
        (async () => {
            if (drugName.length > 0) {
                try {
                    const data = await fetchDrugs(drugName);
                    const summaries = {};
    
                    for (const [key, value] of Object.entries(data)) {
                        const plainText = stripHtml(value);
                        summaries[key] = plainText.split(' ').length > MAX_WORD_COUNT 
                                        ? await fetchNodeGemini(plainText)
                                        : plainText;
                    }
                    console.log(summaries)
                    setDrugData(summaries);
                }
                catch (e) {
                    setDrugData({
                        'Drug not found': 'Please try a different drug'
                    });
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
            <Tabs style={{display:'flex',justifyContent:'center',marginTop:'10px'}} defaultActiveKey="first" className="mb-3">
                {Object.entries(drugData).map(([key, value], index) => (
                    <Tab eventKey={key} title={key} key={index}>
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <Card style={{ padding: '10px', width: '80%', height: '80%' }}>
                                {value}
                            </Card>
                        </div>
                    </Tab>
                ))}
            </Tabs>
        );
    };

    return (
        <div className="parent-search">
            <div style={{display:'flex',justifyContent:'space-between'}}>
            <img style={{width:'250px'}} src='VitaMateLogo.png'/>
            <div style={{ marginRight:'10px',marginTop:'10px'}}>
            { !loggedIn ? (<Button style={{borderRadius:'20px'}} onClick={()=>{
                handleLoginClick();
            }} >Login</Button>): (<Button onClick={()=>{
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
                                <Button variant='outline-primary' style={{marginLeft:'10px',borderRadius:'10px'}} onClick={()=>{
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