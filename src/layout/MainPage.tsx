import styles from './mainPage.module.scss';
import Modal from '../components/Modal/Modal.tsx';
import UncontrolledForm from '../components/Forms/UncontrolledForm.tsx';
import { useModal } from '../hooks/useModal.ts';
import ButtonAction from '../components/Buttons/ButtonAction.tsx';

export default function MainPage() {
  const { showModal, open, close } = useModal();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <ButtonAction
          className="btn btn-outline-primary me-2"
          disabled={false}
          name="Open Uncontrolled Form"
          onClick={open}
          type="button"
        />
        <ButtonAction
          className="btn btn-outline-primary me-2"
          disabled={false}
          name="React Hook Formm"
          onClick={open}
          type="button"
        />
      </div>
      {showModal && (
        <Modal>
          <UncontrolledForm close={close} />
        </Modal>
      )}
    </main>
  );
}
