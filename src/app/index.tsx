import { View, Text, FlatList } from 'react-native'
import { useState } from 'react'
import { Header } from '../components/header'
import { CategoryItem } from '../components/categoryItem'
import { CATEGORIES } from '../utils/data/products'


export default function Home() {
    const [ category, setCategory ] = useState(CATEGORIES[0])

    function handerSelectCategory (selectedCategory : string){
        setCategory(selectedCategory)
    }

    return (
        <View className="flex-1 pt-8">
            <Header title='Cardapio'/>
            <FlatList
                data={CATEGORIES}
                keyExtractor={(item)=> item}
                renderItem={({item})=> 
                    <CategoryItem title={ item } isSelected={ item === category } onPress={ () => handerSelectCategory(item) }/>
                }
                horizontal
                className='max-h-10 mt-5'
                showsHorizontalScrollIndicator={ false }
                contentContainerStyle={{gap: 12, paddingHorizontal: 20}}
            />
        </View>
    )
}