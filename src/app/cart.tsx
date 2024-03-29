import { Alert, Linking, ScrollView, Text, View } from "react-native";
import React, { useState } from "react";
import { useNavigation } from "expo-router";
import { Feather } from "@expo/vector-icons";

import { productCartProps, useCartStore } from "../store/cart-store";
import { Header } from "../components/header";
import { Product } from "../components/product";
import { Input } from "../components/input";
import { Button } from "../components/button";
import { ButtonLink } from "../components/button-link";

import { formatCurrency } from "../utils/functions/format-currency";
import colors from "tailwindcss/colors";

const PHONE_NUMBER = '55'

export default function Cart() {
    const cartStore = useCartStore()
    const navigation = useNavigation()
    const [address, setAddress] = useState('')

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

    const reverseGeocode = async () => {
        const location = cartStore.location.coords

        try {
            const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${process.env.EXPO_PUBLIC_API_KEY}`);
            const data = await response.json();
            
            if (data.results.length > 0) {
                const addressData = data.results[0].formatted_address;
                setAddress(addressData)
                return address;
            } else {
                console.log("No address found");
                return null;
            }
        } catch (error) {
            console.error("Error fetching address:", error);
            return null;
        }

    };

    return (
        <View className="flex-1 pt-8">
            <Header title="Seu carrinho" isCart/>

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
                    <View className="flex-1 justify-center items-center gap-5">
                        <Feather name="alert-triangle" size={48} color={colors.white}/>
                        <Text className="text-white font-subtitle text-xl">
                            Seu carrinho está vazio
                        </Text>
                    </View>
                    )}

                    <View className="flex-row gap-2 items-center mt-5 mb-4">
                        <Text className="text-white text-xl font-subtitle">Total:</Text>
                        <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
                    </View>

                    <Button className="mb-4" onPress={reverseGeocode}>
                        <Button.Icon>
                            <Feather name="map-pin" size={20} />
                        </Button.Icon>
                        <Button.Text>Usar Localização Atual</Button.Text>
                    </Button>

                    <Input
                        placeholder="Informe o endereço de entrega com rua, bairro, CEP, número e complemento..."
                        value={address}
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