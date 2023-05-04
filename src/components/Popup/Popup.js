import './Popup.css';

function Popup(props) {

    function handleClose() {
        props.handleVisibility(false)
    }

    return (
        <dialog className={`popup ${props.visible ? 'popup_visible' : ''}`}>
            <button className="popup__close" onClick={handleClose}></button>
            <p className='popup__message'>{props.message}</p>
        </dialog>
    )
}

export default Popup;