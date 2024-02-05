import { useEffect } from "react"
import { eventService } from "../../servies/event.service"
import { userService } from "../../servies/user.service"
import { useForm } from "../../customHooks/useForm"
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

export function EventEditModal({ setIsOpen, event, onSaveEvent, onRemoveEvent }) {
console.log("event:", event)

    const [fields, setFields, handleChange, activeUnits] = useForm(event)

    const handleDates = ({ $d }, name) => {
        console.log("$d:", $d)
        console.log("$d:", dayjs($d))
        setFields((prevEvent) => ({ ...prevEvent, [name]: dayjs($d) }))
    }

    console.log("fields:", fields)
    if (!fields) return
    const {
        unit,
        title,
        description,
        start,
        end,
        inviteList,
        isMandatory,
        _id
    } = fields

    return (
        <div className="modal-backdrop">
            <div className="modal-content">
                <form>
                    <input type="text" name="title" value={title} onChange={handleChange} />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateTimePicker value={start} onChange={(ev) => handleDates(ev, "start")} />
                        <DateTimePicker value={end} onChange={(ev) => handleDates(ev, "end")} />
                    </LocalizationProvider>

                    <textarea name="description" rows="4" cols="50" value={description} placeholder="description" onChange={handleChange} />

                    <select name="unit" onChange={handleChange} >
                        <option value="">--Please choose an unit--</option>
                        {activeUnits.map((unit, idx) =>
                            <option key={idx} value={idx}>{unit.name}</option>)}

                    </select>
                    <label htmlFor="isMandatory">Mandatory?</label>
                    <input type="checkbox" name="isMandatory" checked={isMandatory} onChange={handleChange}></input>

                </form>
                <button onClick={() => setIsOpen(false)}>Close</button>
                <button onClick={() => onSaveEvent(fields)}>Save</button>
                {_id && <button onClick={() => onRemoveEvent(_id)}>Delete</button>}
            </div>
        </div>
    )
}
