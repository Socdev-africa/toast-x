// src/utils/animations.ts
import { ToastAnimationType, ToastPosition } from '../types';

type VariantsType = {
  initial: any;
  animate: any;
  exit: any;
};

export const getAnimationVariants = (
  animation: ToastAnimationType,
  position?: ToastPosition
): VariantsType => {
  const isBottom = position?.includes('bottom');
  
  switch (animation) {
    case 'slide':
      return {
        initial: { 
          x: position?.includes('left') ? -100 : position?.includes('right') ? 100 : 0,
          y: position?.includes('top') ? -100 : position?.includes('bottom') ? 100 : 0,
          opacity: 0 
        },
        animate: { 
          x: 0,
          y: 0,
          opacity: 1,
          transition: {
            x: { type: 'spring', stiffness: 300, damping: 30 },
            y: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }
        },
        exit: { 
          x: position?.includes('left') ? -100 : position?.includes('right') ? 100 : 0,
          y: position?.includes('top') ? -100 : position?.includes('bottom') ? 100 : 0,
          opacity: 0,
          transition: { duration: 0.2 }
        }
      };
    case 'fade':
      return {
        initial: { opacity: 0 },
        animate: { 
          opacity: 1,
          transition: { duration: 0.2 }
        },
        exit: { 
          opacity: 0,
          transition: { duration: 0.15 }
        }
      };
    case 'scale':
      return {
        initial: { scale: 0.85, opacity: 0 },
        animate: { 
          scale: 1,
          opacity: 1,
          transition: {
            scale: { type: 'spring', stiffness: 400, damping: 20 },
            opacity: { duration: 0.2 }
          }
        },
        exit: { 
          scale: 0.85,
          opacity: 0,
          transition: { duration: 0.2 }
        }
      };
    case 'bounce':
      return {
        initial: { 
          y: isBottom ? 20 : -20, 
          opacity: 0,
          scale: 0.9
        },
        animate: { 
          y: 0,
          opacity: 1,
          scale: 1,
          transition: {
            y: { type: 'spring', stiffness: 400, damping: 15 },
            opacity: { duration: 0.2 },
            scale: { type: 'spring', stiffness: 400, damping: 10 }
          }
        },
        exit: { 
          y: isBottom ? 20 : -20,
          opacity: 0,
          scale: 0.9,
          transition: { duration: 0.2 }
        }
      };
    case 'flip':
      return {
        initial: { 
          rotateX: isBottom ? 45 : -45, 
          opacity: 0,
          y: isBottom ? 20 : -20
        },
        animate: { 
          rotateX: 0,
          opacity: 1,
          y: 0,
          transition: {
            rotateX: { type: 'spring', stiffness: 400, damping: 20 },
            opacity: { duration: 0.3 },
            y: { type: 'spring', stiffness: 400, damping: 20 }
          }
        },
        exit: { 
          rotateX: isBottom ? 45 : -45,
          opacity: 0,
          y: isBottom ? 20 : -20,
          transition: { duration: 0.3 }
        }
      };
    default:
      return {
        initial: { opacity: 0, y: -10 },
        animate: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.2 }
        },
        exit: { 
          opacity: 0, 
          y: -10,
          transition: { duration: 0.2 }
        }
      };
  }
};

// Custom spring transitions for smoother animations
export const springTransition = {
  type: 'spring',
  stiffness: 350,
  damping: 25
};

export const fastSpringTransition = {
  type: 'spring',
  stiffness: 500,
  damping: 30
};

export const gentleSpringTransition = {
  type: 'spring',
  stiffness: 250,
  damping: 20
};

// Handling animations based on toast position
export const getPositionAnimationProps = (position: ToastPosition) => {
  // Base positioning
  const positionStyles: Record<ToastPosition, any> = {
    'top-left': { top: 0, left: 0 },
    'top-center': { top: 0, left: '50%', transform: 'translateX(-50%)' },
    'top-right': { top: 0, right: 0 },
    'bottom-left': { bottom: 0, left: 0 },
    'bottom-center': { bottom: 0, left: '50%', transform: 'translateX(-50%)' },
    'bottom-right': { bottom: 0, right: 0 }
  };

  // Entry direction based on position
  const entryDirections: Record<ToastPosition, any> = {
    'top-left': { x: -100, y: 0 },
    'top-center': { y: -100, x: 0 },
    'top-right': { x: 100, y: 0 },
    'bottom-left': { x: -100, y: 0 },
    'bottom-center': { y: 100, x: 0 },
    'bottom-right': { x: 100, y: 0 }
  };

  return {
    positionStyles: positionStyles[position],
    entryDirection: entryDirections[position]
  };
};

// Helper to generate staggered animations for multiple toasts
export const getStaggeredAnimation = (index: number, count: number) => {
  return {
    transition: {
      ...springTransition,
      delay: Math.min(index * 0.05, 0.3) // Cap max delay at 300ms
    }
  };
};