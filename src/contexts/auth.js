import React, {useState, createContext, useEffect} from  'react';
import app from '../services/firebaseConnection'
import AsyncStorage from '@react-native-async-storage/async-storage';


import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { getDatabase, onValue, ref, set } from "firebase/database"

export const AuthContext = createContext({});


function AuthProvider({children}){
    
    const [ user, setUser ] = useState();
    const [loading, setLoading] = useState(true)

    const auth = getAuth(app);
    const db = getDatabase(app);

    useEffect(()=>{
        async function loadStorage(){
            try{
                let storageUser = (await AsyncStorage.getItem('Auth_user'));
                if(storageUser){
                    setUser(JSON.parse(storageUser))
                    setLoading(false)
                }
                setLoading(false)
            }catch(e){
                alert(e.Message)
            }
        }
        loadStorage();
    },[])

    // logando usuario
    function signIn(email, password){
        signInWithEmailAndPassword(auth, email, password)
        .then(async (value) => {
            let uid = value.user.uid;
            const userRef = ref(db, 'users/'+uid);
            onValue(userRef,(snapshot)=>{
                let data = {
                    uid : uid,
                    nome: snapshot.val().nome,
                    email: value.user.email
                }
                setUser(data)
                storageUser(data)
            })
            
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
    }

    //cadastrando usuário
    function signUp(email, password, nome){
        createUserWithEmailAndPassword(auth, email, password)
        .then(async (value) => {
            let uid = value.user.uid;
            await set(ref(db, 'users/' + uid), {
                nome: nome,
                saldo: 0,
              })
              .then(()=>{
                let data = {
                    uid: uid,
                    nome: nome,
                    email: value.user.email
                }
                setUser(data)
                storageUser(data)
              })

        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            alert(errorMessage)
        // ..
        });
    }

    async function storageUser(data){
        try{
            await AsyncStorage.setItem('Auth_user',JSON.stringify(data))
        }catch(e){

        }
    }

    function logOut(){
        signOut(auth)
        .then(async()=>{
            await AsyncStorage.clear()
            .then(()=>{
                setUser(null)
                alert('usuário deslogado')
            })
            .catch((e)=>{
                alert('algo deu errado')
            })
        })
        .catch((error)=>{
            let errorMessage = error.message
        })
    }
    return(
        <AuthContext.Provider value={{ signed:!!user, user, signUp, signIn, loading, logOut}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;