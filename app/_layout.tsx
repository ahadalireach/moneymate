/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { Stack } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Text>_layout</Text>
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
