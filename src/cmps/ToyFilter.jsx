// const { useState, useEffect, useRef } = React
import { useState, useEffect, useRef } from "react"
import Select from "react-select"

import { utilService } from "../services/util.service.js"


export function ToyFilter({ filterBy, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })
    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffect(() => {
        onSetFilter.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value
        if (field === 'inStock' && value !== '') value = value === 'true' ? true : false
        else if (field ==='sortDir') value = target.checked ? -1 : 1
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function handleLabelsChange(selectedOptions) {
        selectedOptions = [...selectedOptions].map(selectedOption => selectedOption.value + '')
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, labels: selectedOptions }))
    }

    const labelsOptions = [
        'Fun', 'Educational', 'Interactive', 'Colorful', 'Creative',
        'Imaginative', 'Durable', 'Safe', 'Engaging', 'Unique'
    ].map(label => ({ value: label, label }))

    return (
        <section className="toy-filter full main-layout">
            <h2>Toys Filter</h2>
            <form >
                <label htmlFor="name">Name:</label>
                <input type="text"
                    id="name"
                    name="txt"
                    placeholder="By name"
                    value={filterByToEdit.txt}
                    onChange={handleChange}
                />

                <label htmlFor="maxPrice">Max price:</label>
                <input type="number"
                    id="maxPrice"
                    name="maxPrice"
                    placeholder="By max price"
                    value={filterByToEdit.maxPrice || ''}
                    onChange={handleChange}
                />

                <label htmlFor="inStock">In stock: </label>
                <select id="inStock"
                    name="inStock"
                    value={filterByToEdit.inStock}
                    onChange={handleChange}>
                    <option value="">All</option>
                    <option value={true}>In stock</option>
                    <option value={false}>Not in stock</option>
                </select>

                <label htmlFor="labels">Labels: </label>
                <Select isMulti={true} value={filterByToEdit.labels ? filterByToEdit.labels.map(label => ({ value: label, label })) : []} onChange={handleLabelsChange} id="labels" name="labels" options={labelsOptions} />

                <label htmlFor="sortBy">Sort By: </label>
                <select id="sortBy"
                    name="sortBy"
                    value={filterByToEdit.sortBy}
                    onChange={handleChange}>
                    <option value="name">Name</option>
                    <option value="price">Price</option>
                    <option value="createdAt">Date created</option>
                </select>

                <label htmlFor="sortDir">Des: </label>
                <input type="checkbox" id="sortDir" name="sortDir" onChange={handleChange} checked={filterByToEdit?.sortDir === -1 ? true :false}/>
            </form>

        </section>
    )
}