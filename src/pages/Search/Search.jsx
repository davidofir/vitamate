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
function Search() {
    const [results, setResults] = useState([]);
    const [selectedResults, setSelectedResults] = useState([]);
    const [drugName, setDrugName] = useState('');
    const [drugData, setDrugData] = useState();
    const [input,setInput] = useState('');
    const [existingResults,setExistingResults] = useState({});
    const [currentSelectedItem,setCurrentSelectedItem] = useState(null);
    const removeResult = (resultToRemove) => {
        setSelectedResults(prevSelectedResults => prevSelectedResults.filter(item => item !== resultToRemove));
        setExistingResults(prev => {
            const newResults = { ...prev };
            delete newResults[resultToRemove];
            return newResults;
        });
    };

    const stripHtml = (htmlString) => {
        const temporalDivElement = document.createElement("div");
        temporalDivElement.innerHTML = htmlString;
        let text = temporalDivElement.textContent || temporalDivElement.innerText || "";

        text = text.replace('•', '\n•');
        
        return text;
    };
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
            <div onClick={() => {setDrugName(result); setCurrentSelectedItem(result);}}>
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