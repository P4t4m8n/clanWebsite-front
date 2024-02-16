import { useEffect, useState } from "react"
import { unitService } from "../../service/unit.service"

export function UnitsApplySelectCmp({ handleChange }) {

    const [units, setUnits] = useState(null)

    useEffect(() => {
        getUnits()
    }, [])

    async function getUnits() {
        try {
            const units = await unitService.query({ level: 'Division' })
            setUnits(units)

        } catch (err) { console.log(err) }
    }

    if (!units) return
    return (
        <select onChange={handleChange} name="units">
            <option >pick a unit</option>
            {units.map((unit, idx) => {
                { console.log(unit) }

                return <option key={unit._id} value={idx}>{unit.name}</option>
            })}
        </select>
    )

}