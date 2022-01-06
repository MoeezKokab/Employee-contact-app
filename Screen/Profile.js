import React from "react";
import { StyleSheet, View, Image, Text, Linking, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Card, Button } from 'react-native-paper'
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import Url from "../Constant/Url";

import Color from "../Constant/Color";


const Profile = props => {
    const { _id, name, position, phone, mail, salary, photo,gender } = props.route.params.item


    const deleteProfile = () => {
        fetch(Url.ngrok + "/delete",
            {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({
                    id: _id

                })
            }).then(response => response.json())
            .then(data => {
                //   console.log('Success:', data);
                Alert.alert(`${data.name} is Delete`)
                props.navigation.navigate("Home")
            })
            .catch((error) => {
                console.log('Error:', error)
                Alert.alert("some thing is wrong")
            })

    }
    return (
        <View style={styles.root}>
            <LinearGradient

                colors={["#fc0330", '#fa2d52',"#fc3f61","#fa4d6c","#fc5b78","#f78398" ]}
                style={{ height: "20%" }}
            >

            </LinearGradient>
            <View style={styles.imageView}>
                <Image
                    style={styles.image}
                    source={{ url: photo }}
                />
                <Title>{name}</Title>
                <Text>{position}</Text>
            </View>
            <Card style={{ margin: 5 }} onPress={() => { Linking.openURL(`mailto:${mail}`) }}>
                <View style={styles.cardView}>
                    <AntDesign name="mail" size={24} color={Color.primary} />
                    <Text style={styles.cardViewText}>{mail}</Text>
                </View>
            </Card>
            <Card style={{ margin: 5 }} onPress={() => { Linking.openURL(`tel:${phone}`) }} >
                <View style={styles.cardView}>
                    <AntDesign name="phone" size={24} color={Color.primary} />
                    <Text style={styles.cardViewText}>{phone}</Text>
                </View>
            </Card>
            <Card style={{ margin: 5 }}>
                <View style={styles.cardView}>
                    <FontAwesome name="money" size={24} color={Color.primary} />

                    <Text style={styles.cardViewText}>{salary}</Text>
                </View>
            </Card>
            <View style={{ flexDirection: "row", justifyContent: 'space-around' }}>
                <Button style={{ marginTop: 12 }} icon="account-edit" mode="contained"
                    onPress={() => {
                        props.navigation.navigate("Create",{ _id, name, position, phone, mail, salary, photo,gender })
                    }} theme={theme}>
                    Edit
                </Button>
                <Button style={{ marginTop: 12 }} icon="delete" mode="contained" onPress={() => deleteProfile()} theme={theme}>
                    Delete
                </Button>
            </View>

        </View>
    )

}

const theme = {
    colors: { primary: Color.primary }
}

const styles = StyleSheet.create({

    root: {
        flex: 1,
        backgroundColor:Color.accent,
    },
    imageView: {
        alignItems: "center",
        marginTop: -60,

    },
    image: {
        height: 120,
        width: 120,
        borderRadius: 50,
    },
    cardView: {
        flexDirection: 'row',
        alignItems: "center",
        padding: 4,
        marginTop: 5,
        height: 50
    },
    cardViewText: {
        fontSize: 15,
        marginLeft: 10

    }
})

export default Profile