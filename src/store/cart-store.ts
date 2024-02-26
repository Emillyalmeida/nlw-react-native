import { create } from "zustand";
import { ProductProps } from "../utils/data/products";

import { createJSONStorage, persist } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as cartInMemory from './helpers/cart-in-memory';
import { LocationObject } from "expo-location";

export type productCartProps = ProductProps & {
    quantity: number
}

type StateProps = {
    products: productCartProps[],
    location: LocationObject,
    add: (product: ProductProps) => void,
    remove: (productId: string) => void,
    clear: () => void,
    updateLocation: (location: LocationObject) => void
}

export const useCartStore = create(
    persist<StateProps>((set)=> ({
    products: [],
    location: {
        coords: {
            latitude: 0,
            longitude: 0,
            altitude: null,
            accuracy: null,
            altitudeAccuracy: null,
            heading: null,
            speed: null
        },
        timestamp: 0
    },

    add: (product: ProductProps) =>
        set((state) => ({
            products: cartInMemory.Add(state.products, product),
        })),
    
    remove: (productId: string) =>
        set((state) => ({
            products: cartInMemory.Remove(state.products, productId),
        })),

    clear: () => set({ products: [] }),

    updateLocation: (location: LocationObject) => {
        set(()=> ({
            location: location
        }))
    }
}), {
    name: "nlw-react-native",
    storage: createJSONStorage(() => AsyncStorage),
}))


