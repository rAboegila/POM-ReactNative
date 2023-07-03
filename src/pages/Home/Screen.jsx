import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DrawerRouter from "../../router/drawer";
import styles from "./styles";
//Redux
import { useDispatch } from "react-redux";
import { setAppLoading } from "../../redux/features/auth/authSlice";

export default function Home() {
  const dispatch = useDispatch();
  dispatch(setAppLoading(false));
  return <DrawerRouter />;
}
