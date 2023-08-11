import { FC } from 'react'
import styles from './Card.module.scss'

interface ICardProps {
    title: string;
}

export const Card: FC<ICardProps> = ({ title }) => {
    return (
        <div className={styles.card}>
            <h2>Заголовок</h2>
            <p className={styles.desc}>{title}</p>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea quisquam animi sapiente a, ipsam accusantium consequatur? Iusto minima incidunt magnam recusandae soluta asperiores nesciunt distinctio id aut, debitis in molestiae.</p>
        </div>
    )
}
