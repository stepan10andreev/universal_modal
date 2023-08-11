import React, { useEffect, useRef, FC, ReactNode, useState, MouseEventHandler } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.scss';

interface IModal {
  nonClosing?: boolean;
  onClose?: () => void;
  actionsOnClose?: () => void;
  children: ReactNode;
  exitIcon?: JSX.Element;
  rigthIconPosition?: number;
  topIconPosition?: number;
  zIndex?: number;
  iconStyles?: React.CSSProperties;
}

// стили иконки по умолчанию
const initialIconStyles = {
  position: 'absolute' as const,
  top: 10,
  right: 10,
}

export const Modal: FC<IModal> = ({
  nonClosing, onClose, actionsOnClose, children, exitIcon, zIndex = 10, iconStyles = initialIconStyles
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [mounted, setMounted] = useState(false)

  const handleExit: MouseEventHandler<HTMLButtonElement> = () => {
    setMounted(false);
    actionsOnClose && actionsOnClose();
    onClose && onClose();
  }

  useEffect(() => {
    modalRef.current = document.querySelector<HTMLDivElement>("#modal_root");

    setMounted(true);

    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !contentRef.current?.contains(event.target)) {
        setMounted(false);
        onClose && onClose();
        actionsOnClose && actionsOnClose();
        console.log('here')
      }
    }

    if (!nonClosing) {
      document.addEventListener('click', handleClick);

      return () => {
        document.removeEventListener('click', handleClick);
      }
    }
  }, []);

  return (mounted && modalRef.current) ?
    createPortal(
      <div className={styles.modal} style={{ zIndex: zIndex }}>
        <div className={styles.content} ref={contentRef}>
          {children}

          {/* Иконка
              1. можно сделать саму иконку здесь (например если во всех модальных окнах испольузется единая иконка)
              и прописать все стили здесь же
              2. Можно передовать саму иконку и ее стили в props (позиционирование), но тогда заморочки с hover-effects
              3. по мне лучший вариант - можно передовать иконку непосредственно в обертку <Modal></Modal> при ее вызове (и ей уже передовать действие закрытие окна)
              */}
          {exitIcon && (
            <button className={styles.button} style={iconStyles} onClick={handleExit}>
              {exitIcon}
            </button>
          )}

        </div>
      </div>, modalRef.current)
    : null
}


