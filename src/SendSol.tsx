import { useEffect, useState } from 'react'

export default function SendSol(){
    return
    <form action="/localhost:3001/sendsol" method="POST">
        <input type="textarea"></input>
        <input type="submit"></input>
    </form>

}