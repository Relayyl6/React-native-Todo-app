// import { api } from "@/convex/_generated/api";
import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme from "@/hooks/usetheme";
// import { useMutation, useQuery } from "convex/react";
import EmptyState from "@/components/EmptyState";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from 'expo-linear-gradient';
import { useState } from "react";
import { Alert, FlatList, StatusBar, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
// import { isLoading } from "expo-font";

type Todo = Doc<"todos">

export default function Index() {

  const { toggleDarkMode, colors } = useTheme()

  const styles = createHomeStyles(colors)

  const todos = useQuery(api.todos.getTodos)

  const [ editText, setEditText ] = useState("")
  const [ editingTodoId, setEditingTodoId ] = useState<Id<"todos"> | null>(null)
  // // console.log(todos)
  
  const toggleTodo = useMutation(api.todos.toogleTodo);
  const editTodo = useMutation(api.todos.editTodo);
  const deleteTodo = useMutation(api.todos.deleteTodo);

  // const deleteAllTodos = useMutation(api.todos.deleteAllTodos)

  const isLoading = todos === undefined

  if (isLoading) {
    return <LoadingSpinner />
  }

  const handleToggleTodo = async (id: Id<"todos">) => {
    try {
      await toggleTodo({ id: id })
    } catch(error) {
      console.error("An Error occured while toggling todo", error)
      Alert.alert("Error", "Failed to toggle todo");
    }
  }

  const handleDeleteTodo = async (id: Id<"todos">) => {
    try {
      Alert.alert(
        "Delete Todo",
        "Are you sure you want to delete this todo?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Delete",
            style: "destructive",
            onPress: async ( ) => {
              await deleteTodo({ id })
            }
          }
        ]
      )
    } catch(error) {
      console.error("An Error occured while deleting todo", error)
      Alert.alert("Error", "Failed to delete todo");
    }
  }

  const handleStartEdit = (item: Todo) => {
    setEditingTodoId(item._id);
    setEditText(item.text);
  }

  const handleCancelEdit = () => {
    setEditingTodoId(null);
    setEditText("");
  }

  const handleSaveEdit = () => {
    if (!editingTodoId) return ;
    handleEditTodo(editingTodoId, editText);

    setEditingTodoId(null);
    setEditText("");
  }

  const handleEditTodo = async (id: Id<"todos">, text: string) => {
    try {
      await editTodo({ id: id, text: text })
    } catch(error) {
      console.error("An Error occured while editing todo", error)
      Alert.alert("Error", "Failed to edit todo");
    }
  }

  const renderTodoItem = ({ item }: { item: Todo }) => {
    const isEditing = editingTodoId === item._id;


    return (
    
    <View style={styles.todoItemWrapper}>
      <LinearGradient
        colors={colors.gradients.surface}
        style={styles.todoItem}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        >
          <TouchableOpacity
            style={styles.checkbox}
            activeOpacity={0.7}
            onPress={() => handleToggleTodo(item._id)}
          >
            <LinearGradient
              colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
              style={[
                styles.checkboxInner, { borderColor: item.isCompleted ? "transparent" : colors.border }
              ]}
              >
                {
                  item.isCompleted && <Ionicons name="checkmark" size={18} color="#fff"/>
                }
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.todoTextContainer}>
            {
              isEditing ? (
                <TextInput
                  value={editText}
                  onChangeText={setEditText}
                  style={styles.editInput}
                  autoFocus
                  onBlur={handleSaveEdit}
                />
              ) : (
                <Text
                  style={[
                    styles.todoText,
                    item.isCompleted && {
                      textDecorationLine: "line-through",
                      color: colors.textMuted,
                      opacity: 0.6
                    }
                  ]}
                >
                  {item.text}
                </Text>
              )
            }

            <View style={styles.todoActions}>
              {
                isEditing ? (
                  <>
                    <TouchableOpacity onPress={handleSaveEdit}>
                      <LinearGradient
                        colors={colors.gradients.success}
                        style={styles.actionButton}>
                          <Ionicons name="checkmark-done" size={16} color="#ffffff"/>
                      </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleCancelEdit}>
                      <LinearGradient
                        colors={colors.gradients.danger}
                        style={styles.actionButton}>
                          <Ionicons name="close" size={16} color="#ffffff"/>
                      </LinearGradient>
                    </TouchableOpacity>
                  </>
                ) : (
                  <>
                    <TouchableOpacity onPress={() => handleStartEdit(item)} activeOpacity={0.8}>
                      <LinearGradient
                        colors={colors.gradients.warning}
                        style={styles.actionButton}
                        >
                        <Ionicons name="pencil" size={14} color="#ffffff"/>
                      </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => handleDeleteTodo(item._id)} activeOpacity={0.8}>
                      <LinearGradient
                        colors={colors.gradients.danger}
                        style={styles.actionButton}
                        >
                        <Ionicons name="trash" size={16} color="#ffffff"/>
                      </LinearGradient>
                    </TouchableOpacity>
                  </>
                )
              }
            </View>
          </View>
      </LinearGradient>
    </View>
  )
}


  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={styles.safeArea}>

          <Header />

          <TodoInput />

          <FlatList
            data={todos}
            renderItem={renderTodoItem}
            keyExtractor={(item) => item._id}
            style={styles.todoList}
            contentContainerStyle={styles.todoListContent}
            ListEmptyComponent={<EmptyState />}
            showsVerticalScrollIndicator={false}
          />

          <TouchableOpacity onPress={toggleDarkMode} style={styles.button}>
            <Ionicons name="toggle-sharp" size={16} color="#ffffff"/>
          </TouchableOpacity>


      </SafeAreaView>
    </LinearGradient>
  );
}



