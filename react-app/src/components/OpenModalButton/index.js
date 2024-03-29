import React, { useContext } from 'react';
import { useModal } from '../../context/Modal';
import { ThemeContext } from '../../context/Themes';

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  className
}) {
  const { setModalContent, setOnModalClose } = useModal();
  const { theme } = useContext(ThemeContext)

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <button style={{backgroundColor: theme['active']}} className={`open-modal-button ${className}`} onClick={onClick}>{buttonText}</button>
  );
}

export default OpenModalButton;
