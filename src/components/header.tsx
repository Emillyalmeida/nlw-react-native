import { Image, View, TouchableOpacity, Text } from "react-native";
import { Feather } from '@expo/vector-icons'
import colors from "tailwindcss/colors";
import { Link } from "expo-router";

type headerProps = {
    title: string,
    cartItens?: number
}

export function Header({ title, cartItens = 0  }: headerProps) {
    return (
        <View className="flex-row items-center border-b border-slate-700 pb-5 mx-5 mt-3">
            <View className="flex-1">
                <Image source={require("@/src/assets/logo.png")} className="h-6 w-32"/>
                <Text className="text-white text-xl font-headind mt-3">{ title }</Text>
            </View>
            <Link href="/cart" asChild>
                <TouchableOpacity className="relative ml-4">
                    <View className="bg-lime-300 h-4 w-4 rounded-full items-center justify-center absolute -top-2 z-10 -right-1">
                        <Text className="text-slate-900 font-bold text-xs">{ cartItens }</Text>
                    </View>
                    <Feather name="shopping-bag" color={colors.white} size={24}/>
                </TouchableOpacity>
            </Link>
        </View>
    )
}