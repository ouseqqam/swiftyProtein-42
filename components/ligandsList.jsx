import { View, FlatList, Text, StyleSheet, TextInput, Button } from "react-native"
import {ligands} from "../data/ligands.js"
import LigandItem from "./ligandItem.jsx";
import SearchBar from "./searchBar.jsx";
import { useState } from "react"

export default function LigandsList({navigation}) {
    const [isArray, setArray] = useState(true)
    const [ligand, setLigand] = useState(ligands)

    const handleChange = (text) => {
        text = text.trim()
        const ligandsList = ligands.filter(ligand => ligand.startsWith(text))
        if (ligandsList.length > 1) {
            setArray(true)
            setLigand(ligandsList)
        }
        else {
            setArray(false)
            if (ligandsList.length == 1) {
                setLigand(ligandsList[0])
            }
            else {
                setLigand("No ligand found")
            }
        }
    }

    return (
        <View style= {styles.container} >
            <SearchBar handleChange={handleChange} />
            {
                isArray ? 
                <FlatList
                    data={ligand}
                    renderItem={({item}) => <LigandItem ligand = {item} navigation={navigation}  />}
                    keyExtractor={item => item}
                /> 
                : <LigandItem ligand = {ligand} navigation={navigation} />
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        // width: '100%',
        marginTop: 30,
    },
})