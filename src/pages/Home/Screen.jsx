import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import DrawerRouter from "../../router/drawer";
import styles from "./styles";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { getSavedToken } from "../../lib/secureStorage";
import { setAppLoading } from "../../redux/features/auth/authSlice";
import { fetchProfile } from "../../redux/features/profile/profileSlice";
export default function Home() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProfile({ token: getSavedToken() }));
  }, []);
  dispatch(setAppLoading(false));
  return <DrawerRouter />;
}
