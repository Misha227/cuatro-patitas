import React, { useEffect } from 'react';
import { StyleSheet, Dimensions, Image, StatusBar, Platform } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withSpring,
  withTiming,
  withDelay,
  Easing,
  runOnJS,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

interface AnimatedSplashProps {
  onAnimationComplete: () => void;
}

export const AnimatedSplash: React.FC<AnimatedSplashProps> = ({ onAnimationComplete }) => {
  // Animation shared values
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(50);
  const backgroundOpacity = useSharedValue(1);

  useEffect(() => {
    // Initial entrance animation
    opacity.value = withTiming(1, {
      duration: 800,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });
    
    translateY.value = withTiming(0, {
      duration: 800,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    // Logo scale animation
    scale.value = withSequence(
      withTiming(1.2, {
        duration: 600,
        easing: Easing.bezier(0.34, 1.56, 0.64, 1),
      }),
      withSpring(1, {
        damping: 12,
        stiffness: 100,
        mass: 0.5,
      })
    );

    // Exit animation
    const timeoutId = setTimeout(() => {
      scale.value = withSequence(
        withSpring(1.1, {
          damping: 14,
          stiffness: 100,
        }),
        withTiming(0.8, {
          duration: 300,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        })
      );
      
      opacity.value = withDelay(
        200,
        withTiming(0, {
          duration: 500,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        })
      );
      
      backgroundOpacity.value = withDelay(
        400,
        withTiming(0, {
          duration: 800,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        }, () => {
          runOnJS(onAnimationComplete)();
        })
      );
    }, 2200);

    return () => clearTimeout(timeoutId);
  }, []);

  const containerStyle = useAnimatedStyle(() => ({
    opacity: backgroundOpacity.value,
  }));

  const logoStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateY: translateY.value },
    ],
    opacity: opacity.value,
  }));

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <StatusBar hidden />
      <Animated.View style={[styles.logoContainer, logoStyle]}>
        <Image
          source={require('../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width,
    height: height,
    backgroundColor: '#FFFFFF', // Clean white background
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 999,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
      },
      android: {
        elevation: 8,
      },
    }),
  },
  logo: {
    width: width * 0.45, // Slightly smaller logo
    height: width * 0.45,
  },
});