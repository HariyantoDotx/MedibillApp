import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';

import React from 'react';
import {COLORS, METRICS} from '../utils';
import {Gap, Icons} from '../components';

interface TabBottomItemProps {
  title: string;
  active: boolean;
  onPress: () => void;
  onLongPress: () => void;
}

const TabBottomItem = ({
  title,
  onLongPress,
  onPress,
  active,
}: TabBottomItemProps) => {
  const Icon = () => {
    if (title === 'Billing Sheets') {
      return (
        <Icons
          name="ICDocuments"
          width={24}
          height={26}
          stroke={active ? COLORS.blueBottom : COLORS.blueSecondary}
          strokeWidth={active ? 4 : 6}
        />
      );
    }
    if (title === 'Upload Billing') {
      return (
        <Icons
          name="ICPlusCircle"
          width={24}
          height={26}
          stroke={active ? COLORS.blueBottom : COLORS.blueSecondary}
          strokeWidth={active ? 6 : 8}
        />
      );
    }
    if (title === 'Monthly Reports') {
      return (
        <Icons
          name="ICCopy"
          width={24}
          height={26}
          stroke={active ? COLORS.blueBottom : COLORS.blueSecondary}
          strokeWidth={active ? 4 : 6}
        />
      );
    }
    if (title === 'Account') {
      return (
        <Icons
          name="ICAccount"
          width={24}
          height={26}
          stroke={active ? COLORS.blueBottom : COLORS.blueSecondary}
          strokeWidth={active ? 6 : 8}
        />
      );
    }
    return (
      <Icons
        name="ICHome"
        width={24}
        height={26}
        stroke={active ? COLORS.blueBottom : COLORS.blueSecondary}
        strokeWidth={active ? 4 : 6}
      />
    );
  };
  const Title = () => {
    if (title === 'Billing Sheets') {
      return (
        <View style={styles.titleWrapper}>
          <Text style={styles.text}>Billing</Text>
          <Text style={styles.text}>Sheets</Text>
        </View>
      );
    }
    if (title === 'Upload Billing') {
      return (
        <View style={styles.titleWrapper}>
          <Text style={styles.text}>Upload</Text>
          <Text style={styles.text}>Billing</Text>
        </View>
      );
    }
    if (title === 'Monthly Reports') {
      return (
        <View style={styles.titleWrapper}>
          <Text style={styles.text}>Reports</Text>
        </View>
      );
    }
    return (
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
    );
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}>
      <Icon />
      <Gap height={4} />
      <Title />
    </TouchableOpacity>
  );
};

export default TabBottomItem;

const styles = StyleSheet.create({
  titleWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    alignItems: 'center',
  },
  text: {
    fontSize: METRICS.gutter.xs,
    color: COLORS.blueBottom,
  },
  icon: {
    width: 24,
    height: Platform.OS === 'android' ? 27 : 26,
    marginBottom: 6,
  },
});
