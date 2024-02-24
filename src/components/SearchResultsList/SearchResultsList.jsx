import SearchResultItem from "../SearchResultItem/SearchResultItem";
import "./SearchResultsList.css"
export default function({results}){
    return(
        <div className="results-list">
            {
                results.map((result,id)=>{
                    return <SearchResultItem result={result} key={id}/>
                })
            }
        </div>
    );
}