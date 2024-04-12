import { ReactNode } from 'react';

import { Portal } from '../Portal/Portal';
import { Modal } from './Modal/Modal';
import { useMount } from '@/app/lib/hooks/useMount/useMount';

interface AnimatedModalProps {
  opened: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const AnimatedModal = ({ opened, onClose, children }: AnimatedModalProps) => {
  const { mounted } = useMount({ opened });

  if (!mounted) {
    return null;
  }

  return (
    <Portal>
      <Modal onClose={onClose} opened={opened}>
        {children}
      </Modal>
    </Portal>
  );
};
