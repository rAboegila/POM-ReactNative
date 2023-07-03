//React + React Native Imports
import React, { useState } from "react";

//APIs Import

// UI Library and Elements Imports
import { Center, VStack, Button, FormControl, View } from "native-base";
import DropDownPicker from "react-native-dropdown-picker";

//Import Library Objects
import { INTERESTS } from "../../lib/enums";
import { toSentenceCase } from "../../lib/helpers";
//Components Imports
import FormInput from "./FormInput";
import CustomDatePicker from "../CustomDatePicker/component";
// External Style Sheet Import
// import styles from "./styles";

export default function ProfileInformationForm({ isEditing, setIsEditing }) {
  const profilePlaceholder = {
    firstName: "John",
    lastName: "Doe",
    email: "email@example.com",
    dob: "YYYY-MM-DD",
    interest: "Choose an interest",
  };

  //redux state
  const profileDefault = {
    firstName: "Rawan",
    lastName: "Aboegila",
    email: "rawan@example.com",
    dob: "2000-4-18",
    interest: "Skate",
  };

  //component inner state
  const [interestsOpen, setInterestsOpen] = useState(false);
  const [interestsValue, setInterestsValue] = useState(null);

  const [interests, setInterests] = useState([
    { label: toSentenceCase(INTERESTS.PARKOUR), value: INTERESTS.PARKOUR },
    { label: toSentenceCase(INTERESTS.SKATE), value: INTERESTS.SKATE },
    { label: toSentenceCase(INTERESTS.BOTH), value: INTERESTS.BOTH },
  ]);

  const [formData, setData] = useState({ ...profileDefault });
  const [errors, setErrors] = useState({});
  const [showDate, setShowDate] = useState(false);

  DropDownPicker.setListMode("SCROLLVIEW");
  const validate = () => {
    const validFirstName = validateItem("firstName", [
      {
        value: formData.firstName === undefined || formData.firstName === "",
        message: "First Name is required",
      },
      {
        value: formData.firstName.length < 3,
        message: "First Name is too short",
      },
    ]);
    const validLastName = validateItem("lastName", [
      {
        value: formData.lastName === undefined || formData.lastName === "",
        message: "Last Name is required",
      },
      {
        value: formData.lastName.length < 3,
        message: "last Name is too short",
      },
    ]);
    const validEmail = validateItem("email", [
      {
        value: formData.email === undefined || formData.email === "",
        message: "Email is required",
      },
      {
        value: !/\S+@\S+\.\S+/.test(formData.email),
        message: "Invalid Email",
      },
    ]);

    const validInterest = validateItem("interest", [
      { value: formData.interest === null, message: "Interest is required" },
    ]);

    if (validFirstName && validLastName && validEmail && validInterest) {
      setErrors({});
      return true;
    } else {
      return false;
    }
  };
  function validateItem(itemName, conditions) {
    for (const condition of conditions) {
      console.log("condition: ", condition);

      if (condition.value) {
        console.log(" errors >", errors);
        setErrors((prevErrors) => ({
          ...prevErrors,
          [itemName]: condition.message,
        }));

        return false;
      }
    }
    return true;
  }
  function onChangeHandler(inputIdentifier, enteredValue) {
    console.log("onChangeHandler: ", enteredValue);
    delete errors[inputIdentifier];
    return setData((currData) => {
      return { ...currData, [inputIdentifier]: enteredValue };
    });
  }

  const onChangeDateHandler = (event, selectedDate) => {
    // const currentDate = selectedDate;
    setShowDate(false);
    setData((currData) => {
      return { ...currData, ["dob"]: selectedDate };
    });
  };
  const toggleDatePicker = () => {
    console.log("toggleDatePicker");
    setShowDate((oldSate) => !oldSate);
  };
  const onSubmit = () => {
    console.log(formData);

    if (validate()) {
      console.log("Submitted");
      setIsEditing(false);
    } else {
      console.log("Validation Failed");
    }
  };
  const Update = () => {
    setIsEditing(true);
  };

  return (
    <Center>
      <VStack width="90%" mx="3" maxW="300px">
        <FormInput
          defaultValue={profileDefault ? profileDefault.firstName : ""}
          placeholder={profilePlaceholder.firstName}
          changeHandler={onChangeHandler.bind(this, "firstName")}
          label="First Name"
          isValid={"firstName" in errors}
          errorMessage={errors.firstName}
          defaultMessage="First Name should contain atleast 3 character."
          inputConfig={{
            isRequired: true,
            isInvalid: "firstName" in errors,
            isDisabled: !isEditing,
          }}
        />
        <FormInput
          defaultValue={profileDefault ? profileDefault.lastName : ""}
          placeholder={profilePlaceholder.lastName}
          changeHandler={onChangeHandler.bind(this, "lastName")}
          label="Last Name"
          isValid={"lastName" in errors}
          errorMessage={errors.lastName}
          defaultMessage="Last Name should contain atleast 3 character."
          inputConfig={{
            isRequired: true,
            isInvalid: "lastName" in errors,
            isDisabled: !isEditing,
          }}
        />
        <FormInput
          defaultValue={profileDefault ? profileDefault.email : ""}
          placeholder={profilePlaceholder.email}
          changeHandler={onChangeHandler.bind(this, "email")}
          label="Email"
          isValid={"email" in errors}
          errorMessage={errors.email}
          defaultMessage=""
          inputConfig={{
            isRequired: true,
            isInvalid: "email" in errors,
            isDisabled: !isEditing,
          }}
        />
        <CustomDatePicker
          show={showDate}
          date={new Date(formData.dob)}
          is24Hour={"false"}
          onChange={onChangeDateHandler}
          defaultValue={profileDefault ? profileDefault.dob : ""}
          placeholder={
            profileDefault ? profileDefault.dob : profilePlaceholder.dob
          }
          label="Date Of Birth"
          isValid={"dob" in errors}
          errorMessage={errors.dob}
          defaultMessage="Edit To Change Date"
          inputConfig={{
            isRequired: true,
            isInvalid: "dob" in errors,
            isDisabled: !isEditing,
          }}
          toggleDatePicker={toggleDatePicker}
        />
        <FormControl isRequired={true} isDisabled={!isEditing}>
          <FormControl.Label _text={{ color: "success.800", bold: true }}>
            Interests
          </FormControl.Label>
          <View>
            <DropDownPicker
              disabledStyle={{
                backgroundColor: "transparent",
                borderColor: "#a3a3a3",
                opacity: 0.25,
              }}
              textStyle={{
                fontSize: 12,
              }}
              open={interestsOpen}
              value={formData.interest}
              items={interests}
              setOpen={setInterestsOpen}
              setValue={setInterestsValue}
              setItems={setInterests}
              placeholder={
                profileDefault
                  ? profileDefault.interest
                  : profilePlaceholder.interest
              }
              onSelectItem={(value) => onChangeHandler("interest", value.value)}
              dropDownDirection="TOP"
              zIndex={3000}
              zIndexInverse={1000}
              disabled={!isEditing}
            />
          </View>
          {errors.interest ? (
            <FormControl.ErrorMessage>
              {errors.interest}
            </FormControl.ErrorMessage>
          ) : (
            <FormControl.HelperText
              _disabled={{
                display: "none",
              }}
            >
              Choose an interest
            </FormControl.HelperText>
          )}
        </FormControl>
        <Button
          onPress={onSubmit}
          mt="3"
          colorScheme={"success"}
          style={!isEditing ? { display: "none" } : {}}
        >
          Submit
        </Button>
      </VStack>
    </Center>
  );
}
