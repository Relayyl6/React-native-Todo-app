import { createHomeStyles } from "@/assets/styles/home.styles";
import useTheme from "@/hooks/usetheme";
import { LinearGradient } from "expo-linear-gradient";
import { ActivityIndicator, Text } from "react-native";

const LoadingSpinner = () => {
    const { colors } = useTheme();

    const homeStyles = createHomeStyles(colors);

    return (
        <LinearGradient
            colors={colors.gradients.background}
            style={homeStyles.container}
            >
                <ActivityIndicator size="large" color={colors.primary} />
                <Text style={homeStyles.loadingText}>
                    Loading Todos...
                </Text>
        </LinearGradient>

    )
}

export default LoadingSpinner