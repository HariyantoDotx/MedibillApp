import React from 'react';
import { View } from 'react-native';

interface GapProps {
  height?: number;
  width?: number;
  backgroundColor?: string;
}

const Gap = ({height, width, backgroundColor}: GapProps) => {
  return (
    <View
      style={{
        height: height,
        width: width,
        backgroundColor: backgroundColor ?? '#FFF',
      }}
    />
  );
};

export default Gap;
