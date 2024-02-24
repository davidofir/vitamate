import { useEffect, useState } from 'react';
import SearchBar from '../../components/Searchbar/SearchBar';
import './Search.css'
import SearchResultsList from '../../components/SearchResultsList/SearchResultsList';
function Search(){
    const [results, setResults] = useState([]);
    return(
        <div className="parent-search">
            <div className="search-bar-container">
                <SearchBar setResults={setResults}/>
                <SearchResultsList results={results}/>
            </div>
        </div>
        );
}
export default Search;