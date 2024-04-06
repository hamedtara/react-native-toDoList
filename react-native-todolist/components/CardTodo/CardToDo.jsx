import { Image, Text, TouchableOpacity } from "react-native";
import {s} from "./CardToDo.style"
import checkImage from "../../assets/check.png"

export function CardToDo({todo,onPress,onLongPress}) {
    return(
         <TouchableOpacity onLongPress = {() => onLongPress(todo)} style = {s.card} onPress={() => onPress(todo)}>
        <Text style={[s.title ,todo.isComleted&&{textDecorationLine:"line-through"}]} > {todo.title} </Text>

        {todo.isComleted && <Image style={s.image} source={checkImage}/>}

    </TouchableOpacity>
    );
}