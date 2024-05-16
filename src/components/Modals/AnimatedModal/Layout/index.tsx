import { ReactNode, useEffect, useRef, useState } from 'react';
import { CSSTransition } from 'react-transition-group';

import styles from './styles.module.scss';
import animationStyles from './animation.module.scss';

export const ANIMATION_TIME = 500;

const overlayAnimation = {
  enter: animationStyles.overlayEnter,
  enterActive: animationStyles.overlayEnterActive,
  exit: animationStyles.overlayExit,
  exitActive: animationStyles.overlayExitActive,
};

const contentAnimation = {
  enter: animationStyles.contentEnter,
  enterActive: animationStyles.contentEnterActive,
  exit: animationStyles.contentExit,
  exitActive: animationStyles.contentExitActive,
};

interface ModalProps {
  opened: boolean;
  onClose: () => void;
  children: ReactNode;
}
export const Modal = ({ onClose, children, opened }: ModalProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [animationIn, setAnimationIn] = useState(false);

  useEffect(() => {
    setAnimationIn(opened);
  }, [opened]);

  return (
      <div className={styles.container} role='dialog'>
        <CSSTransition
          in={animationIn}
          nodeRef={overlayRef}
          timeout={ANIMATION_TIME}
          mountOnEnter
          unmountOnExit
          classNames={overlayAnimation}
        >
          <div ref={overlayRef} className={styles.overlay} onClick={onClose} />
        </CSSTransition>
        <CSSTransition
          in={animationIn}
          nodeRef={contentRef}
          timeout={ANIMATION_TIME}
          mountOnEnter
          unmountOnExit
          classNames={contentAnimation}
        >
          <div ref={contentRef} className={styles.content}>
            {children}
          </div>
        </CSSTransition>
      </div>
  );
};
