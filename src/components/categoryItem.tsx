import { Pressable, PressableProps, Text } from 'react-native'
import { clsx } from 'clsx'

type categoryItem = PressableProps & {
    title: string,
    isSelected?: boolean
}

export function CategoryItem({ title, isSelected, ...rest }: categoryItem) {
    return (
        <Pressable 
            className={clsx('bg-slate-800 px-4 justify-center rounded-md h-10', isSelected && 'border-2 border-lime-300')}
            { ...rest }
        >
            <Text className='text-slate-100 text-sm font-subtitle'>{ title }</Text>
        </Pressable>
    )
}