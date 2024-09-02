import { Pressable, Text, View } from "react-native";
import { Link } from "expo-router";

export default function NoLogin() {
  return (
    <View className="flex-1 flex-col bg-black">
      <View className="flex-1 justify-center items-center bg-white rounded-3xl p-4">
        <Text className="text-3xl font-bold">Bienvenido a Daikamoku</Text>
        <Text className="text-xl">
          La mejor app para controlar tu progreso universitario
        </Text>
      </View>
      <View className="flex-1 justify-center items-center bg-black">
        <Link href="/login" asChild>
          <Pressable className="bg-white p-4 rounded-2xl m-4">
            <Text className="text-xl font-bold">Iniciar sesión</Text>
          </Pressable>
        </Link>

        <Link href="/register" asChild>
          <Pressable className="bg-custom-yellow p-4 rounded-2xl mt-4">
            <Text className="text-xl font-bold">Registrarse</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
