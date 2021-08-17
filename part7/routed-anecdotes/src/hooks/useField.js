import { useState } from "react"

const useField = (type) => {
    const [value, setValue] = useState('')
    const onChange = event => {
        setValue(event.target.value)
    }
    const reset = () => {
        setValue('')
    }

    return {
        onChange, type, value, reset
    }
}

export default useField