import { useState } from 'react';
import Modal from '../components/Modal/Modal.tsx';
import UncontrolledForm from '../components/Forms/UncontrolledForm.tsx';
import ReactHookForm from '../components/Forms/ReactHookForm.tsx';
import ButtonAction from '../components/Buttons/ButtonAction.tsx';
import CardsList from '../components/CardsList/CardsList.tsx';

export default function MainPage() {
  const [modal, setModal] = useState<'uncontrolled' | 'rhf' | null>(null);
  const openUncontrolled = () => setModal('uncontrolled');
  const openRhf = () => setModal('rhf');

  const close = () => setModal(null);

  return (
    <main className="container py-4">
      <div className="d-flex gap-2 mb-4">
        <ButtonAction
          className="btn btn-outline-primary"
          name="Open Uncontrolled Form"
          onClick={openUncontrolled}
          type="button"
        />
        <ButtonAction
          className="btn btn-outline-primary"
          name="React Hook Form"
          onClick={openRhf}
          type="button"
        />
      </div>

      <CardsList />

      {modal && (
        <Modal>
          {modal === 'uncontrolled' && <UncontrolledForm close={close} />}
          {modal === 'rhf' && <ReactHookForm close={close} />}
        </Modal>
      )}
    </main>
  );
}
