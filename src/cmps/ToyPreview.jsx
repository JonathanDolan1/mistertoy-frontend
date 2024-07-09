// const { Link } = ReactRouterDOM
import { Link } from "react-router-dom"

export function ToyPreview({ toy }) {

    return (
        <article>
            <h4>{toy.vendor}</h4>
            <h1>⛐</h1>
            <p>Price: <span>${toy.price.toLocaleString()}</span></p>
            {toy.owner && <p>Owner: <Link to={`/user/${toy.owner._id}`}>{toy.owner.fullname}</Link></p>}
            {/* <hr /> */}
            <section className="edit-links">
                <Link to={`/toy/${toy._id}`}>Details</Link> |
                <Link to={`/toy/edit/${toy._id}`}>Edit</Link>
            </section>
        </article>
    )
}