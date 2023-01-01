import React from "react";
import { NativeBaseProvider, Text, Box } from "native-base";

import { Button } from "react-native";

import { Amplify } from "aws-amplify";
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react-native";

import awsExports from "./src/aws-exports";
Amplify.configure(awsExports);

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}

function App() {
  return (
    <Authenticator.Provider>
      <Authenticator>
        <NativeBaseProvider>
          <Box flex={1} bg="#fff" alignItems="center" justifyContent="center">
            <Text>Hello NativeBase !!!</Text>
            <SignOutButton />
          </Box>
        </NativeBaseProvider>
      </Authenticator>
    </Authenticator.Provider>
  );
}
export default App;
