import {useState} from 'react'


export default function Home() {

    type window = 'Home' | 'Jobs'     
    const [win, setWin] = useState<window>('Home')
    if(win ==='Home'){
        return (
            <>
            <button onClick={() => setWin('Jobs')}>Search Jobs</button>
            </>
        )
    }
    else {
        return (
            <>
            <button onClick = {() => setWin('Home')}>Go Back Home</button>
            </>
        )
    }
}