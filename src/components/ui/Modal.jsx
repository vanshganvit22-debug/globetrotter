import React, { useEffect } from 'react';
import { X, AlertTriangle } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Modal = () => {
  const { modalConfig, closeModal } = useApp();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    if (modalConfig) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [modalConfig, closeModal]);

  if (!modalConfig) return null;

  return (
    <div className="modal-backdrop" onClick={closeModal}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <div className="modal-title-wrap">
            {modalConfig.isDanger && (
              <div className="modal-danger-icon">
                <AlertTriangle className="w-5 h-5 text-rose-600" />
              </div>
            )}
            <h3 className="modal-title">{modalConfig.title || 'Confirmation'}</h3>
          </div>
          <button onClick={closeModal} className="modal-close-btn" aria-label="Close modal">
            <X className="w-5 h-5 text-slate-500 hover:text-slate-800" />
          </button>
        </div>

        <div className="modal-body">
          {typeof modalConfig.content === 'string' ? (
            <p className="modal-text">{modalConfig.content}</p>
          ) : (
            modalConfig.content
          )}
        </div>

        <div className="modal-footer">
          <button
            onClick={closeModal}
            className="btn-modal-cancel"
          >
            {modalConfig.cancelText || 'Cancel'}
          </button>
          <button
            onClick={() => {
              if (modalConfig.onConfirm) modalConfig.onConfirm();
              closeModal();
            }}
            className={modalConfig.isDanger ? 'btn-modal-danger' : 'btn-modal-confirm'}
          >
            {modalConfig.confirmText || 'Confirm'}
          </button>
        </div>
      </div>
    </div>
  );
};
