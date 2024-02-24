import {FaSearch} from 'react-icons/fa'
import './SearchBar.css'
import { useEffect, useState } from 'react'
import drugs from '../../Drugs/Drugs.json'
export default function SearchBar(){
    const [input,setInput] = useState("");

    const fetchData = (value) => {
        if (value.length >= 3) {
          return drugs['drug-name'].filter(name => 
            name.toUpperCase().includes(value.toUpperCase())
          );
        }
        return [];
      };
    const handleChange = (value)=>{
        setInput(value)
        console.log(fetchData(value));
    }
    return(
        <div className="input-wrapper">
            <FaSearch id="search-icon"/>
            <input placeholder='Type to search...' value={input} onChange={e => handleChange(e.target.value)}/>
        </div>
    )
}