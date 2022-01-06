import React, { useState } from "react";
import { StyleSheet, View, KeyboardAvoidingView, Modal, Alert ,ScrollView} from 'react-native';
import { TextInput, Button } from "react-native-paper";
import Color from "../Constant/Color";
import * as ImagePicker from 'expo-image-picker';
import Url from "../Constant/Url";



const CreateEmp = (props) => {

    const getDetail = (type) => {
        if (props.route.params) {
            switch (type) {
                case "name":
                    return props.route.params.name
                case "position":
                    return props.route.params.position
                case "gender":
                    return props.route.params.gender
                case "salary":
                    return props.route.params.salary
                case "mail":
                    return props.route.params.mail
                case "photo":
                    return props.route.params.photo
                case "phone":
                    return props.route.params.phone


            }


        }
        return ""
    }
    const [name, setName] = useState(getDetail("name"))
    const [position, setPosition] = useState(getDetail("position"))
    const [gender, setGener] = useState(getDetail("gender"))
    const [salary, setSalary] = useState(getDetail("salary"))
    const [mail, setMail] = useState(getDetail("mail"))
    const [modal, setModal] = useState(false)
    const [photo, setPhoto] = useState(getDetail("photo"))
    const [phone, setPhone] = useState(getDetail("phone"))
    const [enabledKey,setEnabledKey] =useState(false)

    const submitData = () => {
        fetch(Url.ngrok + "/send-data",
            {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                }, body: JSON.stringify({
                    name,
                    position,
                    gender,
                    mail,
                    phone,
                    salary,
                    photo,

                })
            }).then(response => response.json())
            .then(data => {
                //   console.log('Success:', data);
                Alert.alert(`${data.name} is saved successfully`)
                props.navigation.navigate("Home")
            })
            .catch((error) => {
                console.log('Error:', error)
                Alert.alert("some thing is wrong")
            })

    }

    const submitUpdateData=()=>{
        fetch(Url.ngrok + "/update",
        {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            }, body: JSON.stringify({
                id:props.route.params._id,
                name,
                position,
                gender,
                mail,
                phone,
                salary,
                photo,

            })
        }).then(response => response.json())
        .then(data => {
            //   console.log('Success:', data);
            Alert.alert(`${data.name} is  successfully update`)
            props.navigation.navigate("Home")
        })
        .catch((error) => {
            console.log('Error:', error)
            Alert.alert("some thing is wrong")
        })

    }

    const photoFromGallary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        if (!result.cancelled) {
            let newfile = {
                uri: result.uri,
                type: `test/${result.uri.split(".")[1]}`,
                name: `test${result.uri.split(".")[1]}`
            }
            uploadHandler(newfile)
            setModal(false)
        }
    }
    const photoFromCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        })
        if (!result.cancelled) {
            let newfile = {
                uri: result.uri,
                type: `test/${result.uri.split(".")[1]}`,
                name: `test${result.uri.split(".")[1]}`
            }
            uploadHandler(newfile)
            setModal(false)
        }
    }

    const uploadHandler = image => {
        const data = new FormData()
        data.append('file', image)
        data.append("upload_preset", "employeeApp")
        data.append("clound_name", "dvrzs9jem")
        fetch(Url.cloudinary, {
            method: 'post',
            body: data
        }).then(res => res.json())
            .then((dt) => {
                console.log(dt)
                setPhoto(dt.url)


            }).catch(err => {
                console.log(err)
                Alert.alert("some thing is wrong")
            })

    }

    return (
        <KeyboardAvoidingView behavior="position"  style={sytles.root} enabled={enabledKey}>
        <View>
            <ScrollView>
            
                <TextInput
                    label="Name"
                    value={name}
                    mode="outlined"
                    onChangeText={text => setName(text)}
                    onFocus={()=>setEnabledKey(false)}
                    style={sytles.inputText}
                    theme={theme}
                />
                <TextInput
                    label="position"
                    value={position}
                    mode="outlined"
                    onChangeText={text => setPosition(text)}
                    style={sytles.inputText}
                    theme={theme}
                    onFocus={()=>setEnabledKey(false)}
                />
                <TextInput
                    label="Mail"
                    value={mail}
                    mode="outlined"
                    onChangeText={text => setMail(text)}
                    style={sytles.inputText}
                    theme={theme}onFocus={()=>setEnabledKey(false)}
                />
                <TextInput
                    label="Salary"
                    value={salary}
                    mode="outlined"
                    onChangeText={text => setSalary(text)}
                    style={sytles.inputText}
                    theme={theme}
                    onFocus={()=>setEnabledKey(false)}
                />
                <TextInput
                    label="Gender"
                    value={gender}
                    mode="outlined"
                    onChangeText={text => setGener(text)}
                    style={sytles.inputText}
                    theme={theme}
                    onFocus={()=>setEnabledKey(true)}
                />
                <TextInput
                    label="Phone"
                    value={phone}
                    mode="outlined"
                    onChangeText={text => setPhone(text)}
                    style={sytles.inputText}
                    theme={theme}
                    onFocus={()=>setEnabledKey(true)}
                />
                <Button style={{ marginTop: 12 }}
                    icon={photo == "" ? "upload" : "check"}
                    mode="contained"
                    onPress={() => setModal(true)} theme={theme}>
                    upload Image
                </Button>
                {(props.route.params) ?
                    <Button style={{ marginTop: 12 }} icon="content-save" mode="contained" onPress={() => submitUpdateData()} theme={theme}>
                        Update
                    </Button>
                    :
                    <Button style={{ marginTop: 12 }} icon="content-save" mode="contained" onPress={() => submitData()} theme={theme}>
                        Save
                    </Button>
                }
                <Modal
                    animationType="slide"
                    visible={modal}
                    transparent={true}
                    onRequestClose={() => setModal(false)}>
                    <View style={sytles.modelView} >
                        <View style={sytles.modelViewButton}>
                            <Button icon="camera" mode="contained" onPress={photoFromCamera} theme={theme}>
                                Camera
                            </Button>
                            <Button icon="image-area" mode="contained" onPress={photoFromGallary} theme={theme}>
                                Gallery
                            </Button>
                        </View>
                        <Button icon="exit-run" mode="text" onPress={() => setModal(false)} theme={theme}>
                            Press me
                        </Button>
                    </View>



                </Modal>
            

                </ScrollView>

        </View>
        </KeyboardAvoidingView>


    )


}

const sytles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor:Color.background
        // margin: 10
    },
    inputText: {
        margin: 5,
    },
    modelView: {
        position: 'absolute',
        width: "100%",
        bottom: 2,
        padding: 15,
        backgroundColor: Color.lightBackground,
        borderRadius:100,
        marginBottom:20
        
    },
    modelViewButton: {
        flexDirection: "row",
        margin: 10,
        justifyContent: "space-between"
    }
})

const theme = {
    colors: { primary: Color.primary }
}



export default CreateEmp 