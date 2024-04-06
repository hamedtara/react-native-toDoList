import { TouchableOpacity, Text } from "react-native";
import { s } from "./Button.style";

export function ButtonAdd({ onPress }) { // Destructure onPress from props
    return (
        <TouchableOpacity onPress={onPress} style={s.btn}>
            <Text style={s.text}>+ New todo</Text>
        </TouchableOpacity>
    );
}
