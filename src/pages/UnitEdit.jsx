
import { useCallback, useEffect, useState } from "react"
import { unitService } from "../servies/unit.service"
import { useLocation, useNavigate, useParams } from "react-router"
import { uploadService } from "../servies/upload.service"
import { UnitEditHero } from "../cmps/UnitEdit/UnitEditHero"

export function UnitEdit({ unitId }) {

    const [unitToEdit, setUnitToEdit] = useState(unitService.getEmptyUnit())
    const [activeSubUnits, setActiveSubUnits] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const updateUnit = location.state && location.state.unitId
        if (!unitId && updateUnit) {
            loadUnit(updateUnit)
        }
        if (unitId) loadUnit(unitId)
    }, [unitId])

    useEffect(() => {
        if (unitToEdit && unitToEdit.subUnits && unitToEdit.subUnits.length)
            onLoadSubUnits()
    }, [unitToEdit.subUnits])

    const loadUnit = async (unitId) => {
        try {
            const unit = await unitService.getById(unitId)
            setUnitToEdit(unit)
        } catch (err) { console.log(err) }
    }

    const onLoadSubUnits = async () => {
        const subUnitPromises = unitToEdit.subUnits.map(unitId => unitService.getById(unitId))

        try {
            const results = await Promise.allSettled(subUnitPromises)
            let successfulSubUnits = []
            let failedIndices = []

            results.forEach((result, index) => {
                if (result.status === 'fulfilled') {
                    successfulSubUnits.push(result.value)
                } else {
                    console.error(`Failed to load subUnit with id ${unitToEdit.subUnits[index]}`, result.reason)
                    failedIndices.push(index)
                }
            })

            const updatedSubUnits = unitToEdit.subUnits.filter((_, index) => !failedIndices.includes(index))

            setUnitToEdit(prevUnit => {
                const newUnit = onSaveUnit(null, { ...prevUnit, subUnits: updatedSubUnits })
                return newUnit
            })

            setActiveSubUnits(successfulSubUnits)
        } catch (err) {
            console.error("An unexpected error occurred:", err)
        }
    }

    const onSaveUnit = async (ev, unitToSave = unitToEdit) => {
        console.log("unitToSave:", unitToSave)
        if (ev) ev.preventDefault()
        try {
            console.log("unitToEdit:", unitToSave)
            const unit = await unitService.save(unitToSave)
        } catch (err) { console.log(err) }
    }

    const onRemoveUnit = async (ev) => {
        ev.preventDefault()

        try {
            await unitService.remove(unitToEdit._id)
            navigate('/units')
        } catch (err) { console.log(err) }
    }

    const onAddSubUnit = async (ev) => {

        ev.preventDefault()
        const newSubUnit = unitService.getEmptyUnit()
        newSubUnit.parent = unitToEdit._id
        try {
            const saveSubUnit = await unitService.save(newSubUnit)
            setUnitToEdit(prevUnit => {
                const units = [...prevUnit.subUnits, saveSubUnit._id]
                const newUnit = { ...prevUnit, subUnits: units }
                onSaveUnit(ev, newUnit)
                return { ...prevUnit, subUnits: units }
            })
        } catch (err) { console.log(err) }
    }

    const onBack = () => {
        navigate('/units')
    }

    const handleChange = ({ target }) => {
        let value = target.value
        let field = target.name

        setUnitToEdit(prevUnit => ({ ...prevUnit, [field]: value }))
    }

    const onUploadImg = useCallback(async (ev) => {
        const file = ev.target.files[0]
        if (!file) return
        try {
            const imgUrlRes = await uploadService.uploadImg(file)
            const imgUrl = imgUrlRes
            setUnitToEdit(  prevUnit => {
                const test =  prevUnit
                return { ...prevUnit, imgUrl }
            })
        } catch (err) {
            console.error('Error uploading image:', err)
        }
    }, [])

    if (!unitToEdit) return <div>...Loading</div>
    const { name, subUnits, style, description, type, imgUrl, level } = unitToEdit
    const unitsToAdd = unitService.getSubUnits()
    const adminUnits = unitService.getAdminstrativeUnits()
    const unitTypes = unitService.getUnitTypes()

    return (
        <section className="unit-edit">
            <form onSubmit={(ev) => onSaveUnit(ev)}>
                <label htmlFor="file-input">
                    <input type="file" id="file-input" name="image" onChange={onUploadImg}   />
                    <img src={imgUrl} alt="unit-img"></img>

                </label>
                <input type="text" name="name" value={name || ''} placeholder="Unit Name" onChange={handleChange} />
                <input type="color" id="style" name="style" onChange={handleChange} />
                <textarea name="description" rows="4" cols="50" value={description} onChange={handleChange}></textarea>
                <label htmlFor="type">{type}</label>
                <select onChange={handleChange} name="type">
                    <option value={type || ''}></option>
                    <option value="gaming">Gaming</option>
                    <option value="support">Support</option>
                    <option value="operation">Operation</option>
                </select>
                <select onChange={handleChange} name="level">
                    <option value={level || 'level'}></option>
                    {unitsToAdd.map((lvl, idx) =>
                        <option key={idx} value={lvl}>{lvl}</option>
                    )}
                </select>
                <button>Save</button>
            </form>
            {unitToEdit._id ?
                <button onClick={onRemoveUnit}>Remove</button>
                :
                <button onClick={onBack}>Cancel</button>
            }
            <section className="sub-units">
                <button onClick={onAddSubUnit}>Add</button>
                {(activeSubUnits && activeSubUnits.length) &&
                    activeSubUnits.map((unit, idx) =>
                        <li key={idx}>
                            <UnitEdit unitId={unit._id}></UnitEdit>
                        </li>
                    )
                }
            </section>
        </section>
    )
} 
