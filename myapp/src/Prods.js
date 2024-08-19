import React, { useEffect, useState } from 'react'
import axios from "axios"
const Prods = () => {
    const SERVER = "http://127.0.0.1:8000/products/"
    const [products, setproducts] = useState([])
    const loadData = () => {
        axios(SERVER).then(res => setproducts(res.data))
    }
    useEffect(() => {
        loadData()
    }, [])

    return (
        <div>Prods
            {products.map((prod, ind) => <div key={ind}>{prod.title} {prod.description} {prod.price} <button>delete</button></div>)}
        </div>
    )
}

export default Prods