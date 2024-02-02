import { Link } from "react-router-dom";


export function UnitPreview({ unit }) {
    return (
        <li>
            <header>{unit.name}</header>
            <img src={unit.imgUrl} alt="unit-img"></img>
            <p>{unit.description}</p>
        </li>

    )
}