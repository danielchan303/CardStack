import * as React from "react";
import { Animated, Dimensions, View, StyleSheet } from "react-native";

interface CardStackProps {
  cards: object[];
}

const screenWidth = Dimensions.get("window").width;

const CardStack = (props: CardStackProps) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;

  return (
    <View
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
      }}
    >
      <Animated.ScrollView
        horizontal
        disableIntervalMomentum
        showsHorizontalScrollIndicator={false}
        snapToInterval={Dimensions.get("window").width}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
      >
        {props.cards.map((card, index) => {
          const opacity = scrollX.interpolate({
            inputRange: [
              (index - 1) * screenWidth,
              index * screenWidth,
              (index + 1) * screenWidth,
            ],
            outputRange: [0.5, 1, 0],
            extrapolate: "clamp",
          });

          const translateY = scrollX.interpolate({
            inputRange: [-1, index * screenWidth],
            outputRange: [0, index * 10],
            extrapolate: "clamp",
          });

          const translateX = scrollX.interpolate({
            inputRange: [
              (index - 1) * screenWidth,
              index * screenWidth,
              (index + 1) * screenWidth,
            ],
            outputRange: [0, -index * 10, -screenWidth],
            extrapolate: "clamp",
          });

          return (
            <Animated.View
              style={{
                width: Dimensions.get("window").width,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 30,
                elevation: props.cards.length - index,
                zIndex: props.cards.length - index,
                opacity: opacity,
                left: -index * screenWidth + index * 10,
                top: index * -10,
                transform: [
                  { translateY: translateY },
                  { translateX: Animated.add(scrollX, translateX) },
                ],
              }}
            >
              <View style={{ width: Dimensions.get("window").width * 0.9 }}>
                {card}
              </View>
            </Animated.View>
          );
        })}
      </Animated.ScrollView>
    </View>
  );
};

export default CardStack;

const styles = StyleSheet.create({
  container: {},
});
