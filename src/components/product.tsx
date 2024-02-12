import { forwardRef } from "react";
import { Image, ImageProps, Text, TouchableOpacity, TouchableOpacityProps, View } from "react-native";

type productDataProps = {
    title: string,
     description: string,
     thumbnail: ImageProps
}

type productProps = TouchableOpacityProps & {
    data: productDataProps
}

export const Product =  forwardRef<TouchableOpacity, productProps>(({ data, ...rest }, ref) => {
    return (
        <TouchableOpacity ref={ref} className="w-full flex-row pb-4 items-center" { ...rest }>
            <Image className="w-20 h-20 rounded-md" source={ data.thumbnail }/>
            <View className="flex-1 ml-3">
                <Text className="text-base font-subtitle text-slate-100 flex-1">
                    { data.title }
                </Text>
                <Text className="text-slate-400 text-xs mt-1">
                    { data.description }
                </Text>
            </View>
        </TouchableOpacity>
    )
})