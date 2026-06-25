import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { Colors, Fonts, Radii, Spacing } from '../theme';

type Variant = 'primary' | 'secondary' | 'text';

interface Props {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  labelStyle?: TextStyle;
  fullWidth?: boolean;
}

export default function Button({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  style,
  labelStyle,
  fullWidth = false,
}: Props) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.75}
      style={[
        styles.base,
        variant === 'primary' && styles.primary,
        variant === 'secondary' && styles.secondary,
        variant === 'text' && styles.textVariant,
        fullWidth && styles.fullWidth,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === 'primary' ? Colors.cream : Colors.oxblood}
        />
      ) : (
        <Text
          style={[
            styles.label,
            variant === 'primary' && styles.labelPrimary,
            variant === 'secondary' && styles.labelSecondary,
            variant === 'text' && styles.labelText,
            labelStyle,
          ]}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: Radii.button,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Spacing.xl,
    minWidth: 100,
  },
  primary: {
    backgroundColor: Colors.oxblood,
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.ink,
  },
  textVariant: {
    backgroundColor: 'transparent',
    height: 44,
    paddingHorizontal: 0,
    minWidth: 0,
  },
  fullWidth: { width: '100%' },
  disabled: { opacity: 0.4 },
  label: {
    fontFamily: Fonts.bodySemiBold,
    fontSize: 14,
    lineHeight: 14,
  },
  labelPrimary: { color: Colors.cream },
  labelSecondary: { color: Colors.ink },
  labelText: { color: Colors.oxblood },
});
