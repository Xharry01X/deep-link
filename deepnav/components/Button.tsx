import { Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function Button({ title, onPress, disabled = false }: ButtonProps) {
  const { colors } = useTheme();

  return (
    <Pressable
      style={[
        styles.button,
        { backgroundColor: disabled ? colors.border : colors.primary },
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: colors.card }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
});