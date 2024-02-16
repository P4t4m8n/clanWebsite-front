import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { unitService } from "../service/unit.service";
import { Link } from "react-router-dom";


export function UnitDetails({ unitId }) {
    const [unit, setUnit] = useState(null)
    const [isSubUnitOpen, setIsSubUnitOpen] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()


    useEffect(() => {
        const updateUnit = location.state && location.state.unitId
        if (!unitId && updateUnit) {
            loadUnit(updateUnit)
        }
        if (unitId) loadUnit(unitId)
    }, [unitId])

    // useEffect(() => {
    //     if (unit && unit.subUnits && unit.subUnits.length)
    //         onLoadSubUnits()
    // }, [])

    async function loadUnit(unitId) {
        try {
            const unit = await unitService.getById(unitId)
            setUnit(unit)
        } catch (err) { console.log(err) }
    }

    const onBack = () => {
        navigate('/units')
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
            <div className="unit-details-actions">
                <button onClick={onBack}>Back</button>
                <button onClick={() => setIsSubUnitOpen(!isSubUnitOpen)}>{isSubUnitOpen ? 'Close' : 'Open'}</button>
                <Link to="edit" state={{ unitId: unit._id }} >Edit</Link>
            </div>
            {isSubUnitOpen && (subUnits && subUnits.length) &&
                <ul className="sub-units">
                    {
                        subUnits.map((unit, idx) => {
                            { console.log(unit) }
                            return <li key={idx}>
                                <UnitDetails unitId={unit}></UnitDetails>
                            </li>
                        })}
                </ul>
            }
        </section>
    )


}