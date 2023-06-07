import React from 'react';
import { SvgProps } from 'react-native-svg';
import { icons } from '../../../assets';
import { IconType } from '../../../utils';

interface IconProps extends SvgProps {
  name: IconType;
}

const Icons = ({name, ...props}: IconProps) => {
  const Wrapper = icons[name];
  return <Wrapper {...props} />;
};

export default Icons
