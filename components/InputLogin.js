import { TextInput, StyleSheet, useColorScheme } from 'react-native'

export function InputLogin({value, onChangeText, placeholder, secureTextEntry}) {

    const colorScheme = useColorScheme();

    const textColor = colorScheme === 'light' ? styles.textDark : styles.textWhite
    const borderColor = colorScheme === 'light' ? '#0F4C81' : '#FFC857'

    return (
        <TextInput
            style={[styles.input, textColor, borderColor]}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            borderColor={borderColor}
        />
    )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        padding: 15,
        fontSize: 14,
        borderRadius: 28,
        borderWidth: 1,
    },
    textWhite: {
        color: '#F1F4F6'
    },
    yellowBorder: {
        borderColor: '#FFC857'
    }
})