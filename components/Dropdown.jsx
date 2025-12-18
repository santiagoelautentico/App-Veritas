import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  useColorScheme,
} from "react-native";
import { useState } from "react";

export default function Dropdown({
  value,
  onChange,
  options,
  placeholder = "Select an option...",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const colorScheme = useColorScheme();

  const selectedOption = options.find((opt) => opt.id === value);

  const isDark = colorScheme === "dark";
  const bgColor = isDark ? styles.dropdownDark : styles.dropdownLight;
  const textColor = isDark ? styles.textWhite : styles.textBlack;
  const arrow = isDark ? styles.arrowYellow : styles.arrowBlue

  return (
    <View style={[styles.container, isOpen && styles.containerOpen]}>
      <TouchableOpacity
        style={[styles.dropdown, bgColor, isOpen && styles.dropdownOpen]}
        onPress={() => setIsOpen(!isOpen)}
        activeOpacity={0.7}
      >
        <Text style={[styles.selectedText, textColor]}>
          {selectedOption ? selectedOption.name : placeholder}
        </Text>
        <Text style={[arrow, isOpen && styles.arrowOpen]}>▼</Text>
      </TouchableOpacity>

      {isOpen && (
        <View style={[styles.optionsContainer, bgColor]}>
          <ScrollView
            style={styles.optionsList}
            nestedScrollEnabled={true}
            showsVerticalScrollIndicator={false}
          >
            {options.map((option) => (
              <TouchableOpacity
                key={option.id}
                style={[
                  styles.option,
                  value === option.id && styles.optionSelected,
                ]}
                onPress={() => {
                  onChange(option.id);
                  setIsOpen(false);
                }}
              >
                <Text
                  style={[
                    styles.optionText,
                    textColor,
                    value === option.id && styles.optionTextSelected,
                  ]}
                >
                  {option.name}
                </Text>
                {value === option.id && <Text style={styles.checkmark}>✓</Text>}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    zIndex: 1,
  },
  containerOpen: {
    zIndex: 9999,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  dropdownLight: {
    backgroundColor: "#F5F5F5",
    borderColor: '#0F4C81'
  },
  dropdownDark: {
    backgroundColor: "#121212",
    borderColor: "#FFC857",
  },
  dropdownOpen: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
  },
  selectedText: {
    fontSize: 14,
    flex: 1,
  },
  arrowYellow: {
    fontSize: 12,
    color: "#FFC857",
    marginLeft: 10,
  },
   arrowBlue: {
    fontSize: 12,
    color: "#0F4C81",
    marginLeft: 10,
  },
  arrowOpen: {
    transform: [{ rotate: "180deg" }],
  },
  optionsContainer: {
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderTopWidth: 0,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    maxHeight: 200,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  optionsList: {
    maxHeight: 200,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.1)",
  },
  optionSelected: {
    backgroundColor: "rgba(255, 200, 87, 0.2)",
  },
  optionText: {
    fontSize: 16,
  },
  optionTextSelected: {
    fontWeight: "bold",
  },
  checkmark: {
    color: "#FFC857",
    fontSize: 18,
    fontWeight: "bold",
  },
  textWhite: {
    color: "#F1F4F6",
  },
  textBlack: {
    color: "#333A3F",
  },
});
