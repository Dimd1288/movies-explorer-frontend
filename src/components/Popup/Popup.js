import './Popup.css';

function Popup(props) {

    function handleClose() {
        props.handleVisibility(false)
    }

    return (
        <dialog className="popup">
            <button className="popup__close" onClick={handleClose}></button>
            <p className={`popup__message ${!props.message.status ? 'popup__message_error' : ''}`}>{props.message.message}</p>
        </dialog>
    )
}

export default Popup;