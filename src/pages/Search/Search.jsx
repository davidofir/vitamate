import SearchBar from '../../components/Searchbar/SearchBar';
import './Search.css'
function Search(){
    return(
        <div className="parent-search">
            <div className="search-bar-container">
                <SearchBar/>
                <div>Search Results</div>
            </div>
        </div>
        );
}
export default Search;