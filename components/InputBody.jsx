import { View, TextInput, StyleSheet, useColorScheme, Text } from "react-native";
import Markdown from 'react-native-markdown-display';

export function InputBody({
  value,
  onChangeText,
  placeholder,
  showPreview = true, // Prop para mostrar/ocultar preview
}) {
  const colorScheme = useColorScheme();

  const textColor =
    colorScheme === "light" ? styles.textDark : styles.textWhite;
  const borderColor = colorScheme === "light" ? "blue" : "#FFC857";
  const bgPreview = colorScheme === "light" ? "#f9f9f9" : "#1a1a1a";

  return (
    <View>
      <TextInput
        multiline={true}
        numberOfLines={10}
        textAlignVertical="top"
        style={[styles.input, textColor, { borderColor }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
      />
      
      {showPreview && value && (
        <View style={[styles.preview, { backgroundColor: bgPreview }]}>
          <Text style={[styles.previewTitle, textColor]}>Vista previa:</Text>
          <Markdown style={markdownStyles(colorScheme)}>
            {value}
          </Markdown>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    borderWidth: 0.5,
    marginBottom: 10,
    padding: 15,
    fontSize: 14,
    borderRadius: 28,
    textAlignVertical: 'top',
    height: 200,
  },
  textWhite: {
    color: '#F1F4F6'
  },
  textDark: {
    color: '#121212'
  },
  preview: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  previewTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    opacity: 0.7,
  }
});

// Estilos para el markdown según el theme
const markdownStyles = (colorScheme) => ({
  body: {
    color: colorScheme === 'light' ? '#121212' : '#F1F4F6',
  },
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  strong: {
    fontWeight: 'bold',
  },
  em: {
    fontStyle: 'italic',
  },
});