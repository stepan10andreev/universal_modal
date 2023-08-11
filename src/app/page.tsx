'use client'
import { MouseEventHandler, useEffect, useState } from 'react';
import styles from './page.module.css'
import { Modal } from '@/components/Modal/Modal';
import { ClockLoader } from 'react-spinners';
import { Card } from '@/components/Card/Card';
import { useRouter } from "next/navigation";
import { ExitIcon } from '@/components/ExitIcon';
import Link from 'next/link';


export default function Home() {
  const [openNonClosingModal, setOpenNonClosingModal] = useState(false)
  const [openClosingModal, setClosingModal] = useState(false)
  const [openActionModal, setActionModal] = useState(false)
  const [openActionModal2, setActionModal2] = useState(false)
  const [openModalIcon, setModalIcon] = useState(false)
  const [openModalIcon2, setModalIcon2] = useState(false)

  const router = useRouter();

  const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    const btnName = event.currentTarget.name;
    switch (btnName) {
      case 'type_1':
        setOpenNonClosingModal(true);
        break;
      case 'type_2':
        setClosingModal(true);
        break;
      case 'type_3':
        setActionModal(true);
        break;
      case 'type_4':
        setActionModal2(true);
        break;
      case 'type_5':
        setModalIcon(true);
        break;
      case 'type_6':
        setModalIcon2(true);
        break;
    }
  }

  // для незакрывающейся модалки с имитацией получения данных(закрытие через 7 секунд)
  useEffect(() => {
    openNonClosingModal && setTimeout(() => {
      setOpenNonClosingModal(false);
    }, 7000);
  }, [openNonClosingModal]);

  return (
    <main className={styles.main}>
      <button className={styles.button} onClick={handleClick} name='type_1'>
        Открыть НЕзакрывающееся модальное окно со спиннером с имитацией полученяи данных (закроется автоматически через 7 секунд)
      </button>

      <button className={styles.button} onClick={handleClick} name='type_2'>
        Открыть закрывающееся модальное окно c контентом (по клику вне его)
      </button>

      <button className={styles.button} onClick={handleClick} name='type_3'>
        Открыть закрывающееся модальное окно c контентом (по клику вне его) и вызвать действия после его закрытия
      </button>

      <button className={styles.button} onClick={handleClick} name='type_4'>
        Открыть закрывающееся модальное окно c контентом (по клику вне его) с автоматической переадресацией на другую страницу после его закрытия
      </button>

      <button className={styles.button} onClick={handleClick} name='type_5'>
        Открыть закрывающееся модальное окно c контентом (по клику вне его и по клику на иконку X)
      </button>

      <button className={styles.button} onClick={handleClick} name='type_6'>
        Открыть закрывающееся модальное окно c контентом только по клику на иконку X
      </button>

      {/* внутрь модалки можно положить любой контент
      у самой модалки есть функционал(props):
      1. незакрыающееся окно (nonClosing)
      2. закрывающееся окно (onClose - передаем функцию), по умолчанию закрывающееся по клику вне окна
      3. дейтсвия по закрытию модалки (actionsOnClose - также передаем функцию
      4. передача компонента иконки для закрытия модалки с передачей обьекта стилей для нее
         (по умолчанию иконка позицинируется у верехнего правого с отступом по 10px )
      5. z index опционально
      */}

      {openNonClosingModal && (
        <Modal nonClosing>
          <ClockLoader color="#36d7b7" size={100} />
        </Modal>
      )}

      {openClosingModal && (
        <Modal onClose={() => setClosingModal(false)}>
          <Card title='Это окно закрывается по клику вне его' />
        </Modal>
      )}

      {openActionModal && (
        <Modal onClose={() => setActionModal(false)} actionsOnClose={() => alert('Выполнить действия по закрытию модального окна')}>
          <Card title='Это окно закрывается по клику вне его и выполнится действие при закрытии (alert)' />
        </Modal>
      )}

      {openActionModal2 && (
        <Modal onClose={() => setActionModal2(false)} actionsOnClose={() => router.push('/user')}>
          <Card title='Это окно закрывается по клику вне его и происходит переадресация на другую страницу при его закрытии' />
        </Modal>
      )}


      {/* 2 варианта:
          1. Передача иконки в Modal в качестве props
          2. Передача иконки в обертку <Modal></Modal> */}

      {openModalIcon && (
        <Modal onClose={() => setModalIcon(false)} exitIcon={<ExitIcon />}>
          <Card title='Это окно закрывается по клику вне его и на иконку X' />
        </Modal>
      )}

      {/* передача иконки непосредственно в обертку Modal */}
      {/* {openModalIcon && (
        <Modal onClose={() => setModalIcon(false)}>

          <Card title='Это окно закрывается по клику вне его и на иконку X' />

          <button className={styles.iconBtn} onClick={() => setModalIcon(false)}>
            <ExitIcon />
          </button>

        </Modal>
      )} */}

      {openModalIcon2 && (
        <Modal nonClosing>

          <Card title='Это окно закрывается только по клику на иконку X' />

          <button className={styles.iconBtn} onClick={() => setModalIcon2(false)}>
            <ExitIcon />
          </button>

        </Modal>
      )}

      {/* {openModalIcon2 && (
        <Modal nonClosing exitIcon={<ExitIcon />} onClose={() => setModalIcon2(false)}>
          <Card title='Это окно закрывается только по клику на иконку X' />
        </Modal>
      )} */}


      <Link href={'/hook'} className={styles.link}> Перейти на страницу с открытием модального окна с помощью хука useModal</Link>

    </main>
  )
}
