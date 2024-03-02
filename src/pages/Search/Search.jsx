import { useEffect, useState } from 'react';
import SearchBar from '../../components/Searchbar/SearchBar';
import './Search.css'
import SearchResultsList from '../../components/SearchResultsList/SearchResultsList';
import Stack from 'react-bootstrap/Stack';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
function Search(){
    const [results, setResults] = useState([]);
    const [selectedResults, setSelectedResults] = useState([]);
    const existingValues = {};
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
            {result}    
          
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
    }
  })}
</Stack>
            </div>

        </div>
        );
}
export default Search;