import { useState } from "react"

const useField = (type) => {
    const [value, setValue] = useState('')
    const onChange = event => {
        setValue(event.target.value)
    }

    return {
        onChange, type, value
    }
}

export default useField