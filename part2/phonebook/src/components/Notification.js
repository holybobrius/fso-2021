const Notification = ({ message, styles }) => {
    if(message === null) return null
    return (
        <div style={styles}>
            {message}
        </div>
    )
}

export default Notification