import {useEffect, useState} from 'react'
import ReactMarkdown from "react-markdown"


export function Problem(){
    
}

export function Problems() {
    const [problems, setProblems] = useState<any>([])
    const [selected, setSelected] = useState<number>(-1)
    if(selected == -1){
      useEffect(() => {
        fetch('http://localhost:3001/problems')
        .then(res => res.json())
        .then(data => {
            setProblems(data)
        })
      }, [])
      //console.log(problems)
      let arr:any=[]
      problems.map((p:any) => arr.push(<p>{p.id_pb}. {p.nume}</p>))
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
        //fetch la problems/id -> valoare selected
    } 
    
}