import { createPortal } from 'react-dom';
import type { ReactNode } from 'react';

export default function Modal({ children }: { children: ReactNode }) {
  const modalRoot = document.getElementById('modal-root');
  if (!modalRoot) return null;

  return createPortal(
    <>
      <div className="modal-backdrop show" />
      <div className="modal show d-block" tabIndex={-1}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-body">{children}</div>
          </div>
        </div>
      </div>
    </>,
    modalRoot
  );
}
