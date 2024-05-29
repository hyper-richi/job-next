'use client';

import { useEffect, useState } from 'react';

interface UseMountProps {
  onClose?: () => void;
  opened?: boolean;
  animationDelay: number;
}

export const useMounted = ({ opened, animationDelay }: UseMountProps) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    if (opened && !mounted) {
      setMounted(true);
    } else if (!opened && mounted) {
      setTimeout(() => {
        setMounted(false);
      }, animationDelay);
    }
  }, [opened]);

  return { mounted };
};
