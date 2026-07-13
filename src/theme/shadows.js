import { elevation } from './elevation';


const createShadow = (elevationValue) => {
  if (elevationValue === 0) {
    return {
      shadowColor: 'transparent',
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0,
      shadowRadius: 0,
      elevation: 0,
    };
  }

  return {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: Math.floor(elevationValue / 2),
    },
    shadowOpacity: 0.2 + (elevationValue * 0.01),
    shadowRadius: elevationValue * 0.8,
    elevation: elevationValue,
  };
};

export const shadows = {
  none: createShadow(elevation.none),
  small: createShadow(elevation.small),
  medium: createShadow(elevation.medium),
  large: createShadow(elevation.large),
  floating: createShadow(elevation.floating),
  modal: createShadow(elevation.modal),
};
