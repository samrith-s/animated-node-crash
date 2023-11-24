import { Animated, Platform } from "react-native";

import { StackCardInterpolatedStyle, StackCardInterpolationProps, StackNavigationOptions, TransitionPresets } from "@react-navigation/stack";

const { multiply } = Animated

export const STACK_SCREEN_OPTIONS: StackNavigationOptions = {
  headerMode: 'screen',
  ...TransitionPresets.SlideFromRightIOS,
  cardStyleInterpolator: Platform.select({
    default: TransitionPresets.SlideFromRightIOS.cardStyleInterpolator,
    android: customSlideTransition,
  }),
}

function customSlideTransition({
  current,
  next,
  inverted,
  layouts: {screen},
}: StackCardInterpolationProps): StackCardInterpolatedStyle {
  const translateFocused = multiply(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [screen.width - 0.5, 0],
      extrapolate: 'clamp',
    }),
    inverted,
  )

  const translateUnfocused = next
    ? multiply(
        next.progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -screen.width + 0.25],
          extrapolate: 'clamp',
        }),
        inverted,
      )
    : 0

  const overlayOpacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.07],
    extrapolate: 'clamp',
  })

  const shadowOpacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.3],
    extrapolate: 'clamp',
  })

  return {
    containerStyle: {
      transform: [
        // Translation for the animation of the current card
        {translateX: translateFocused},
        // Translation for the animation of the card on top of this
        {translateX: translateUnfocused},
      ],
    },
    overlayStyle: {opacity: overlayOpacity},
    shadowStyle: {shadowOpacity},
  }
}