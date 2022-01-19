import React, {useContext, useReducer} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';


import { AuthContext } from '../../contexts/auth';

export default function Home() {
    const {user, logOut} = useContext(AuthContext)
 return (
   <View>
       <Text>Home</Text>
       <Text>Home</Text>
       <Text>{user.nome}</Text>
       <Text>{user.email}</Text>
       <TouchableOpacity onPress={()=>logOut()}><Text>ola</Text></TouchableOpacity>
   </View>
  );
}