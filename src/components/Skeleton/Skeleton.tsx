import { CSSProperties } from 'react';
import clsx from 'clsx';
import stls from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  height?: string | number;
  width?: string | number;
  minWidth?: string | number;
  borderRadius?: string;
  paddingTop?: string;
  margin?: string;
}

export const Skeleton = (props: SkeletonProps) => {
  const { className, height, width, borderRadius = 0, paddingTop = 0, minWidth, margin = '0 0 0 0' } = props;

  const styles: CSSProperties = {
    width,
    height,
    borderRadius,
    paddingTop,
    minWidth,
    margin,
  };

  return <div className={clsx(stls.skeleton, [className])} style={styles} />;
};
