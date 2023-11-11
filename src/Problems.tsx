import {useState} from 'react'

function Pb({name} : {name: string}){
    return <p>{name}</p>
}



export default function Problems() {
    return (
        <Pb name = 'problem' />
    )
}