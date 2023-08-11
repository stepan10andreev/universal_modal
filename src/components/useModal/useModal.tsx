import { useState } from 'react'

type IReturnProps = [() => void, () => void, boolean];

export const useModal = (): IReturnProps => {
    const [isModalOpened, setIsModaOpened] = useState(false);

    const onOpen = () => {
        setIsModaOpened(true);
    }

    const onClose = () => {
        setIsModaOpened(false);
    }

    return [
        onOpen,
        onClose,
        isModalOpened
    ]


}
