import { Variants } from 'framer-motion';
import { ToastAnimationType, ToastPosition } from '../types';

export const getAnimationVariants = (animation: ToastAnimationType): Variants => {
  switch (animation) {
    case 'fade':
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
      };
    case 'scale':
      return {
        initial: { opacity: 0, scale: 0.9 },
        animate: { opacity: 1, scale: 1 },
        exit: { opacity: 0, scale: 0.9 }
      };
    case 'slide':
      return {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: 100 }
      };
    case 'bounce':
      return {
        initial: { opacity: 0, y: -20 },
        animate: { 
          opacity: 1, 
          y: 0,
          transition: {
            type: 'spring',
            stiffness: 400,
            damping: 10
          }
        },
        exit: { 
          opacity: 0, 
          y: -20,
          transition: {
            type: 'spring',
            stiffness: 400,
            damping: 10
          }
        }
      };
    case 'flip':
      return {
        initial: { opacity: 0, rotateX: 90 },
        animate: { 
          opacity: 1, 
          rotateX: 0,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 15
          }
        },
        exit: { 
          opacity: 0, 
          rotateX: -90,
          transition: {
            type: 'spring',
            stiffness: 300,
            damping: 15
          }
        }
      };
    default:
      return {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 }
      };
  }
};

export const getPositionTransition = (position: ToastPosition) => {
  // Determine animation direction based on position
  const isTop = position.startsWith('top');
  const isCenter = position.includes('center');
  
  if (isCenter) {
    return {
      initial: { opacity: 0, y: isTop ? -20 : 20 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: isTop ? -20 : 20 }
    };
  }
  
  const isRight = position.includes('right');
  
  return {
    initial: { opacity: 0, x: isRight ? 100 : -100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: isRight ? 100 : -100 }
  };
};