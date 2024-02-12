import { Image, Text, View } from "react-native";
import { Redirect, useLocalSearchParams, useNavigation } from "expo-router";

import { PRODUCTS } from "@/src/utils/data/products";
import { formatCurrency } from "@/src/utils/functions/format-currency";
import { Button } from "@/src/components/button";
import { Feather } from "@expo/vector-icons";
import { ButtonLink } from "@/src/components/button-link";
import { useCartStore } from "@/src/store/cart-store";

export default function Product() {
    const cartStore = useCartStore()
    const navigation = useNavigation()
    const { id } = useLocalSearchParams()

    const product = PRODUCTS.find((product) => product.id === id)

    if(!product) {
        return <Redirect href="/" />
    }

    function handlerAddToCart() {
        if(!product) return
        cartStore.add(product)
        navigation.goBack()
    }

    return (
        <View className="flex-1">
            <Image className="w-full h-40" source={product.cover} resizeMode="cover"/>
            <View className="flex-1 mt-8 p-5">
                <Text className="text-2xl font-heading text-slate-100 mb-1">
                    {product.title}
                </Text>
                <Text className="text-2xl text-lime-400 font-heading mb-4">
                    { formatCurrency(product.price) }
                </Text>
                <Text className="font-body text-slate-400 text-base mb-6">
                    { product.description }
                </Text>
                {
                    product.ingredients.map(( ingredient ) => (
                        <Text key={ingredient} className="font-body text-slate-400 text-base" >
                            {"\u2022"} { ingredient }
                        </Text>
                    ))
                }
            </View>
            <View className="p-5 pb-8 gap-5">
                <Button onPress={handlerAddToCart}>
                    <Button.Icon>
                        <Feather name="plus-circle" size={20} />
                    </Button.Icon>
                    <Button.Text>
                        Adicionar ao carrinho
                    </Button.Text>
                </Button>
                <ButtonLink title="Voltar ao cardápio" href="/"/>
            </View>
        </View>
    )
}