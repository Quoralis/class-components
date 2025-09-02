import type { ReactNode } from 'react';
import { createPortal } from 'react-dom';

export default function Modal({ children }: { children: ReactNode }) {
  const modalRoot = document.getElementById('modal-root');

  if (!modalRoot) return null;
  return createPortal(
    <>
      <div className="offcanvas offcanvas-end show" style={{ zIndex: 1050 }}>
        <div className="offcanvas-header">
          <h5>Select columns</h5>
        </div>
        <div className="offcanvas-body">{children}</div>
      </div>
      <div className="modal-backdrop show" style={{ zIndex: 1040 }} />
    </>,
    modalRoot
  );
}
