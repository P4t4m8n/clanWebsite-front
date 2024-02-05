
import { useCallback, useEffect, useState } from "react"
import { unitService } from "../servies/unit.service"
import { useLocation, useNavigate, useParams } from "react-router"
import { uploadService } from "../servies/upload.service"
import { UnitEditHero } from "../cmps/UnitEdit/UnitEditHero"
import { useForm } from "../customHooks/useForm"

export function UnitEdit({ unitId }) {

    const [fields, setFields, handleChange, activeUnits] = useForm(unitService.getEmptyUnit())
    console.log("fields:", fields)

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
        if (fields && fields.subUnits && fields.subUnits.length)
            onLoadSubUnits()
    }, [fields.subUnits])

    const loadUnit = async (unitId) => {
        try {
            const unit = await unitService.getById(unitId)
            setFields(unit)
        } catch (err) { console.log(err) }
    }

    const onLoadSubUnits = async () => {
        const subUnitPromises = fields.subUnits.map(unitId => unitService.getById(unitId))
        try {
            const results = await Promise.all(subUnitPromises)
            // let successfulSubUnits = []
            // let failedIndices = []

            // results.forEach((result, index) => {
            //     if (result.status === 'fulfilled') {
            //         successfulSubUnits.push(result.value)
            //     } else {
            //         console.error(`Failed to load subUnit with id ${fields.subUnits[index]}`, result.reason)
            //         failedIndices.push(index)
            //     }
            // })
            // const updatedSubUnits = fields.subUnits.filter((_, index) => !failedIndices.includes(index))

            // setFields(prevUnit => {
            //     const newUnit = onSaveUnit(null, { ...prevUnit, subUnits: updatedSubUnits })
            //     return newUnit
            // })

            setActiveSubUnits(results)
        } catch (err) {
            console.error("An unexpected error occurred:", err)
        }
    }

    const onSaveUnit = async (ev, unitToSave = fields) => {
        console.log("unitToSave:", unitToSave)
        if (ev) ev.preventDefault()
        try {
            console.log("unitToEdit:", unitToSave)
            const unit = await unitService.save(unitToSave)
            setFields(unit)
        } catch (err) { console.log(err) }
    }

    const onRemoveUnit = async (ev) => {
        ev.preventDefault()

        try {
            await unitService.remove(fields._id)
            navigate('/units')
        } catch (err) { console.log(err) }
    }

    const onAddSubUnit = useCallback(async (ev) => {
        ev.preventDefault();
        try {
           if(!fields._id) alert('save parent')
          
            const newSubUnit = unitService.getEmptyUnit();
            newSubUnit.parent = fields._id;
    
            const savedSubUnit = await unitService.save(newSubUnit);
    
            const updatedSubUnits = [...fields.subUnits, savedSubUnit._id];
            await onSaveUnit(null, { ...fields, subUnits: updatedSubUnits });
        } catch (err) { console.log(err) }
    }, [fields]);

    const onBack = () => {
        navigate('/units')
    }

    const onUploadImg = useCallback(async (ev) => {
        const file = ev.target.files[0]
        if (!file) return
        try {
            const imgUrlRes = await uploadService.uploadImg(file)
            const imgUrl = imgUrlRes
            setFields(prevUnit => {
                const test = prevUnit
                return { ...prevUnit, imgUrl }
            })
        } catch (err) {
            console.error('Error uploading image:', err)
        }
    }, [])

    if (!fields) return <div>...Loading</div>
    const { name, subUnits, style, description, type, imgUrl, level } = fields
    const unitsToAdd = unitService.getSubUnits()
    const adminUnits = unitService.getAdminstrativeUnits()
    const unitTypes = unitService.getUnitTypes()

    return (
        <section className="unit-edit">
            <form onSubmit={(ev) => onSaveUnit(ev)}>
                <label htmlFor="file-input">
                    <input type="file" id="file-input" name="image" onChange={onUploadImg} />
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
            {fields._id ?
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
