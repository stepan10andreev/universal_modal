'use client'

import { ExitIcon } from "@/components/ExitIcon";
import { useModal } from "@/components/useModal/useModal";
import styles from './page.module.css'
import { HookModal } from "@/components/ModalForHook/HookModal";

export default function Hook() {
    const [onOpen, onClose, isModalOpened] = useModal();

    const handleOpen = () => {
        onOpen()
    }

    const handleClose = () => {
        onClose();
    }

    return (
        <main className={styles.main}>
            <button className={styles.button} onClick={handleOpen}>
                Открыть модальное окно через хук useModal
            </button>

            {isModalOpened &&
                <HookModal closeOnClickOutside={handleClose}>
                    <div className={styles.card}>

                        <h2>
                            Окно открытое через Хук useModal, закрывается по клику вне него и по клик уна иконку X
                        </h2>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati cupiditate pariatur magnam assumenda quidem rerum porro reprehenderit culpa non aperiam accusamus quisquam quam, ex quos perferendis officia incidunt vel recusandae.</p>

                        <button className={styles.exitBtn} onClick={handleClose}>
                            <ExitIcon />
                        </button>
                    </div>
                </HookModal>}
        </main>

    )
}
