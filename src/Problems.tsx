import { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import ReactMarkdown from "react-markdown"
import {Grafic1, Code_cleanliness, Comments, Error_handling} from './Grafic1'




export default function Problems() {
  return (<Grafic1/>)
  const [problems, setProblems] = useState<any>([])
  const [selected, setSelected] = useState<number>(-1)
  const [description, setDescription] = useState<string>('')
  if (selected == -1) {
    useEffect(() => {
      fetch('http://localhost:3001/problems')
        .then(res => res.json())
        .then(data => {
          setProblems(data)
        })
    }, [])
    //console.log(problems)
    let arr: any = []
    
    problems.map((p: any) => arr.push(<p onClick={() => setSelected(p.id_pb)}>{p.id_pb}. {p.nume}</p>))
    console.log(arr)
    return (
      <ul>
        {
          arr
        }
        <Grafic1></Grafic1>
        <Code_cleanliness></Code_cleanliness>
        <Error_handling></Error_handling>
        <Comments></Comments>
      </ul>
    )
  }
  else {
    // await fetch(`http://localhost:3001/descpb?selected=${selected}`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   }
    // }).then((res: Response) => {
    //   if (res.body == null) { throw "why"; }
    //   return res.text()
    // }).then((data) => {
    //   console.log(data);
    //   return <Markdown>data</Markdown>;
    // })
    useEffect(() => {
      fetch(`http://localhost:3001/descpb?selected=${selected}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(res => res.text())
        .then(data => {
          setDescription(data)
        })
    }, [])
    console.log(description)
    return 
   ( <>
    <Markdown>{description}</Markdown>;
    <form action="/localhost:3001/sendsol" method="POST">
        <input type="textarea" name='cod'></input>
        <input type="text" name='id_pb'></input>
        <input type="submit"></input>
    </form>
    </>)
  }
}