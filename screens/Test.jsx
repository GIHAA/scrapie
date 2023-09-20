import React, { Component } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, LayoutAnimation } from 'react-native';

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false, // Track whether the small box is expanded or not
    };
  }

  handleButtonPress = () => {
    // Enable layout animation
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    // Toggle the expansion state
    this.setState((prevState) => ({
      isExpanded: !prevState.isExpanded,
    }));
  }

  render() {
    const { isExpanded } = this.state;

    // Calculate the small box height based on the expansion state
    const smallBoxHeight = isExpanded ? 100 : 200;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={[styles.smallBox, { height: smallBoxHeight }]}>
          <TouchableOpacity style={styles.button} onPress={this.handleButtonPress}>
            <Text style={styles.buttonText}>Press Me</Text>
          </TouchableOpacity>
          <Text style={styles.buttonText}>Press Me</Text>
          <Text style={styles.buttonText}>Press Me</Text>
          <Text style={styles.buttonText}>Press Me</Text>
          <Text style={styles.buttonText}>Press Me</Text>
          <Text style={styles.buttonText}>Press Me</Text>
          <Text style={styles.buttonText}>Press Me</Text>
          </View>
        
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // Align content at the bottom
    alignItems: 'center',
  },
  content: {
    flex: 1, // Take up all available space within the container
    justifyContent: 'flex-end', // Align content at the bottom
    alignItems: 'center',
    marginBottom: 40
  },
  smallBox: {
    width: 100,
    backgroundColor: 'blue',
    alignItems: 'center',
    overflow: 'hidden', // Clip overflow when the height exceeds the container
  },
  button: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
    marginBottom: 16, // Add some margin to separate the button from the small box
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});
