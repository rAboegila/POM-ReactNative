//React + React Native Imports
import React, { useState } from "react";

// UI Library and Elements Imports
import { FormControl, Input } from "native-base";

//Components Imports

// External Style Sheet Import
import styles from "./styles";

export default function FormInput({
  inputConfig,
  placeholder,
  defaultValue,
  changeHandler,
  label,
  isValid,
  errorMessage,
  defaultMessage,
  formData,
}) {
  return (
    <FormControl {...inputConfig}>
      <FormControl.Label
        _text={{
          bold: true,
          color: "success.800",
        }}
      >
        {label}
      </FormControl.Label>
      <Input
        placeholder={placeholder}
        onChangeText={changeHandler}
        defaultValue={defaultValue}
      />
      {isValid ? (
        <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
      ) : (
        <FormControl.HelperText
          _disabled={{
            display: "none",
          }}
        >
          {defaultMessage}
        </FormControl.HelperText>
      )}
    </FormControl>
  );
}
