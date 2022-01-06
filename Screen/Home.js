
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, FlatList, Alert } from 'react-native';
import { Button, Card, FAB } from 'react-native-paper';
import Color from '../Constant/Color';
import Url from '../Constant/Url';
import { useSelector, useDispatch } from 'react-redux'

const Home = props => {
    {/*const data2 = [{ _id: 1, name: "xxx", position: "xxxx" , phone:"222222",mail:"@gmail.com",salary:"111",photo :"http://3.bp.blogspot.com/-qDc5kIFIhb8/UoJEpGN9DmI/AAAAAAABl1s/BfP6FcBY1R8/s320/BlueHead.jpg"} ,
        { _id: 2, name: "xxx", position: " xxxx" , phone:"22",mail:"@gmail.com",salary:"111",photo :"http://3.bp.blogspot.com/-qDc5kIFIhb8/UoJEpGN9DmI/AAAAAAABl1s/BfP6FcBY1R8/s320/BlueHead.jpg"},
        { _id: 3, name: "xxx", position: "xxxx" ,phone:"222",mail:"@gmail.com",salary:"111",photo :"http://3.bp.blogspot.com/-qDc5kIFIhb8/UoJEpGN9DmI/AAAAAAABl1s/BfP6FcBY1R8/s320/BlueHead.jpg"},
        { _id: 4, name: "xxx", position: "xxxx" , phone:"222222",mail:"@gmail.com",salary:"111",photo :"http://3.bp.blogspot.com/-qDc5kIFIhb8/UoJEpGN9DmI/AAAAAAABl1s/BfP6FcBY1R8/s320/BlueHead.jpg"},
        { _id: 5, name: "xxx", position: "xxxx" ,phone:"2222",mail:"@gmail.com",salary:"111",photo :"http://3.bp.blogspot.com/-qDc5kIFIhb8/UoJEpGN9DmI/AAAAAAABl1s/BfP6FcBY1R8/s320/BlueHead.jpg"},
        { _id: 6, name: "xxx", position: "xxxx" ,phone:"22s2222",mail:"@gmail.com",salary:"111",photo :"http://3.bp.blogspot.com/-qDc5kIFIhb8/UoJEpGN9DmI/AAAAAAABl1s/BfP6FcBY1R8/s320/BlueHead.jpg"},
        { _id: 7, name: "xxx", position: "xxxx" ,phone:"222d222",mail:"@gmail.com",salary:"111",photo :"http://3.bp.blogspot.com/-qDc5kIFIhb8/UoJEpGN9DmI/AAAAAAABl1s/BfP6FcBY1R8/s320/BlueHead.jpg"},

        { _id: 8, name: "xxx", position: "xxxx" ,phone:"2222d22",mail:"@gmail.com",salary:"111",photo :"http://3.bp.blogspot.com/-qDc5kIFIhb8/UoJEpGN9DmI/AAAAAAABl1s/BfP6FcBY1R8/s320/BlueHead.jpg"},
        { _id: 9, name: "xxx", position: "xxxx" ,phone:"222d222",mail:"@gmail.com",salary:"111",photo :"http://3.bp.blogspot.com/-qDc5kIFIhb8/UoJEpGN9DmI/AAAAAAABl1s/BfP6FcBY1R8/s320/BlueHead.jpg"},



    ] */}
    // const [data, setData] = useState([])
    // const [loading, setLoading] = useState(true)

    const {data,loading} = useSelector ((state) => {
        return state
    })
const dispat = useDispatch()

    const fetchData = () => {
        fetch(Url.ngrok)
            .then(res => res.json())
            .then(data1 => {
                // setData(data1)
                // setLoading(false)
                dispat({type:"ADD_DATA",payload:data1})
                dispat({type:"SET_LOAD",payload:false})
                console.log(data1)
            }
            ).catch(err => {
                console.log(err)
                Alert.alert("some thing is wrong")
            })
    }
    useEffect(
        fetchData
        , [])



    function renderList(item) {
        return (
            <Card style={styles.cardView} key={item._id} onPress={() => props.navigation.navigate("Profile", { item: item })}>
                <View style={{ flexDirection: "row", padding: 6 }}>
                    <Image

                        style={styles.cardImage}
                        source={{ url: item.photo }} />
                    <View style={styles.cardTextView}>
                        <Text style={styles.cardText}> {item.name}</Text>
                        <Text style={styles.cardText}>{item.position}</Text>
                    </View>
                </View>
            </Card>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: Color.background }}>


            <FlatList
                data={data}
                renderItem={({ item }) => {
                    return renderList(item)
                }}
                keyExtractor={(item) => `${item._id}`}
                onRefresh={fetchData}
                refreshing={loading}

            />
            <FAB
                style={styles.fab}
                small={false}
                icon="plus"
                theme={{ colors: { accent: Color.primary } }}
                onPress={() => props.navigation.navigate("Create")}
            />




        </View>
    )
}

const styles = StyleSheet.create({
    cardView: {
        padding: 5,
        margin: 4,
        backgroundColor: "#fafafa"

    },
    cardImage: {
        height: 50,
        width: 50,
        borderRadius: 35,
    },
    cardTextView: {
        fontSize: 20,
        marginLeft: 10,
    },
    cardText: {
        fontSize: 20,

    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
})

export default Home 