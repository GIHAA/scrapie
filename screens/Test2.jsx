import React, { useState, useEffect } from "react";
import { View } from "react-native";
import * as Animatable from "react-native-animatable";

const App = () => {
  const quotes = [
    "Did you know that recycling one aluminum can saves enough energy to run a TV for three hours?",
    "Did you know that recycling paper saves trees? One ton of recycled paper can save 17 trees",
    "Did you know that recycling glass reduces air pollution by 20% and water pollution by 50%",
    "Did you know that recycling 100 pounds of steel can save enough energy to power a home for two months"
  ];

  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentQuoteIndex((currentQuoteIndex + 1) % quotes.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [currentQuoteIndex]);

  return (
    <View>
      <Animatable.Text
        animation="fadeIn"
        duration={1000}
        iterationCount={1}
        style={{
          fontSize: 16,
          textAlign: "center"
        }}
      >
        {quotes[currentQuoteIndex]}
      </Animatable.Text>
    </View>
  );
};

export default App;
