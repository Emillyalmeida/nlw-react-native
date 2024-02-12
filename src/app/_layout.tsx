import { Slot } from 'expo-router'
import { SafeAreaView } from 'react-native'
import { useFonts ,Inter_400Regular, Inter_700Bold, Inter_600SemiBold, Inter_500Medium } from "@expo-google-fonts/inter"
import { Loading } from '../components/loading'

export default function Layout(){

    const [ fontsLoaded ] = useFonts({Inter_400Regular, Inter_700Bold, Inter_600SemiBold, Inter_500Medium })


    if(!fontsLoaded){
        return <Loading/>
    }

    return (
        <SafeAreaView className='bg-slate-900 flex-1'>
            <Slot/>
        </SafeAreaView>
    )
}