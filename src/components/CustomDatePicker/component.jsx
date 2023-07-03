//React + React Native Imports
import React, { useState } from "react";

//APIs Import
import DateTimePicker from "@react-native-community/datetimepicker";

// UI Library and Elements Imports
import { Center, VStack, Button, FormControl, Input } from "native-base";
import DropDownPicker from "react-native-dropdown-picker";

//Import Library Objects
import { INTERESTS } from "../../lib/enums";
import { toSentenceCase } from "../../lib/helpers";
//Components Imports

// External Style Sheet Import
// import styles from "./styles";

export default function CustomDatePicker({
  toggleDatePicker,
  show,
  date,
  onChange,
  is24Hour,
  inputConfig,
  placeholder,
  defaultValue,
  label,
  isValid,
  errorMessage,
  defaultMessage,
}) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  const maximumYear = new Date().getFullYear() - 10;
  const maximumDate_10 = new Date("31-12-0000");
  maximumDate_10.setFullYear(maximumYear);

  return (
    <>
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
          value={date.toLocaleDateString(undefined, options)}
          type="text"
          placeholder={placeholder}
          defaultValue={defaultValue}
          InputRightElement={
            <Button
              colorScheme={"success"}
              size="xs"
              rounded="none"
              w="1/6"
              h="full"
              onPress={toggleDatePicker}
            >
              {show ? "" : "Edit"}
            </Button>
          }
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
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={"date"}
          is24Hour={is24Hour}
          onChange={onChange}
          maximumDate={maximumDate_10}
        />
      )}
    </>
  );
}
