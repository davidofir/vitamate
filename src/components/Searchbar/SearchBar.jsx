import {FaSearch} from 'react-icons/fa'
import './SearchBar.css'
import { useEffect, useState } from 'react'
import drugs from '../../Drugs/Drugs.json'
export default function SearchBar({setResults}){
    const [input,setInput] = useState("");
    useEffect(()=>{
        fetchData(input)
    },[input])
    const fetchData = (value) => {
        let results = []
        if (value.length >= 3) {
        results = drugs['drug-name'].filter(name => 
            name.toUpperCase().includes(value.toUpperCase())
        
          );
        }
        setResults(results);
      };
    const handleChange = (value)=>{
        setInput(value)
    }
    return(
        <div className="input-wrapper">
            <FaSearch id="search-icon" />
            <input
                placeholder='Type to search...'
                value={input}
                onChange={e => handleChange(e.target.value)}
            />
        </div>
    )
}