import "./SearchResultItem.css"
export default function SearchResultItem({key,result,setSelectedResults,selectedResults}){
    return(
        <div className="search-item-container" onClick={e=>setSelectedResults([...selectedResults,result])} key={key}>
            {result}
        </div>
    );
}