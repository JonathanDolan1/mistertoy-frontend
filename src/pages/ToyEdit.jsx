// const { useState, useEffect } = React
// const { useNavigate, useParams, Link } = ReactRouterDOM
import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"

import { toyService } from "../services/toy.service.local.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { saveToy } from "../store/actions/toy.actions.js"

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const { toyId } = useParams()

    useEffect(() => {
        if (!toyId) return
        loadToy()
    }, [])

    function loadToy() {
        toyService.getById(toyId)
            .then((toy) => {
                setToyToEdit(toy)
                markToyLabels(toy.labels)
                markInStock(toy.inStock)
            })
            .catch((err) => {
                console.log('Had issues in toy details', err)
                navigate('/toy')
            })
    }

    function markToyLabels(labels) {
        labels.forEach(label => {
            document.querySelector('#' + label).checked = true
        })
    }

    function markInStock(inStock) {
        if (inStock) document.querySelector('#inStock').checked = true
    }

    function handleChange({ target }) {
        let { checked, value, type, name: field } = target
        value = type === 'number' ? +value : value
        value = type === 'checkbox' ? checked : value
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function handleLabelChange({ target }) {
        const { checked, name: field } = target
        setToyToEdit((prevToy) => {
            const labelsSet = new Set([...prevToy.labels])
            checked ? labelsSet.add(field) : labelsSet.delete(field)
            return { ...prevToy, labels: [...labelsSet] }
        })
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        saveToy(toyToEdit)
            .then((toy) => {
                console.log('toy saved', toy);
                showSuccessMsg('Toy saved!')
                navigate('/toy')
            })
            .catch(err => {
                console.log('err', err)
                showErrorMsg('Cannot save toy')
            })
    }

    return <section className="toy-edit">
        <h2>{toyToEdit.id ? 'Edit this toy' : 'Add a new toy'}</h2>

        <form onSubmit={onSaveToy}>
            <label htmlFor="name">Name : </label>
            <input type="text"
                name="name"
                id="name"
                placeholder="Enter name..."
                value={toyToEdit.name}
                onChange={handleChange}
            />
            <label htmlFor="price">Price : </label>
            <input type="number"
                name="price"
                id="price"
                placeholder="Enter price"
                value={toyToEdit.price}
                onChange={handleChange}
            />

            <div>
                <p>Labels: </p>

                <input type="checkbox"
                    name="Fun"
                    id="Fun"
                    onChange={handleLabelChange}
                />
                <label htmlFor="Fun">Fun</label>

                <input type="checkbox"
                    name="Educational"
                    id="Educational"
                    onChange={handleLabelChange}
                />
                <label htmlFor="Educational">Educational</label>

                <input type="checkbox"
                    name="Interactive"
                    id="Interactive"
                    onChange={handleLabelChange}
                />
                <label htmlFor="Interactive">Interactive</label>

                <input type="checkbox"
                    name="Colorful"
                    id="Colorful"
                    onChange={handleLabelChange}
                />
                <label htmlFor="Colorful">Colorful</label>

                <input type="checkbox"
                    name="Creative"
                    id="Creative"
                    onChange={handleLabelChange}
                />
                <label htmlFor="Creative">Creative</label>

                <input type="checkbox"
                    name="Imaginative"
                    id="Imaginative"
                    onChange={handleLabelChange}
                />
                <label htmlFor="Imaginative">Imaginative</label>

                <input type="checkbox"
                    name="Durable"
                    id="Durable"
                    onChange={handleLabelChange}
                />
                <label htmlFor="Durable">Durable</label>

                <input type="checkbox"
                    name="Safe"
                    id="Safe"
                    onChange={handleLabelChange}
                />
                <label htmlFor="Safe">Safe</label>

                <input type="checkbox"
                    name="Engaging"
                    id="Engaging"
                    onChange={handleLabelChange}
                />
                <label htmlFor="Engaging">Engaging</label>

                <input type="checkbox"
                    name="Unique"
                    id="Unique"
                    onChange={handleLabelChange}
                />
                <label htmlFor="Unique">Unique</label>

            </div>

            <input type="checkbox"
                name="inStock"
                id="inStock"
                onChange={handleChange}
            />
            <label htmlFor="inStock">In stock</label>

            <div>
                <button>{toyToEdit._id ? 'Save' : 'Add'}</button>
                <Link to="/toy">Cancel</Link>
            </div>
        </form>
    </section>
}