import { ReactNode } from "react";
import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type buttonProps = TouchableOpacityProps & {
    children: ReactNode
}

type buttonTextProps = {
    children: ReactNode
}

type buttonIconProps = {
    children: ReactNode
}

function Button ({ children, ...rest }: buttonProps){
    return (
        <TouchableOpacity {...rest} className="h-12 bg-lime-400 rounded-md items-center justify-center flex-row">
            { children }
        </TouchableOpacity>
    )
}

function ButtonText ({ children }:buttonTextProps) {
    return (
        <Text className="text-black text-base mx-2 font-heading">
            { children }
        </Text>
    )
}

function ButtonIcon ({ children }: buttonIconProps) {
    return children
}

Button.Text = ButtonText
Button.Icon = ButtonIcon


export { Button }