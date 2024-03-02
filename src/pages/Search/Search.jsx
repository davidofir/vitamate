import { useEffect, useState } from 'react';
import SearchBar from '../../components/Searchbar/SearchBar';
import './Search.css'
import SearchResultsList from '../../components/SearchResultsList/SearchResultsList';
import Stack from 'react-bootstrap/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import {fetchDrugs} from '../../Services/HealthApi';

function Search(){
    const [results, setResults] = useState([]);
    const [selectedResults, setSelectedResults] = useState([]);
    const [drugName, setDrugName] = useState('');
    const [drugData,setDrugData] = useState();
    
    const existingValues = {};
    let data;
    useEffect(()=>{
      (async()=>{
        if(drugName.length > 0){
          data = await fetchDrugs(drugName);
          setDrugData(data)
        }
        
      })()
    },[drugName])
    const renderDrugData = () => {
      if (!drugData) {
          return <div>Please Select a Drug</div>;
      }

      return (
          <div>
              {Object.entries(drugData).map(([key, value]) => (
                  <div key={key}>
                      <strong>{key}:</strong> {value}
                  </div>
              ))}
          </div>
      );
  };
    return(
        <div className="parent-search">
            <div className="search-bar-container">
                <SearchBar setResults={setResults}/>
                <SearchResultsList results={results} setSelectedResults={setSelectedResults} selectedResults={selectedResults}/>
                <Stack>
                  {selectedResults.map((result, id) => {
                    if (!existingValues[result]) {
                      existingValues[result] = true;
                      return (
                        <div className="selected-result-item" key={id}>
                            <div onClick={(e)=>{
                                e.stopPropagation();
                                setDrugName(e.target.textContent)
                            }}>
                                {result}
                            </div>
                                
                          
                          <Button 
                            className="remove-button"
                            style={{borderRadius:'10px'}} 
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedResults(selectedResults.filter(item => item !== result));
                            }}
                            aria-label={`Remove ${result}`}
                          >
                            X
                          </Button>
                        </div>
                      );
                    }else{
                      return <div></div>
                    }
                  })}
            </Stack>
                </div>
                {renderDrugData()}
                  </div>
        );
}
export default Search;