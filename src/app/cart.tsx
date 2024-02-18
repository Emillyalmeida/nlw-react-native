import { Alert, Linking, ScrollView, Text, View } from "react-native";
import { productCartProps, useCartStore } from "../store/cart-store";
import { Header } from "../components/header";
import { Product } from "../components/product";
import { Input } from "../components/input";
import { formatCurrency } from "../utils/functions/format-currency";
import React, { useState } from "react";
import { useNavigation } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { Button } from "../components/button";
import { ButtonLink } from "../components/button-link";

const PHONE_NUMBER = '55'

export default function Cart() {
    const cartStore = useCartStore()
    const navigation = useNavigation()
    const [address, setAddress] = useState('');

    const total = formatCurrency(cartStore.products.reduce((total, product) => total + product.price * product.quantity,0));

    function handleProductRemove(product: productCartProps) {
        Alert.alert('Remover', `Desejar remover ${product.title} do carrinho?`, [
          {
            text: 'Canelar'
          },
          {
            text: 'Remover',
            onPress: () => cartStore.remove(product.id)
          }
        ])
    }

    function handleOrder() {
        if (address.trim().length === 0) {
            return Alert.alert('Pedido', 'Informe os dados da entrega.')
        }

        const products = cartStore.products.map((product) => `\n ${product.quantity}x ${product.title}`).join('');

        const message = `
        🍔 NOVO PEDIDO
        \n Entregar em: ${address}

        ${products}

        \n Valor total: ${total}
        `

        Linking.openURL(`http://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${message}`)

        navigation.goBack();
    }

    return (
        <View className="flex-1 pt-8">
            <Header title="Seu carrinho"/>

            <ScrollView>
                <View className="flex-1 p-5">
                    {cartStore.products.length > 0 ? (
                    <View className="border-b border-slate-700">
                        {
                            cartStore.products.map((product)=> (
                                <Product key={product.id} data={product} onPress={() => handleProductRemove(product)}
                                />
                            ))
                        }
                    </View>
                    ) : (
                    <Text>Seu carrinho está vazio</Text>)}

                    <View className="flex-row gap-2 items-center mt-5 mb-4">
                        <Text className="text-white text-xl font-subtitle">Total:</Text>
                        <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
                    </View>

                    <Input
                        placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
                        onChangeText={setAddress}
                        blurOnSubmit={true}
                        onSubmitEditing={handleOrder}
                        returnKeyType="next"
                    />
                </View>
            </ScrollView>
            <View className="p-5 gap-5">
                <Button onPress={handleOrder}>
                    <Button.Text>Enviar pedido</Button.Text>
                    <Button.Icon>
                        <Feather name="arrow-right-circle" size={20} />
                    </Button.Icon>
                </Button>

                <ButtonLink title="Voltar ao cardápio" href="/" />
            </View>
        </View>
    )
}