import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Screen/Home';
import CreateEmp from './Screen/CreateEmp';
import Profile from './Screen/Profile';
import Color from './Constant/Color';
import {createStore} from 'redux'
import {Provider} from "react-redux"
import reducer from "./reducer/reducer"




const store = createStore(reducer)


const Stack = createStackNavigator();

const options = {
  title: "Home",
  headerTintColor: 'white',
  headerStyle: { backgroundColor: Color.primary},
  
}

function App() {
  return (
    <View style={styles.container} >

      <Stack.Navigator hea>
        <Stack.Screen name="Home" component={Home}
          options={options} />
        <Stack.Screen name="Create" component={CreateEmp} options={{ ...options, title: " " }} />
        <Stack.Screen name="Profile" component={Profile}  options={{ ...options, title: " Employee Profile " }}/>

      </Stack.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.background,
    // marginTop: Constants.statusBarHeight,
  },
});


export default
  () => {
    return (
      <Provider store={store}>
      <NavigationContainer>
        <App />
      </NavigationContainer>
      </Provider>
    )
  }
