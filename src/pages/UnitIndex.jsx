import { useEffect, useState } from "react"
import { unitService } from "../servies/unit.service"
import { UnitList } from "../cmps/UnitList"
import { Link, useNavigate } from "react-router-dom"


export function UnitIndex() {

    const [divisions, setDivisions] = useState([])
    const [corps, setCoprs] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        loadUnits()
    }, [])

    const loadUnits = async () => {
        try {
            const tempCorps = await unitService.query({ level: 'Corps' })
            console.log("tempCorps:", tempCorps)
            const tempDivision = await unitService.query({ level: 'Division' })
            console.log("tempDivision:", tempDivision)
            setDivisions(tempDivision)
            setCoprs(tempCorps)
        } catch (err) { console.log(err) }
    }

    const onAddUnit = async (ev) => {
        try {
            const emptyUnit = unitService.getEmptyUnit()
            const unit = await unitService.save(emptyUnit)
            navigate(unit._id + "/edit/", { state: { unitId: unit._id } })
        } catch (err) { console.log(err) }
    }

    return (
        <>
            <button onClick={onAddUnit}>Add</button>
            <UnitList units={corps}></UnitList>
            <UnitList units={divisions}></UnitList>
        </>
    )
}