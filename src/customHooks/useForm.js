import { useState } from "react"
import { unitService } from "../servies/unit.service"

export const useForm = (initialState) => {
    const [fields, setFields] = useState(initialState)
    const activeUnits = unitService.getAvailableJoinUnits()

    function handleChange({ target }) {
        let { value, name, type, checked } = target
        console.log("type:", type)
        console.log("name:", name)
        console.log("value:", value)

        switch (type) {
            case 'number':
            case 'range':
                value = +value
                break

            case 'checkbox':
                value = checked
                break

            case 'select-one':
                if (name === 'units') value = activeUnits[value]
                break

            default:
                break
        }
        setFields(prevFields => ({ ...prevFields, [name]: value }))
    }

    return [fields, setFields, handleChange, activeUnits]

}