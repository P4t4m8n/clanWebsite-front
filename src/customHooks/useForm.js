import { useState } from "react"
import { unitService } from "../service/unit.service"

export const useForm = (initialState) => {
    const [fields, setFields] = useState(initialState)
    const activeUnits = unitService.getAvailableJoinUnits()

    function handleChange({ target }) {
        let { value, name, type, checked } = target

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

            case 'select-multiple':
                value = Array.from(target.selectedOptions, (option) => option.value)
                break

            default:
                break
        }
        setFields(prevFields => ({ ...prevFields, [name]: value }))
    }

    return [fields, setFields, handleChange, activeUnits]

}