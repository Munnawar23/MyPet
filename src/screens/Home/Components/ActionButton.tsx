import React, { useRef } from 'react';
import { Pressable, Text, StyleSheet, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withDelay,
} from 'react-native-reanimated';
import Sound from 'react-native-sound';
import { scale, verticalScale } from 'react-native-size-matters';
import { theme } from '@/styles/theme';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

interface ActionButtonProps {
  label: string;
  icon: React.ReactNode;
  color: string;
  textColor?: string;
  onPress: () => void;
}

export default function ActionButton({ label, icon, color, textColor = theme.colors.card, onPress }: ActionButtonProps) {
  const scaleVal = useSharedValue(1);
  const pressStartTime = useRef(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scaleVal.value }],
    };
  });

  const handlePressIn = () => {
    pressStartTime.current = Date.now();
    scaleVal.value = withSpring(0.8, { damping: 15, stiffness: 300 });
  };

  const handlePressOut = () => {
    const duration = Date.now() - pressStartTime.current;
    const remainingTime = Math.max(0, 150 - duration);
    scaleVal.value = withDelay(
      remainingTime,
      withSpring(1, { damping: 15, stiffness: 300 })
    );
  };

  const handlePress = () => {
    // 1. Haptic feedback
    ReactNativeHapticFeedback.trigger('impactMedium', {
      enableVibrateFallback: true,
      ignoreAndroidSystemSettings: false,
    });

    // 2. Sound effect (button.mp3)
    const soundAsset = Image.resolveAssetSource(require('@/assets/sfx/button.mp3'));
    const clickSound = new Sound(soundAsset.uri, '', (error) => {
      if (!error) {
        clickSound.play(() => {
          clickSound.release();
        });
      } else {
        console.warn('Failed to load button sound:', error);
      }
    });

    // 3. Trigger parent callback
    onPress();
  };

  return (
    <Animated.View style={[styles.actionWrapper, animatedStyle]}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={handlePress}
        style={[styles.actionButton, { backgroundColor: color }]}
      >
        {icon}
        <Text style={[styles.actionLabel, { color: textColor }]}>{label}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  actionWrapper: {
    alignItems: 'center',
  },
  actionButton: {
    width: scale(105),
    height: scale(105),
    borderRadius: scale(32),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 4,
    borderColor: theme.colors.card,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  actionLabel: {
    fontFamily: theme.fontFamily.heading,
    fontSize: theme.fontSize.small,
    color: theme.colors.card,
    marginTop: verticalScale(4),
    textTransform: 'uppercase',
  },
});
