import { ReactNode, useEffect, useRef } from 'react';
import { LuX } from 'react-icons/lu';

type ModalProps = {
  children: ReactNode;
  onClose: () => void;
};

function Modal({ children, onClose }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Ensure that only clicks on the backdrop (not the modal content) trigger onClose
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  // Handle keyboard interactions
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      className="fixed left-0 top-0 z-[1000] size-full cursor-default bg-backdrop backdrop-blur-sm transition-all duration-500"
      role="button"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onClick={handleBackdropClick}
      ref={modalRef}
    >
      <div className="fixed left-[50%] top-[50%] transform animate-fade-slide-up-modal rounded-lg bg-indigo-50 px-12 py-10 shadow-xl transition-all duration-500">
        <button
          className="absolute right-4 top-4 rounded-sm"
          onClick={onClose}
          aria-label="Close modal"
        >
          <LuX />
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
