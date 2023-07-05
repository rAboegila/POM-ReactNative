import { View, Text ,Image,Center,Modal} from "react-native";
import React from "react";

export default function NewsModal({
  title,
  body,
  imageUrl,
  showModal,
  closeModal,
}) {
  return (
    <Center>
      <Modal
        isOpen={showModal}
        onClose={closeModal}
        _backdrop={{
          _dark: {
            bg: "coolGray.800",
          },
          bg: "warmGray.50",
        }}
      >
        <Modal.Content maxWidth="350" maxH="212">
          <Modal.CloseButton />
          <Modal.Header>{title}</Modal.Header>
          <Modal.Body>
            <Text style={styles.body}>{body}</Text>
            <Image source={imageUrl} alt="image alt" />
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
