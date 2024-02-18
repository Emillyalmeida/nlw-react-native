import { View, Text, FlatList, SectionList } from 'react-native'
import { useRef, useState } from 'react'

import { Header } from '../components/header'
import { Product } from '../components/product'
import { CategoryItem } from '../components/categoryItem'

import { CATEGORIES, MENU, ProductProps } from '../utils/data/products'
import { Link } from 'expo-router'
import { useCartStore } from '../store/cart-store'


export default function Home() {
    const cartStore = useCartStore()
    const [ category, setCategory ] = useState(CATEGORIES[0])
    const sectionListRef = useRef<SectionList<ProductProps>>(null)

    function handerSelectCategory (selectedCategory : string){
        setCategory(selectedCategory)

        const sectionIndex = CATEGORIES.findIndex((category) => category === selectedCategory)

        if(sectionListRef.current) {
            sectionListRef.current.scrollToLocation({
                animated: true,
                sectionIndex,
                itemIndex: 0
            })   
        }
    }

    const cartQuantityItems = cartStore.products.reduce(
        (total, product) => total + product.quantity,
        0,
      );

    return (
        <View className="flex-1 pt-8">
            <Header title='Cardapio' cartItens={cartQuantityItems}/>
            <FlatList
                data={CATEGORIES}
                keyExtractor={ (item)=> item }
                renderItem={ ({item})=> 
                    <CategoryItem title={ item } isSelected={ item === category } onPress={ () => handerSelectCategory(item) }/>
                }
                horizontal
                className='max-h-10 mt-5'
                showsHorizontalScrollIndicator={ false }
                contentContainerStyle={{ gap: 12, paddingHorizontal: 20 }}
            />
            <SectionList
                ref={sectionListRef}
                sections={MENU}
                keyExtractor={(item)=> item.id}
                stickySectionHeadersEnabled={ false }
                renderItem={({ item }) => (
                    <Link href={`/product/${item.id}`} asChild>
                        <Product data={ item }/>
                    </Link>
                )}
                renderSectionHeader={({ section: { title } }) => (
                    <Text className="text-xl text-white font-heading mt-8 mb-3">
                        { title }
                    </Text>
                )}
                className='flex-1 px-5'
                showsVerticalScrollIndicator={ false }
                contentContainerStyle={{ paddingBottom: 100 }}
            />
        </View>
    )
}