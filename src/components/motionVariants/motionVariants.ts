import { Variants } from 'framer-motion';

export const cubeVariants: Variants = {
  enter: (direction: number) => ({
    y: direction > 0 ? -300 : 300,
    opacity: 0,
  }),
  center: {
    y: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    y: direction > 0 ? 300 : -300,
    opacity: 0,
  }),
};

export const piggyWiggle: Variants = {
  initial: { rotate: 0 },
  hover: {
    scale: [1, 1.01, 1.05, 1.07],
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  },
  tap: {
    rotate: [0, -10, 10, -8, 8, -5, 5, 0],
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
};

export const svgVariants: Variants = {
  hidden: { rotate: 0 },
  visible: {
    rotate: 0,
    transition: {
      ease: 'easeInOut',
    },
  },
  hover: {
    scale: 1.1,
    rotate: -10,
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
    },
  },
};

export const pathVariants = {
  hidden: { opacity: 0, pathLength: 0 },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 1,
      ease: 'easeInOut',
    },
  },
};

export const buttonVariants: Variants = {
  hidden: {
    scale: 1,
  },
  tap: {
    scale: 1.4,
    transition: {
      duration: 0.1,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  },
  exit: {
    scale: 1,
    transition: {
      duration: 0.25,
      ease: 'easeInOut',
    },
  },
};

export const navVariants: Variants = {
  hidden: {
    scale: 1,
  },
  hover: {
    scale: [1, 1.01, 1.05, 1.07],
    transition: {
      duration: 0.3,
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
    },
  },
  exit: {
    scale: 1,
    transition: {
      duration: 0.25,
      ease: 'easeInOut',
    },
  },
};
