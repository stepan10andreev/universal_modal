import React, { useEffect, useRef, FC, ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './HookModal.module.scss';

interface IHookModal {
  nonClosing?: boolean;
  closeOnClickOutside?: () => void;
  actionsOnClose?: () => void;
  children: ReactNode;
  zIndex?: number;

}

export const HookModal: FC<IHookModal> = ({ nonClosing, actionsOnClose, closeOnClickOutside, children, zIndex = 10}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    modalRef.current = document.querySelector<HTMLDivElement>("#modal_root");

    setMounted(true);

    function handleClick(event: MouseEvent) {
      if (event.target instanceof Node && !contentRef.current?.contains(event.target)) {
        closeOnClickOutside && closeOnClickOutside();
        actionsOnClose && actionsOnClose();
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
        </div>
      </div>, modalRef.current)
    : null
}


