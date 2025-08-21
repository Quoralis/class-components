import { useState } from 'react';

export function useModal() {
  const [showModal, setShowModal] = useState(false);
  const open = () => setShowModal(true);
  const close = () => setShowModal(false);
  return { showModal, open, close };
}
