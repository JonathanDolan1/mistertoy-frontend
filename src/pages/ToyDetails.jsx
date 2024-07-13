// const { useEffect, useState } = React
// const { useParams, useNavigate, Link } = ReactRouterDOM

import { useEffect,useState } from "react"
import { useParams,useNavigate,Link } from "react-router-dom"

import { toyService } from "../services/toy.service.local.js"
import { showErrorMsg } from "../services/event-bus.service.js"
import { utilService } from "../services/util.service.js"

export function ToyDetails() {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => setToy(toy))
            .catch((err) => {
                console.log('Had issues in toy details', err)
                showErrorMsg('Cannot load toy')
                navigate('/toy')
            })
    }



    if (!toy) return <div>Loading...</div>
    return <section className="toy-details">
        <h1>{toy.name}</h1>
        <h5>Price: ${toy.price}</h5>
        <p>🧸</p>
        <p>Created at: {utilService.formatTimestamp(toy.createdAt)}</p>
        <p>Labels: {toy.labels.join(', ')}</p>
        <p>{(toy.inStock ? 'In' : 'Not in') + ' stock'}</p>
        <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
    </section>
}