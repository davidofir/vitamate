import "./SearchResultItem.css"
import { FaSave } from "react-icons/fa";
export default function SearchResultItem({key,result,setSelectedResults,selectedResults,existingResults,setExistingResults}){
    return(
        <div className="search-item-container" style={{display:'flex',justifyContent:'space-between'}}>
            <div  onClick={e=>{
            e.stopPropagation();
            const newResult = result.trim().toUpperCase();
            if (newResult && !existingResults[newResult]) {
                setSelectedResults([...selectedResults, newResult]);
                setExistingResults(prev => ({ ...prev, [newResult]: true }));
            }}
            } key={key}>
            {result}
            </div>
            <div style={{display:'flex',alignItems:'center'}}>
            <FaSave/>
            </div>
        </div>
    );
}