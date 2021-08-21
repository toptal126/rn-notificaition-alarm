import React, {useState, useEffect, useRef, useContext} from 'react';
import {View, Text, TextInput, ActivityIndicator, Alert} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BottomModal from '../BottomModal';
import Button from '../Button';
import Input from '../Input';

import {BASE_URL} from '@env';

import axios from 'axios';

import SettingsOptionsContext from '../../contexts/SettingsOptionsContext';

import {useTheme} from '@react-navigation/native';
import {
  getSettingsData,
  storeSettingsData,
  showAyncStorageData,
  removeSettingsData,
  storeSettingsEncryptedData,
  getSettingsEncryptedData,
} from '../../utils';

const AddButton = ({iconSize, onPress, customButton}) => {
  const {colors} = useTheme();

  const loginrefBottomModal = useRef();
  const signinrefBottomModal = useRef();

  const [name, setName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [viewPassword, setViewPassword] = useState(false);

  const {auth, setAuth} = useContext(SettingsOptionsContext);

  // const [auth, setAuth] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);

  // const handleAuth = async () => {
  //   const SIGNIN_URI = `${BASE_URL}/api/login`;

  //   const data = {
  //     email: email,
  //     password: password,
  //   };

  //   try {
  //     setAuthLoading(true);
  //     const signinRes = await axios.post(SIGNIN_URI, data);

  //     if (signinRes.data) {
  //       setAuthLoading(false);
  //       console.log(signinRes.data);
  //       storeSettingsEncryptedData('userToken', signinRes.data.pass);
  //       console.log('el token bro:', signinRes.data.pass);
  //       console.log('simon');
  //       setAuth(true);
  //       loginrefBottomModal.current.close();
  //     }
  //   } catch (error) {
  //     // if (error.response.data) {
  //     //   setAuthLoading(false);
  //     //   console.log('ERR REGISTER', error.response.data);
  //     // } else {
  //     //   Alert.alert(error.response.data);
  //     // }
  //     setAuthLoading(false);
  //     console.log('ERR REGISTER', error.response.data.message);
  //     Alert.alert(error.response.data.message);
  //   }
  // };

  // const loginModal = () => {
  //   return (
  //     <BottomModal
  //       openModal={loginrefBottomModal}
  //       wrapperColor={colors.subModalWrapper}
  //       muchContent={true}
  //       customSize={true}
  //       sizeModal={840}
  //       borderRadiusTop={10}
  //       keyBoardPushContent={false}
  //       closeDragDown={false}
  //       content={
  //         <View style={{flexDirection: 'column'}}>
  //           <View
  //             style={{
  //               flexDirection: 'row',
  //               justifyContent: 'flex-end',
  //               // backgroundColor: 'red',
  //               padding: 15,
  //             }}>
  //             <AntDesign
  //               onPress={() => loginrefBottomModal.current.close()}
  //               name="close"
  //               color={colors.text}
  //               size={30}
  //             />
  //           </View>
  //           <View
  //             style={{
  //               // backgroundColor: 'blue',
  //               height: '87%',
  //               alignItems: 'center',
  //               justifyContent: 'center',
  //             }}>
  //             <View>
  //               <View
  //                 style={{
  //                   marginBottom: 50,
  //                   // backgroundColor: 'pink',
  //                   flexDirection: 'row',
  //                   alignItems: 'center',
  //                   justifyContent: 'center',
  //                 }}>
  //                 <Ionicons name="school" color={colors.text} size={45} />
  //                 <Text
  //                   style={{
  //                     fontSize: 38,
  //                     marginLeft: 4,
  //                     fontWeight: 'bold',
  //                     color: colors.text,
  //                   }}>
  //                   Skool
  //                 </Text>
  //               </View>

  //               <View>
  //                 <TextInput
  //                   value={email}
  //                   onChangeText={(value) => setEmail(value)}
  //                   placeholder="Email"
  //                   placeholderTextColor="#ADADAF"
  //                   style={{
  //                     backgroundColor: colors.forms,
  //                     color: colors.text,
  //                     paddingVertical: 15,
  //                     paddingHorizontal: 25,
  //                     width: 370,
  //                     height: 65,
  //                     borderRadius: 10,
  //                     marginVertical: 10,
  //                   }}
  //                 />
  //                 <TextInput
  //                   value={password}
  //                   onChangeText={(value) => setPassword(value)}
  //                   placeholder="Password"
  //                   placeholderTextColor="#ADADAF"
  //                   secureTextEntry={viewPassword ? false : true}
  //                   style={{
  //                     backgroundColor: colors.forms,
  //                     color: colors.text,
  //                     paddingVertical: 15,
  //                     paddingHorizontal: 25,
  //                     width: 370,
  //                     height: 65,
  //                     borderRadius: 10,
  //                     marginVertical: 10,
  //                   }}
  //                 />

  //                 {viewPassword ? (
  //                   <Ionicons
  //                     name="eye-off-outline"
  //                     color="#ADADAF"
  //                     size={15}
  //                     style={{bottom: 50, left: 330}}
  //                     onPress={() => setViewPassword(!viewPassword)}
  //                   />
  //                 ) : (
  //                   <Ionicons
  //                     name="eye-outline"
  //                     color="#ADADAF"
  //                     size={15}
  //                     style={{bottom: 50, left: 330}}
  //                     onPress={() => setViewPassword(!viewPassword)}
  //                   />
  //                 )}

  //                 <Button
  //                   onPress={() => {}}
  //                   content={
  //                     <Text style={{alignSelf: 'flex-end', color: colors.text}}>
  //                       Forgot Password ?
  //                     </Text>
  //                   }
  //                 />

  //                 <Button
  //                   onPress={() => {
  //                     email.length && password.length > 0
  //                       ? handleAuth()
  //                       : Alert.alert(
  //                           'Introduce un Correo y Contraseña Validos',
  //                         );
  //                   }}
  //                   content={
  //                     auth ? (
  //                       <Ionicons
  //                         name="checkmark-outline"
  //                         color="white"
  //                         size={30}
  //                       />
  //                     ) : authLoading ? (
  //                       <ActivityIndicator size="small" />
  //                     ) : (
  //                       <Text>Log in</Text>
  //                     )
  //                   }
  //                   styleBtn={{
  //                     backgroundColor: 'lightblue',
  //                     alignItems: 'center',
  //                     alignSelf: 'center',
  //                     paddingVertical: 20,
  //                     borderRadius: 10,
  //                     width: '95%',
  //                     marginTop: 30,
  //                   }}
  //                 />

  //                 <View
  //                   style={{
  //                     flexDirection: 'row',
  //                     justifyContent: 'center',
  //                     // backgroundColor: 'yellow',
  //                     marginTop: 40,
  //                   }}>
  //                   <Text style={{color: colors.text, marginRight: 4}}>
  //                     Don't have an account?
  //                   </Text>
  //                   <Button
  //                     onPress={() => {
  //                       signinrefBottomModal.current.open();
  //                     }}
  //                     content={<Text style={{color: 'purple'}}>Sign In</Text>}
  //                   />
  //                 </View>
  //               </View>
  //             </View>
  //           </View>
  //           {signinModal()}
  //         </View>
  //       }
  //     />
  //   );
  // };

  // const signinModal = () => {
  //   return (
  //     <BottomModal
  //       openModal={signinrefBottomModal}
  //       wrapperColor={colors.subModalWrapper}
  //       muchContent={true}
  //       customSize={true}
  //       sizeModal={840}
  //       borderRadiusTop={10}
  //       keyBoardPushContent={false}
  //       closeDragDown={false}
  //       content={
  //         <View style={{flexDirection: 'column'}}>
  //           <View
  //             style={{
  //               flexDirection: 'row',
  //               justifyContent: 'flex-end',
  //               // backgroundColor: 'red',
  //               padding: 15,
  //             }}>
  //             <AntDesign
  //               onPress={() => signinrefBottomModal.current.close()}
  //               name="close"
  //               color={colors.text}
  //               size={30}
  //             />
  //           </View>
  //           <View
  //             style={{
  //               // backgroundColor: 'blue',
  //               height: '87%',
  //               alignItems: 'center',
  //               justifyContent: 'center',
  //             }}>
  //             <View>
  //               <View
  //                 style={{
  //                   marginBottom: 50,
  //                   // backgroundColor: 'pink',
  //                   flexDirection: 'row',
  //                   alignItems: 'center',
  //                   justifyContent: 'center',
  //                 }}>
  //                 <Ionicons name="school" color={colors.text} size={45} />
  //                 <Text
  //                   style={{fontSize: 38, marginLeft: 4, fontWeight: 'bold'}}>
  //                   Skool
  //                 </Text>
  //               </View>

  //               <View>
  //                 <Input
  //                   formInput={true}
  //                   inputValue={name}
  //                   inputValueOnChange={(value) => setName(value)}
  //                   placeHolder="Name"
  //                 />
  //                 <Input
  //                   formInput={true}
  //                   inputValue={email}
  //                   inputValueOnChange={(value) => setEmail(value)}
  //                   placeHolder="Email"
  //                 />
  //                 <Input
  //                   formInput={true}
  //                   inputValue={userName}
  //                   inputValueOnChange={(value) => setUserName(value)}
  //                   placeHolder="Username"
  //                 />
  //                 <Input
  //                   formInput={true}
  //                   inputValue={password}
  //                   inputValueOnChange={(value) => setPassword(value)}
  //                   placeHolder="Password"
  //                   customSecureTextEntry={viewPassword ? false : true}
  //                 />

  //                 {viewPassword ? (
  //                   <Ionicons
  //                     name="eye-off-outline"
  //                     color="gray"
  //                     size={15}
  //                     style={{bottom: 50, left: 325}}
  //                     onPress={() => setViewPassword(!viewPassword)}
  //                   />
  //                 ) : (
  //                   <Ionicons
  //                     name="eye-outline"
  //                     color="gray"
  //                     size={15}
  //                     style={{bottom: 50, left: 325}}
  //                     onPress={() => setViewPassword(!viewPassword)}
  //                   />
  //                 )}

  //                 <Button
  //                   onPress={() => {
  //                     name.length &&
  //                     userName.length &&
  //                     email.length &&
  //                     password.length > 0
  //                       ? handleAuth()
  //                       : Alert.alert('Introduce Correo, Contraseña');
  //                   }}
  //                   content={
  //                     auth ? (
  //                       <AntDesign name="checkcircle" color="white" size={30} />
  //                     ) : authLoading ? (
  //                       <ActivityIndicator size="small" />
  //                     ) : (
  //                       <Text>Sign in</Text>
  //                     )
  //                   }
  //                   styleBtn={{
  //                     backgroundColor: 'lightblue',
  //                     alignItems: 'center',
  //                     alignSelf: 'center',
  //                     paddingVertical: 20,
  //                     borderRadius: 10,
  //                     width: '95%',
  //                     marginTop: 30,
  //                   }}
  //                 />

  //                 <View
  //                   style={{
  //                     flexDirection: 'row',
  //                     justifyContent: 'center',
  //                     // backgroundColor: 'yellow',
  //                     marginTop: 40,
  //                   }}>
  //                   <Text style={{marginRight: 4}}>Have an account?</Text>
  //                   <Button
  //                     onPress={() => signinrefBottomModal.current.close()}
  //                     content={<Text style={{color: 'purple'}}>Login</Text>}
  //                   />
  //                 </View>
  //               </View>
  //             </View>
  //           </View>
  //         </View>
  //       }
  //     />
  //   );
  // };

  useEffect(() => {
    getSettingsEncryptedData('userToken', (value) => {
      value ? setAuth(true) : setAuth(false);
      console.log('token_', value);
    });
    showAyncStorageData();
  }, [auth, setAuth]);

  return (
    <>
      {/* {customButton ? (
        <Button
          onPress={auth ? onPress : () => loginrefBottomModal.current.open()}
          content={customButton}
        />
      ) : (
        <Button
          onPress={auth ? onPress : () => loginrefBottomModal.current.open()}
          content={
            <AntDesign name="pluscircle" size={iconSize} color="#59EEFF" />
          }
        />
      )}
      {loginModal()} */}
      {customButton ? (
        <Button onPress={onPress} content={customButton} />
      ) : (
        <Button
          onPress={onPress}
          content={
            <AntDesign name="pluscircle" size={iconSize} color="#59EEFF" />
          }
        />
      )}
    </>
  );
};

export default AddButton;
