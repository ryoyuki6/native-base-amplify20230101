import React, {useState, useEffect} from "react";
import { NativeBaseProvider, Text, Box } from "native-base";

import { Button } from "react-native";

import { API, Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";

import { listPeople } from './src/graphql/queries';

import awsExports from "./src/aws-exports";
Amplify.configure(awsExports);

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}

function TopPage() {
  const [data1,setData1] = useState([]);

  useEffect(() => {
    fetchData1();
  }, []);

  async function fetchData1() {
    const apiData = await API.graphql({ query: listPeople});
    setData1(apiData.data.listPeople.items);
  }

  console.log(data1);

  return (
    <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
      <Text>Hello Native Base !!!</Text>
      <SignOutButton />
    </Box>
  );
}


function App() {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <NativeBaseProvider>
          <TopPage />
        </NativeBaseProvider>
      </Authenticator>
    </Authenticator.Provider>
  );
}
export default App;
