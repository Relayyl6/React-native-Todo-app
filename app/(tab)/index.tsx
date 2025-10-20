// import { api } from "@/convex/_generated/api";
import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme from "@/hooks/usetheme";
// import { useMutation, useQuery } from "convex/react";
import LoadingSpinner from "@/components/LoadingSpinner";
import TodoInput from "@/components/TodoInput";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQuery } from "convex/react";
import { LinearGradient } from 'expo-linear-gradient';
import { Alert, FlatList, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
// import { isLoading } from "expo-font";

type Todo = Doc<"todos">

export default function Index() {

  const { toggleDarkMode, colors } = useTheme()

  const styles = createHomeStyles(colors)

  const todos = useQuery(api.todos.getTodos)
  // // console.log(todos)
  
  const toggleTodo = useMutation(api.todos.toogleTodo);

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

  const renderTodoItem = ({ item }: { item: Todo }) => (
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
      </LinearGradient>
    </View>
  )


  return (
    <LinearGradient colors={colors.gradients.background} style={styles.container}>
      <StatusBar barStyle={colors.statusBarStyle} />
      <SafeAreaView style={styles.todoList}>

          <Header />

          <TodoInput />

          <FlatList
            data={todos}
            renderItem={renderTodoItem}
            keyExtractor={(item) => item._id}
            style={styles.todoList}
            contentContainerStyle={styles.todoListContent}
          />

          <TouchableOpacity onPress={toggleDarkMode} style={styles.button}>
            <Text>T</Text>
          </TouchableOpacity>


      </SafeAreaView>
    </LinearGradient>
  );
}



