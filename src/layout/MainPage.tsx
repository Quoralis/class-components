import Modal from '../components/Modal/Modal.tsx';
import UncontrolledForm from '../components/Forms/UncontrolledForm.tsx';
import { useModal } from '../hooks/useModal.ts';
import ButtonAction from '../components/Buttons/ButtonAction.tsx';
import CardsList from '../components/CardsList/CardsList.tsx';

export default function MainPage() {
  const { showModal, open, close } = useModal();

  return (
    <main className="container py-4">
      <div className="d-flex gap-2 mb-4">
        <ButtonAction
          className="btn btn-outline-primary"
          disabled={false}
          name="Open Uncontrolled Form"
          onClick={open}
          type="button"
        />
        <ButtonAction
          className="btn btn-outline-primary"
          disabled={false}
          name="React Hook Form"
          onClick={open}
          type="button"
        />
      </div>
      <div>
        <CardsList />
      </div>
      {showModal && (
        <Modal>
          <UncontrolledForm close={close} />
        </Modal>
      )}
    </main>
  );
}
