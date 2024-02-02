import { useEffect, useState } from "react"
import { unitService } from "../servies/unit.service"
import { UnitList } from "../cmps/UnitList"
import { Link, useNavigate } from "react-router-dom"


export function UnitIndex() {

    const [units, setUnits] = useState([])
    const navigate = useNavigate()
    useEffect(() => {
        loadUnits()
    }, [])

    const loadUnits = async () => {
        try {
            const dbUnits = await unitService.query()
            setUnits(dbUnits)
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
            <UnitList units={units}></UnitList>
        </>
    )
}