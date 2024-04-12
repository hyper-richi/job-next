import { useEffect, useState } from 'react';
import { ANIMATION_TIME } from '../../../../components/AnimatedModal/Modal/Modal';

export const useMount = ({ opened }: { opened: boolean }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (opened && !mounted) {
      setMounted(true);
    } else if (!opened && mounted) {
      setTimeout(() => {
        setMounted(false);
      }, ANIMATION_TIME);
    }
  }, [opened]);

  return {
    mounted,
  };
};
