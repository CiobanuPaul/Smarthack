import { useEffect, useState } from 'react'


export function Grafic1() {
    const [date, setDate] = useState<Array<any>>([]);
    useEffect(() => {
        fetch('http://localhost:3001/grafic1')
            .then(res => res.json())
            .then(data => {
                setDate(data);
                console.log(data)
            })
    }, [])
    let list1 = date.map((zi) => { return (<td>{zi.time.slice(0, 10)}</td>) });
    let list2 = date.map((zi) => { return (<td>{zi.a}</td>) });
    return (

        <>
            <table>
                <tr>
                    {list1}
                </tr>
                <tr>
                    {list2}
                </tr>
            </table>
        </>
    )
}
export function Code_cleanliness() {
    const [date, setDate] = useState<Array<any>>([]);
    useEffect(() => {
        fetch('http://localhost:3001/code_cleanliness')
            .then(res => res.json())
            .then(data => {
                setDate(data);
                console.log(data)
            })
    }, [])
    let list1 = date.map((zi) => { return (<td>{zi.time.slice(0, 10)}</td>) });
    let list2 = date.map((zi) => { return (<td>{zi.a}</td>) });
    return (

        <>
            <table>
                <tr>
                    {list1}
                </tr>
                <tr>
                    {list2}
                </tr>
            </table>
        </>
    )
}
export function Comments() {
    const [date, setDate] = useState<Array<any>>([]);
    useEffect(() => {
        fetch('http://localhost:3001/comments')
            .then(res => res.json())
            .then(data => {
                setDate(data);
                console.log(data)
            })
    }, [])
    let list1 = date.map((zi) => { return (<td>{zi.time.slice(0, 10)}</td>) });
    let list2 = date.map((zi) => { return (<td>{zi.a}</td>) });
    return (

        <>
            <table>
                <tr>
                    {list1}
                </tr>
                <tr>
                    {list2}
                </tr>
            </table>
        </>
    )
}
export function Error_handling() {
    const [date, setDate] = useState<Array<any>>([]);
    useEffect(() => {
        fetch('http://localhost:3001/error_handling')
            .then(res => res.json())
            .then(data => {
                setDate(data);
                console.log(data)
            })
    }, [])
    let list1 = date.map((zi) => { return (<td>{zi.time.slice(0, 10)}</td>) });
    let list2 = date.map((zi) => { return (<td>{zi.a}</td>) });
    return (

        <>
            <table>
                <tr>
                    {list1}
                </tr>
                <tr>
                    {list2}
                </tr>
            </table>
        </>
    )
}

export function Good_practices() {
    const [date, setDate] = useState<Array<any>>([]);
    useEffect(() => {
        fetch('http://localhost:3001/good_practices')
            .then(res => res.json())
            .then(data => {
                setDate(data);
                console.log(data)
            })
    }, [])
    let list1 = date.map((zi) => { return (<td>{zi.time.slice(0, 10)}</td>) });
    let list2 = date.map((zi) => { return (<td>{zi.a}</td>) });
    return (

        <>
            <table>
                <tr>
                    {list1}
                </tr>
                <tr>
                    {list2}
                </tr>
            </table>
        </>
    )
}
