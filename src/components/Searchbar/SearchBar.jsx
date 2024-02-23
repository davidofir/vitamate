import {FaSearch} from 'react-icons/fa'
import './SearchBar.css'
import { useEffect, useState } from 'react'
export default function SearchBar(){
    const [input,setInput] = useState();

    const fetchData = (value)=>{
        setInput(value)
    }
    useEffect(()=>{
        console.log(input)
    },[input])
    return(
        <div className="input-wrapper">
            <FaSearch id="search-icon"/>
            <input placeholder='Type to search...' value={input} onChange={e => fetchData(e.target.value)}/>
        </div>
    )
}