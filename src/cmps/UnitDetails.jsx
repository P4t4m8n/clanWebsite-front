import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { unitService } from "../service/unit.service";
import { Link } from "react-router-dom";


export function UnitDetails() {
    const [unit, setUnit] = useState(null)
    const [isOpen, setIsopen] = useState(false)
    const params = useParams()

    const open = (ev) => { setIsopen(true) }
    const close = (ev) => { setIsopen(false) }

    useEffect(() => {
        loadUnit(params.unitId)
    }, [])

    const loadUnit = async () => {
        try {
            const unit = await unitService.getById(params.unitId)
            setUnit(unit)
        } catch (err) { console.log(err) }
    }


    if (!unit) return <div>...Loading</div>
    const {
        name,
        imgUrl,
        subUnits,
        members,
        style,
        description,
        type
    } = unit

    return (
        <section className="unit-details">
            <img src={imgUrl}></img>
            <h3>{type}</h3>
            <header>{name}</header>
            <p>{description}</p>
            <Link to="edit" state={{ unitId: unit._id }} >Edit</Link>
        </section>
    )


}