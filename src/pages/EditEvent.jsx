import { useEffect, useState } from "react";
import { eventService } from "../servies/event.service";
import { useParams } from "react-router";


export function EditEvent({ unit, CreateBy = user }) {

    const [eventToEdit, setEventToEdit] = useState(eventService.getEmptyEvent(unit, CreateBy))
    const params = useParams()

    useEffect(() => {
        if (params.eventId) loadEvent(params.eventId)
    }, [params.eventId])

    const loadEvent = async (eventId) => {
        try {

            const event = await eventService.getById(eventId)
            setEventToEdit(event)
        } catch (err) { console.log(err) }
    }

    const onSaveEvent = async (ev, eventToSave = eventToEdit) => {
        if (ev) ev.preventDefault()
        try {
            const event = await eventService.save(eventToSave)
        } catch (err) { console.log(err) }
    }

    const onRemoveEvent = async (ev) => {
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
            setUnitToEdit(prevUnit => {
                const test = prevUnit
                return { ...prevUnit, imgUrl }
            })
        } catch (err) {
            console.error('Error uploading image:', err)
        }
    }, [])

}