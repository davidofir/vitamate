import "./SearchResultItem.css"
export default function SearchResultItem({key,result}){
    return(
        <div key={key}>
            {result}
        </div>
    );
}