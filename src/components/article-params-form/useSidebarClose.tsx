import { useEffect } from 'react';

export const useSidebarClose = (
  closeRef: React.RefObject<HTMLDivElement | null>,
  isOpen: boolean,
  onClose: () => void
): void => {
  useEffect(() => {
    if (!isOpen) return;

    const handleMouseDown = (event: MouseEvent): void => {
      if (closeRef.current && !closeRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [closeRef, isOpen, onClose]);
};
