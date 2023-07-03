import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DrawerRouter from "../../router/drawer";
import styles from "./styles";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { setAppLoading } from "../../redux/features/auth/authSlice";
import { getSavedToken } from "../../lib/secureStorage";
export default function Home() {
  const dispatch = useDispatch();
  dispatch(setAppLoading(false));
  return <DrawerRouter />;
}
