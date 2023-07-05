import * as SecureStore from "expo-secure-store";
export async function saveToken(value) {
  await SecureStore.setItemAsync("token", value);
}
export async function getSavedToken() {
  const token = await SecureStore.getItemAsync("token");
  if (token) {
    // console.log("Saved token > ", token);
    return token;
  } else return null;
}
export async function deleteSavedToken() {
  await SecureStore.deleteItemAsync("token");
}
