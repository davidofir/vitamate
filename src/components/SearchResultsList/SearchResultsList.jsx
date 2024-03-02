import SearchResultItem from "../SearchResultItem/SearchResultItem";
import "./SearchResultsList.css"
export default function({results,setSelectedResults,selectedResults}){
    return(
        <div className="results-list">
            {
                results.map((result,id)=>{
                    return <SearchResultItem result={result} key={id} setSelectedResults={setSelectedResults} selectedResults={selectedResults}/>
                })
            }
        </div>
    );
}