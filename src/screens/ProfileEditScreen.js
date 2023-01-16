import React, { useState } from "react";
import { StyleSheet, KeyboardAvoidingView, platform } from "react-native";
import { TextInput, Button } from "react-native-paper";

export const ProfileEditScreen = () => {
  const [text, setText] = useState("");

  const onPressSave = () => {
    alert(text);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <TextInput
        style={{ marginBottom: 16 }}
        mode="outlined"
        placeholder="登録するメールアドレスを入力してください"
        multiline
        onChangeText={(text) => setText(text)}
      />
      <Button mode="contained" onPress={onPressSave} Ï>
        登録
      </Button>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});
