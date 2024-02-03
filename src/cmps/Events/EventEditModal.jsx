import { useEffect, useRef, useState } from "react"
import { eventService } from "../../servies/event.service"
import { unitService } from "../../servies/unit.service"
import { userService } from "../../servies/user.service"


export function EventEditModal({ setIsOpen, data, onSaveEvent, onRemoveEvent }) {

    const [eventToEdit, setEventToEdit] = useState(eventService.getEmptyEvent())
    const activeUnits = unitService.getAvailableJoinUnits()
    const user = userService.getLoggedinUser()
    console.log("user:", user)

    useEffect(() => {
        setEvent(data)

    }, [data])

    const setEvent = (data) => {
        const dateStartObj = new Date(data.start)
        const dateEndObj = new Date(data.end)
        const start = eventService.getDateFromObj(dateStartObj)
        const end = eventService.getDateFromObj(dateEndObj)
        const createBy = { name: user.username, _id: user._id }
        setEventToEdit(prevEvent => ({ ...prevEvent, start, end, createBy }))
    }
    const handleChange = ({ target }) => {

        let value = target.value
        let field = target.name

        switch (target.type) {
            case "time":
                if (field === 'startTime') {
                    const start = { ...eventToEdit.start, time: value }
                    return setEventToEdit(prevEvent => ({ ...prevEvent, start }))
                }
                else {
                    const end = { ...eventToEdit.end, time: value }
                    return setEventToEdit(prevEvent => ({ ...prevEvent, end }))
                }

            case "date":
                if (field === 'startDate') {
                    const start = { ...eventToEdit.start, date: value }
                    return setEventToEdit(prevEvent => ({ ...prevEvent, start }))
                }
                else {

                    const end = { ...eventToEdit.end, date: value }
                    return setEventToEdit(prevEvent => ({ ...prevEvent, end }))
                }

            case "select-one":
                return setEventToEdit(prevEvent => ({ ...prevEvent, unit: activeUnits[value] }))

            default:
                return setEventToEdit(prevEvent => ({ ...prevEvent, [field]: value }))
        }
    }


    const {
        unit,
        name,
        description,
        start,
        end,
        inviteList,
        isMandtory,
    } = eventToEdit

    if (!eventToEdit) return
    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <form>
                    <input type="text" name="name" value={name} onChange={handleChange} />
                    <input type="time" name="startTime" value={start.time} onChange={handleChange} />
                    <input type="date" name="startDate" value={start.date} onChange={handleChange} />
                    <input type="time" name="endTime" value={end.time} onChange={handleChange} />
                    <input type="date" name="endDate" value={end.date} onChange={handleChange} />
                    <textarea name="description" rows="4" cols="50" value={description} placeholder="description" onChange={handleChange} />
                    <select name="unit" onChange={handleChange} >
                        <option  value="">--Please choose an unit--</option>
                        {activeUnits.map((unit, idx) =>
                            <option key={idx} value={idx}>{unit.name}</option>)}
                    </select>
                    {/* <input type="checkbox" name="isMandtory"  >Mandtory?</input> */}
                </form>
                <button onClick={() => setIsOpen(false)}>Close</button>
                <button onClick={() => onSaveEvent(eventToEdit)}>Save</button>
                { }
            </div>
        </div>
    )
}
