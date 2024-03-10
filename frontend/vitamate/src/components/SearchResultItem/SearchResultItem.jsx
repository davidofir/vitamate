import "./SearchResultItem.css"
export default function SearchResultItem({key,result,setSelectedResults,selectedResults,existingResults,setExistingResults}){
    return(
        <div className="search-item-container" onClick={e=>{
            e.stopPropagation();
            const newResult = result.trim().toUpperCase();
            if (newResult && !existingResults[newResult]) {
                setSelectedResults([...selectedResults, newResult]);
                setExistingResults(prev => ({ ...prev, [newResult]: true }));
            }}
            } key={key}>
            {result}
        </div>
    );
}