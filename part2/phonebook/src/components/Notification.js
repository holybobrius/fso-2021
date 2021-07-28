const Notification = ({ message, styles }) => {
    if(message === null) return null
    return (
        <div className='successful' style={styles}>
            {message}
        </div>
    )
}

export default Notification