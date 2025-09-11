import { Stack } from "expo-router";
import { AuthProvider } from "../contexts/authContext";

const StackLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(modals)/ProfileModal"
        options={{
          presentation: "modal",
        }}
      />
      <Stack.Screen
        name="(modals)/WalletModal"
        options={{
          presentation: "modal",
        }}
      />
    </Stack>
  );
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <StackLayout />
    </AuthProvider>
  );
}
