import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button } from 'native-base';

export default class CustomButton extends React.Component {

  constructor(props) {
    super(props);
	}

  pressCustomButton(){
    this.props.onPressCustomButton();
  }

  render() {
    return (
      <Button block primary onPress={ () => this.pressCustomButton() }>
        <Text style={styles.button}>
          Press it to send message
        </Text>
      </Button>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    color: "#ffffff"
  },
});
