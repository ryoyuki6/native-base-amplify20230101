import React, { useState, useEffect } from "react";
import {
  NativeBaseProvider,
  Text,
  Box,
  VStack,
  Stack,
  Button
} from "native-base";

import { API, Amplify, graphqlOperation } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";

import { listPeople } from "./src/graphql/queries";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import awsExports from "./src/aws-exports";
Amplify.configure(awsExports);

import { ProfileEditScreen } from './src/screens/ProfileEditScreen';

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button onPress={signOut}>Sign Out</Button>;
}

function HomeScreen() {
  const navigation = useNavigation();
  const { user, signOut } = useAuthenticator((context) => [context.user]);

  return (
    <NativeBaseProvider>
      {/* <Box flex={1} bg="#fff" alignItems="center" justifyContent="center"> */}
      <Box
        bg="primary.500"
        py="4"
        px="3"
        borderRadius="5"
        rounded="md"
        alignSelf="center"
        justifyContent="center"
      >
        <VStack space="2" alignSelf="center">
          <Text fontSize="sm" color="white">
            {`Welcome, ${user.username} !!!`}
          </Text>
          <Button onPress={() => navigation.navigate("Profile")}>Profileへ</Button>
          <SignOutButton />
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}

function ProfileScreen() {
  const [data1, setData1] = useState([]);
  const { user, signOut } = useAuthenticator((context) => [context.user]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchData1();
  }, []);

  async function fetchData1() {
    const opt = {
      filter: { name: { eq: user.username } },
    };
    API.graphql(graphqlOperation(listPeople, opt)).then((values) => {
      setData1(values.data.listPeople.items);
    });
  }

  console.log(data1);

  function DisplayData0() {
    if (typeof data1[0] !== "undefined") {
      return (
        <>
          <Text fontSize="sm" color="white">
            Name : {data1[0].name}
          </Text>
          <Text fontSize="sm" color="white">
            Age : {data1[0].age}
          </Text>
          <Text fontSize="sm" color="white">
            Email : {data1[0].email}
          </Text>
          <Text fontSize="sm" color="white">
            Tel : {data1[0].tel}
          </Text>
          <Button onPress={() => navigation.navigate("ProfileEdit")}>Profile編集画面へ</Button>
        </>
      );
    }
  }

  return (
    <NativeBaseProvider>
      <Box
        bg="primary.500"
        py="4"
        px="3"
        borderRadius="5"
        rounded="md"
        alignSelf="center"
        justifyContent="center"
      >
        <VStack space="2" alignSelf="center">
          <Text fontSize="sm" color="white">
            Profile
          </Text>
          <DisplayData0 />
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}

// function ProfileEditScreen () {
//   const [ text, setText ] = useState('');

//   const onPressSave = () => {
//       alert(text);
//   }

//   return (
//       <KeyboardAvoidingView
//           style={styles.container}
//       >
//           <TextInput 
//               style={{ marginBottom: 16 }}
//               mode="outlined"
//               placeholder="メモを入力してください！！！"
//               multiline
//               onChangeText={(text) => setText(text)}
//           />
//           <Button
//               mode="contained"
//               onPress={onPressSave}
//           >
//               保存！！！
//           </Button>
//       </KeyboardAvoidingView>
//   )
// };

// const styles = StyleSheet.create({
//   container: {
//       flex: 1,
//       padding: 16,
//   },
// });

// function ProfileEditScreen() {

//   return (
//     <NativeBaseProvider>
//       <Box
//         bg="primary.500"
//         py="4"
//         px="3"
//         borderRadius="5"
//         rounded="md"
//         alignSelf="center"
//         justifyContent="center"
//       >
//         <VStack space="2" alignSelf="center">
//           <Text fontSize="sm" color="white">
//             Profile2
//           </Text>
//           {/* <DisplayData0 /> */}
//         </VStack>
//       </Box>
//     </NativeBaseProvider>
//   );
// }

// function ProfileEditScreen() {
  // const [data1, setData1] = useState([]);
  // const { user, signOut } = useAuthenticator((context) => [context.user]);
  // const [text, setText] = useState("入力文字が表示されます");

  // useEffect(() => {
  //   fetchData1();
  // }, []);

  // async function fetchData1() {
  //   const opt = {
  //     filter: { name: { eq: user.username } },
  //   };
  //   API.graphql(graphqlOperation(listPeople, opt)).then((values) => {
  //     setData1(values.data.listPeople.items);
  //   });
  // }

  // console.log(data1);

  // const onPressSave = () => {
  //   console.log(text);
  // };

  // function DisplayData0() {
  //   if (typeof data1[0] !== "undefined") {
  //     return (
  //       <>
  //         <Text fontSize="sm" color="white">
  //           Email, {text}
  //         </Text>
  //         <TextInput
  //           style={{ marginBottom: 16}}
  //           mode="outlined"
  //           placeholder={data1[0].email}
  //           multiline
  //           // onChangeText={t => setText(t)}
  //           onChangeText={setText}
  //         />
  //         <Button onPress={onPressSave} mode="contained">save</Button>
  //       </>
  //     );
  //   }
  // }

  // return (
  //   <NativeBaseProvider>
  //     <Box
  //       bg="primary.500"
  //       py="4"
  //       px="3"
  //       borderRadius="5"
  //       rounded="md"
  //       alignSelf="center"
  //       justifyContent="center"
  //       w={300}
  //     >
  //       <VStack space="2" alignSelf="center">
  //         <Text fontSize="sm" color="white">
  //           Profile
  //         </Text>
  //         <DisplayData0 />
  //       </VStack>
  //     </Box>
  //   </NativeBaseProvider>
  // );
// }

const Stack2 = createStackNavigator();

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <NavigationContainer>
          <Stack2.Navigator initialRouteName="Home">
            <Stack2.Screen name="Home" component={HomeScreen} />
            <Stack2.Screen name="Profile" component={ProfileScreen} />
            <Stack2.Screen name="ProfileEdit" component={ProfileEditScreen} />
          </Stack2.Navigator>
        </NavigationContainer>
      </Authenticator>
    </Authenticator.Provider>
  );
}

export default App;
