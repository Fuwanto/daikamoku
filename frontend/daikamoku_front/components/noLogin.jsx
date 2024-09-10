import { Pressable, Text, View, Image } from "react-native";
import { Link } from "expo-router";

export default function NoLogin() {
  return (
    <View className="flex-1 flex-col bg-black">
      <View className="flex-1 justify-center items-center bg-white rounded-3xl p-4">
        <Image className="w-28 h-28" source={require("../assets/buho.png")} />
        <Text className="text-3xl font-bold text-black text-center">
          Daikamoku
        </Text>
        <Text className="text-xl text-black text-center">
          Mantente al tanto de tu progreso universitario
        </Text>
      </View>

      <View className="flex-1 justify-center items-center bg-black">
        <Link href="/login" asChild>
          <Pressable className="bg-custom-blue p-4 rounded-2xl m-4">
            <Text className="text-xl font-bold text-white">Iniciar sesión</Text>
          </Pressable>
        </Link>

        <Link href="/register" asChild>
          <Pressable className="bg-custom-brown p-4 rounded-2xl mt-4">
            <Text className="text-xl font-bold">Registrarse</Text>
          </Pressable>
        </Link>
      </View>
    </View>
  );
}
