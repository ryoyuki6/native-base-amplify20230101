import React, { useState, useEffect } from "react";
import { NativeBaseProvider, Text, Box, VStack, Stack } from "native-base";

import { Button } from "react-native";

import { API, Amplify, graphqlOperation } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";

import { listPeople } from "./src/graphql/queries";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

import awsExports from "./src/aws-exports";
Amplify.configure(awsExports);

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}

function HomeScreen() {
  const navigation = useNavigation();
  const { user, signOut } = useAuthenticator((context) => [context.user])

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
          <Button
            title="Profileへ"
            onPress={() => navigation.navigate("Profile")}
          />
          <SignOutButton />
        </VStack>
      </Box>
    </NativeBaseProvider>
  );
}

function ProfileScreen() {
  const [data1, setData1] = useState([]);
  const { user, signOut } = useAuthenticator((context) => [context.user])

  useEffect(() => {
    fetchData1();
  }, []);

  async function fetchData1() {
    const opt = {
      filter: {name: {eq: user.username}},
    };
    API.graphql(graphqlOperation(listPeople,opt)).then(values=> {
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

const Stack2 = createStackNavigator();

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <NavigationContainer>
          <Stack2.Navigator initialRouteName="Home">
            <Stack2.Screen name="Home" component={HomeScreen} />
            <Stack2.Screen name="Profile" component={ProfileScreen} />
          </Stack2.Navigator>
        </NavigationContainer>
      </Authenticator>
    </Authenticator.Provider>
  );
}

export default App;
