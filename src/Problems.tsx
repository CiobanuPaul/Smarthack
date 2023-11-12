import {useEffect, useState} from 'react'
import ReactMarkdown from "react-markdown"




export function Problems() {
    const [problems, setProblems] = useState<any>([])
    const [selected, setSelected] = useState<object>({})
    if(selected == {}){
      useEffect(() => {
        fetch('http://localhost:3001/problems')
        .then(res => res.json())
        .then(data => {
            setProblems(data)
        })
      }, [])
      //console.log(problems)
      let arr:any=[]
      problems.map((p:any) => arr.push(<p onClick={()=>setSelected(p)}>{p.id_pb}. {p.nume}</p>))
      console.log(arr)
    return (
        <ul>
         {
            arr
         }   
        </ul>
    )  
    } 
    else {
      fetch('http://localhost:3001/pbanume', {
        method: 'POST',
        body: JSON.stringify({
          selected
        }), headers: {
          'Content-Type':'application/json'
        }
      }).then((res:Response)=>{
        return <ReactMarkdown>res</ReactMarkdown>;
      })
        
    } 
    
}