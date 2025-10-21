import { createHomeStyles } from '@/assets/styles/home.styles';
import { api } from '@/convex/_generated/api';
import useTheme from '@/hooks/usetheme';
import { Ionicons } from '@expo/vector-icons';
import { useMutation } from 'convex/react';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Alert, TextInput, TouchableOpacity, View } from 'react-native';

const TodoInput = () => {

    const { colors } = useTheme();
    const  homeStyles = createHomeStyles(colors);
    const [ todo, setTodo ] = useState("");
    const addTodo = useMutation(api.todos.addTodo);

    const handleAddTodo = async () => {
        if (todo.trim()) {
            try {
                await addTodo({ text: todo.trim() });
                setTodo("");
            } catch(error) {
                console.error("Error adding an Item to the todo item", error)
                Alert.alert("Error", "Failed to add Todo")
            }
        }
    }

  return (
    <View style={homeStyles.inputSection}>
      <View style={homeStyles.inputWrapper}>
        <TextInput
            style={homeStyles.input}
            placeholder="Enter a new task"
            value={todo}
            onChangeText={setTodo}
            onSubmitEditing={handleAddTodo}
            multiline
            placeholderTextColor={colors.textMuted}
        />

        <TouchableOpacity
            onPress={handleAddTodo}
            activeOpacity={0.8}
            disabled={!todo.trim()}
        >
            <LinearGradient
                colors={
                    todo.trim() ? colors.gradients.primary : colors.gradients.muted
                }
                style={[homeStyles.addButton, !todo.trim() && homeStyles.addButtonDisabled]}
            >
                <Ionicons name="add" size={28} style={{ fontWeight: "bold" }} color="#000000"/>
            </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default TodoInput