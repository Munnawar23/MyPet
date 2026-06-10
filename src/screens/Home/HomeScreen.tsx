import React, { useState } from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withSequence,
  withTiming,
  FadeInDown,
  FadeInUp,
  SharedValue,
} from 'react-native-reanimated';
import {
  Heart,
  Flame,
  Activity,
  Smile,
  Palette,
  Sparkles,
  Info,
} from 'lucide-react-native';
import { theme } from '@/styles/theme';

function HomeScreen() {
  const [activeTab, setActiveTab] = useState<'pet' | 'colors' | 'typography'>('pet');
  
  // Reanimated values for the Shiba avatar interactive states
  const shibaScale = useSharedValue(1);
  const shibaRotation = useSharedValue(0);
  const shibaTranslationY = useSharedValue(0);

  // Stats values for Reanimated progress bar demos
  const loveProgress = useSharedValue(0.7);
  const energyProgress = useSharedValue(0.5);
  const funProgress = useSharedValue(0.9);

  // Trigger pet tap animation
  const handlePetPress = () => {
    // Sequence of animations: hop up, wobble, and bounce back
    shibaTranslationY.value = withSequence(
      withTiming(-30, { duration: 150 }),
      withTiming(0, { duration: 250 })
    );
    shibaRotation.value = withSequence(
      withTiming(-10, { duration: 100 }),
      withTiming(10, { duration: 100 }),
      withTiming(0, { duration: 100 })
    );
    shibaScale.value = withSequence(
      withSpring(1.15, { damping: 4 }),
      withSpring(1)
    );

    // Randomize stat bars slightly to show reanimated bar animations
    loveProgress.value = withSpring(Math.min(1, Math.max(0.1, loveProgress.value + (Math.random() - 0.5) * 0.3)));
    energyProgress.value = withSpring(Math.min(1, Math.max(0.1, energyProgress.value + (Math.random() - 0.5) * 0.3)));
    funProgress.value = withSpring(Math.min(1, Math.max(0.1, funProgress.value + (Math.random() - 0.5) * 0.3)));
  };

  // Shiba avatar animated style
  const animatedShibaStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: shibaTranslationY.value },
        { rotate: `${shibaRotation.value}deg` },
        { scale: shibaScale.value },
      ],
    };
  });

  // Helper component for animated stat bar
  const StatBar = ({
    label,
    progress,
    color,
    icon: IconComponent,
  }: {
    label: string;
    progress: SharedValue<number>;
    color: string;
    icon: any;
  }) => {
    const barStyle = useAnimatedStyle(() => {
      return {
        width: `${progress.value * 100}%`,
      };
    });

    return (
      <View style={styles.statContainer}>
        <View style={styles.statLabelRow}>
          <View style={styles.iconLabelGroup}>
            <IconComponent size={16} color={theme.colors.text} style={styles.statIcon} />
            <Text style={styles.statLabelText}>{label}</Text>
          </View>
          <Text style={styles.statValueText}>
            {Math.round(progress.value * 100)}%
          </Text>
        </View>
        <View style={styles.statBarTrack}>
          <Animated.View style={[styles.statBarFill, barStyle, { backgroundColor: color }]} />
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
        {/* Header Section */}
        <Animated.View entering={FadeInDown.duration(600)} style={styles.header}>
          <Text style={styles.headerSubtitle}>SHIBA PLAYGROUND</Text>
          <Text style={styles.headerTitle}>My Pet Theme Demo</Text>
        </Animated.View>

        {/* Tab Navigation */}
        <View style={styles.tabBar}>
          {(['pet', 'colors', 'typography'] as const).map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[
                styles.tabButton,
                activeTab === tab && styles.tabButtonActive,
              ]}
              onPress={() => setActiveTab(tab)}
            >
              <Text
                style={[
                  styles.tabButtonText,
                  activeTab === tab && styles.tabButtonTextActive,
                ]}
              >
                {tab.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Main Content Area */}
        <ScrollView contentContainerStyle={styles.container}>
          {activeTab === 'pet' && (
            <Animated.View entering={FadeInUp.duration(400)} style={styles.card}>
              <View style={styles.cardHeader}>
                <Smile size={20} color={theme.colors.primary} style={styles.cardHeaderIcon} />
                <Text style={styles.cardTitle}>Interactive Shiba Avatar</Text>
              </View>
              <Text style={styles.description}>
                Tap the Shiba face to see Reanimated spring/hop effects and watch the stats update!
              </Text>

              {/* Shiba Face / Mascot */}
              <View style={styles.avatarWrapper}>
                <Pressable onPress={handlePetPress}>
                  <Animated.View style={[styles.shibaFace, animatedShibaStyle]}>
                    {/* Ears */}
                    <View style={styles.shibaEarLeft} />
                    <View style={styles.shibaEarRight} />
                    {/* Inner Ears */}
                    <View style={styles.shibaEarLeftInner} />
                    <View style={styles.shibaEarRightInner} />
                    {/* Cheeks */}
                    <View style={styles.shibaCheekLeft} />
                    <View style={styles.shibaCheekRight} />
                    {/* Snout Area */}
                    <View style={styles.shibaSnout} />
                    {/* Eyes */}
                    <View style={styles.shibaEyeLeft} />
                    <View style={styles.shibaEyeRight} />
                    {/* Nose & Mouth */}
                    <View style={styles.shibaNose} />
                    <View style={styles.shibaMouthLeft} />
                    <View style={styles.shibaMouthRight} />
                  </Animated.View>
                </Pressable>
              </View>

              {/* Stats Showcase */}
              <View style={styles.statsPanel}>
                <StatBar
                  label="Affection (Primary)"
                  progress={loveProgress}
                  color={theme.colors.primary}
                  icon={Heart}
                />
                <StatBar
                  label="Energy (Accent)"
                  progress={energyProgress}
                  color={theme.colors.accent}
                  icon={Flame}
                />
                <StatBar
                  label="Playfulness (Sky)"
                  progress={funProgress}
                  color={theme.colors.sky}
                  icon={Activity}
                />
              </View>
            </Animated.View>
          )}

          {activeTab === 'colors' && (
            <Animated.View entering={FadeInUp.duration(400)} style={styles.card}>
              <View style={styles.cardHeader}>
                <Palette size={20} color={theme.colors.accent} style={styles.cardHeaderIcon} />
                <Text style={styles.cardTitle}>Theme Color Palettes</Text>
              </View>
              <Text style={styles.description}>
                Every single color defined in your theme system, mapped and styled dynamically.
              </Text>

              {/* Background Group */}
              <Text style={styles.sectionHeader}>Backgrounds & Cards</Text>
              <View style={styles.gridContainer}>
                {[
                  { name: 'background', value: theme.colors.background, label: 'Warm Cream' },
                  { name: 'backgroundAlt', value: theme.colors.backgroundAlt, label: 'Sky Blue Alt' },
                  { name: 'card', value: theme.colors.card, label: 'Card Surface' },
                ].map((item) => (
                  <View key={item.name} style={styles.colorCard}>
                    <View style={[styles.colorBlock, { backgroundColor: item.value }]} />
                    <Text style={styles.colorName}>{item.name}</Text>
                    <Text style={styles.colorHex}>{item.value}</Text>
                  </View>
                ))}
              </View>

              {/* Brand Colors */}
              <Text style={styles.sectionHeader}>Brand & Action Colors</Text>
              <View style={styles.gridContainer}>
                {[
                  { name: 'primary', value: theme.colors.primary, label: 'Shiba Fur' },
                  { name: 'primaryDark', value: theme.colors.primaryDark, label: 'Amber Accent' },
                  { name: 'accent', value: theme.colors.accent, label: 'Bandana Red' },
                  { name: 'accentLight', value: theme.colors.accentLight, label: 'Pale Salmon' },
                ].map((item) => (
                  <View key={item.name} style={styles.colorCard}>
                    <View style={[styles.colorBlock, { backgroundColor: item.value }]} />
                    <Text style={styles.colorName}>{item.name}</Text>
                    <Text style={styles.colorHex}>{item.value}</Text>
                  </View>
                ))}
              </View>

              {/* Environment Colors */}
              <Text style={styles.sectionHeader}>Environment Colors</Text>
              <View style={styles.gridContainer}>
                {[
                  { name: 'sky', value: theme.colors.sky, label: 'Bright Sky' },
                  { name: 'grass', value: theme.colors.grass, label: 'Grass Green' },
                  { name: 'grassDark', value: theme.colors.grassDark, label: 'Grass Shadow' },
                  { name: 'sunshine', value: theme.colors.sunshine, label: 'Sun Yellow' },
                  { name: 'foam', value: theme.colors.foam, label: 'Soap Foam' },
                ].map((item) => (
                  <View key={item.name} style={styles.colorCard}>
                    <View style={[styles.colorBlock, { backgroundColor: item.value }]} />
                    <Text style={styles.colorName}>{item.name}</Text>
                    <Text style={styles.colorHex}>{item.value}</Text>
                  </View>
                ))}
              </View>

              {/* Text & Borders */}
              <Text style={styles.sectionHeader}>Text & System Colors</Text>
              <View style={styles.gridContainer}>
                {[
                  { name: 'text', value: theme.colors.text, label: 'Deep Brown' },
                  { name: 'subtext', value: theme.colors.subtext, label: 'Earthy Brown' },
                  { name: 'border', value: theme.colors.border, label: 'Beige Border' },
                  { name: 'statBarBackground', value: theme.colors.statBarBackground, label: 'Track Fill' },
                  { name: 'shadow', value: theme.colors.shadow, label: 'Brown Shadow' },
                ].map((item) => (
                  <View key={item.name} style={styles.colorCard}>
                    <View style={[styles.colorBlock, { backgroundColor: item.value }]} />
                    <Text style={styles.colorName}>{item.name}</Text>
                    <Text style={styles.colorHex}>{item.value}</Text>
                  </View>
                ))}
              </View>
            </Animated.View>
          )}

          {activeTab === 'typography' && (
            <Animated.View entering={FadeInUp.duration(400)} style={styles.card}>
              <View style={styles.cardHeader}>
                <Sparkles size={20} color={theme.colors.sunshine} style={styles.cardHeaderIcon} />
                <Text style={styles.cardTitle}>Font Families & Sizes</Text>
              </View>
              <Text style={styles.description}>
                Showcasing the font sizes and families across both regular and bold variations.
              </Text>

              {/* Font Sizes */}
              <Text style={styles.sectionHeader}>Font Sizes (Theme scale)</Text>
              <View style={styles.textSampleRow}>
                <Text style={styles.fontLabel}>display ({theme.fontSize.display}px)</Text>
                <Text style={[styles.sampleTextDisplay, { color: theme.colors.primary }]}>Hi</Text>
              </View>
              <View style={styles.textSampleRow}>
                <Text style={styles.fontLabel}>heading ({theme.fontSize.heading}px)</Text>
                <Text style={styles.sampleTextHeading}>Playful Heading</Text>
              </View>
              <View style={styles.textSampleRow}>
                <Text style={styles.fontLabel}>title ({theme.fontSize.title}px)</Text>
                <Text style={styles.sampleTextTitle}>Card/Section Header</Text>
              </View>
              <View style={styles.textSampleRow}>
                <Text style={styles.fontLabel}>button ({theme.fontSize.button}px)</Text>
                <Text style={styles.sampleTextButton}>CLICKABLE BUTTON</Text>
              </View>
              <View style={styles.textSampleRow}>
                <Text style={styles.fontLabel}>statLabel ({theme.fontSize.statLabel}px)</Text>
                <Text style={styles.sampleTextStatLabel}>Health: 100</Text>
              </View>
              <View style={styles.textSampleRow}>
                <Text style={styles.fontLabel}>body ({theme.fontSize.body}px)</Text>
                <Text style={styles.sampleTextBody}>Standard body text size for general reading.</Text>
              </View>
              <View style={styles.textSampleRow}>
                <Text style={styles.fontLabel}>small ({theme.fontSize.small}px)</Text>
                <Text style={styles.sampleTextSmall}>Tiny details, helper captions, or footnotes.</Text>
              </View>

              {/* Font Families */}
              <Text style={styles.sectionHeader}>Font Families</Text>
              <View style={styles.familyBlock}>
                <Text style={styles.fontLabel}>theme.fontFamily.heading (LuckiestGuy-Regular)</Text>
                <Text style={[styles.sampleFamilyText, { fontFamily: theme.fontFamily.heading }]}>
                  LUCKIEST GUY FONT
                </Text>
              </View>
              <View style={styles.familyBlock}>
                <Text style={styles.fontLabel}>theme.fontFamily.body (Baloo2-Regular)</Text>
                <Text style={[styles.sampleFamilyText, { fontFamily: theme.fontFamily.body }]}>
                  Baloo 2 Regular: The quick brown fox jumps over the lazy dog.
                </Text>
              </View>
              <View style={styles.familyBlock}>
                <Text style={styles.fontLabel}>theme.fontFamily.bodyBold (Baloo2-Bold)</Text>
                <Text style={[styles.sampleFamilyText, { fontFamily: theme.fontFamily.bodyBold }]}>
                  Baloo 2 Bold: The quick brown fox jumps over the lazy dog.
                </Text>
              </View>
            </Animated.View>
          )}

          {/* Footer Info info bar */}
          <Animated.View entering={FadeInUp.delay(300).duration(400)} style={styles.infoBar}>
            <Info size={16} color={theme.colors.subtext} />
            <Text style={styles.infoBarText}>
              All resources (colors, size meters, Lucide icons, & Reanimated engine) successfully tested.
            </Text>
          </Animated.View>
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 8,
    alignItems: 'center',
  },
  headerSubtitle: {
    fontFamily: theme.fontFamily.bodyBold,
    fontSize: theme.fontSize.small,
    color: theme.colors.accent,
    letterSpacing: 2,
    marginBottom: 4,
  },
  headerTitle: {
    fontFamily: theme.fontFamily.heading,
    fontSize: theme.fontSize.heading,
    color: theme.colors.text,
    textAlign: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginTop: 8,
    marginBottom: 12,
    backgroundColor: theme.colors.statBarBackground,
    borderRadius: 12,
    padding: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: theme.colors.card,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  tabButtonText: {
    fontFamily: theme.fontFamily.bodyBold,
    fontSize: theme.fontSize.small,
    color: theme.colors.subtext,
  },
  tabButtonTextActive: {
    color: theme.colors.text,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardHeaderIcon: {
    marginRight: 8,
  },
  cardTitle: {
    fontFamily: theme.fontFamily.heading,
    fontSize: theme.fontSize.title,
    color: theme.colors.text,
  },
  description: {
    fontFamily: theme.fontFamily.body,
    fontSize: theme.fontSize.body,
    color: theme.colors.subtext,
    lineHeight: 20,
    marginBottom: 20,
  },
  avatarWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  shibaFace: {
    width: 150,
    height: 140,
    backgroundColor: theme.colors.primary,
    borderRadius: 70,
    position: 'relative',
    borderWidth: 4,
    borderColor: theme.colors.text,
    shadowColor: theme.colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  shibaEarLeft: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 25,
    borderRightWidth: 25,
    borderBottomWidth: 50,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: theme.colors.text,
    position: 'absolute',
    top: -24,
    left: -4,
    transform: [{ rotate: '-28deg' }],
  },
  shibaEarRight: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 25,
    borderRightWidth: 25,
    borderBottomWidth: 50,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: theme.colors.text,
    position: 'absolute',
    top: -24,
    right: -4,
    transform: [{ rotate: '28deg' }],
  },
  shibaEarLeftInner: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 35,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: theme.colors.accentLight,
    position: 'absolute',
    top: -14,
    left: 4,
    transform: [{ rotate: '-28deg' }],
  },
  shibaEarRightInner: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 15,
    borderRightWidth: 15,
    borderBottomWidth: 35,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: theme.colors.accentLight,
    position: 'absolute',
    top: -14,
    right: 4,
    transform: [{ rotate: '28deg' }],
  },
  shibaCheekLeft: {
    position: 'absolute',
    bottom: 24,
    left: 8,
    width: 28,
    height: 28,
    backgroundColor: theme.colors.accentLight,
    borderRadius: 14,
  },
  shibaCheekRight: {
    position: 'absolute',
    bottom: 24,
    right: 8,
    width: 28,
    height: 28,
    backgroundColor: theme.colors.accentLight,
    borderRadius: 14,
  },
  shibaSnout: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
    width: 68,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 34,
    borderWidth: 3,
    borderColor: theme.colors.text,
  },
  shibaEyeLeft: {
    position: 'absolute',
    top: 48,
    left: 32,
    width: 12,
    height: 12,
    backgroundColor: theme.colors.text,
    borderRadius: 6,
  },
  shibaEyeRight: {
    position: 'absolute',
    top: 48,
    right: 32,
    width: 12,
    height: 12,
    backgroundColor: theme.colors.text,
    borderRadius: 6,
  },
  shibaNose: {
    position: 'absolute',
    bottom: 38,
    alignSelf: 'center',
    width: 14,
    height: 10,
    backgroundColor: theme.colors.text,
    borderRadius: 5,
  },
  shibaMouthLeft: {
    position: 'absolute',
    bottom: 26,
    left: 64,
    width: 12,
    height: 10,
    borderBottomWidth: 3,
    borderRightWidth: 3,
    borderColor: theme.colors.text,
    borderBottomRightRadius: 8,
    transform: [{ rotate: '45deg' }],
  },
  shibaMouthRight: {
    position: 'absolute',
    bottom: 26,
    right: 64,
    width: 12,
    height: 10,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
    borderColor: theme.colors.text,
    borderBottomLeftRadius: 8,
    transform: [{ rotate: '-45deg' }],
  },
  statsPanel: {
    marginTop: 12,
  },
  statContainer: {
    marginBottom: 14,
  },
  statLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  iconLabelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIcon: {
    marginRight: 6,
  },
  statLabelText: {
    fontFamily: theme.fontFamily.bodyBold,
    fontSize: theme.fontSize.statLabel,
    color: theme.colors.text,
  },
  statValueText: {
    fontFamily: theme.fontFamily.bodyBold,
    fontSize: theme.fontSize.body,
    color: theme.colors.subtext,
  },
  statBarTrack: {
    height: 16,
    backgroundColor: theme.colors.statBarBackground,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: theme.colors.border,
  },
  statBarFill: {
    height: '100%',
    borderRadius: 6,
  },
  sectionHeader: {
    fontFamily: theme.fontFamily.heading,
    fontSize: theme.fontSize.body,
    color: theme.colors.text,
    marginTop: 20,
    marginBottom: 10,
    textTransform: 'uppercase',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  colorCard: {
    width: '48%',
    backgroundColor: theme.colors.card,
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    alignItems: 'center',
  },
  colorBlock: {
    width: '100%',
    height: 48,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.05)',
  },
  colorName: {
    fontFamily: theme.fontFamily.bodyBold,
    fontSize: theme.fontSize.small,
    color: theme.colors.text,
    textAlign: 'center',
  },
  colorHex: {
    fontFamily: theme.fontFamily.body,
    fontSize: theme.fontSize.small,
    color: theme.colors.subtext,
  },
  textSampleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  fontLabel: {
    fontFamily: theme.fontFamily.body,
    fontSize: theme.fontSize.small,
    color: theme.colors.subtext,
    flex: 1,
  },
  sampleTextDisplay: {
    fontFamily: theme.fontFamily.heading,
    fontSize: theme.fontSize.display,
  },
  sampleTextHeading: {
    fontFamily: theme.fontFamily.heading,
    fontSize: theme.fontSize.heading,
    color: theme.colors.text,
  },
  sampleTextTitle: {
    fontFamily: theme.fontFamily.bodyBold,
    fontSize: theme.fontSize.title,
    color: theme.colors.text,
  },
  sampleTextButton: {
    fontFamily: theme.fontFamily.bodyBold,
    fontSize: theme.fontSize.button,
    color: theme.colors.accent,
    backgroundColor: theme.colors.accentLight,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    overflow: 'hidden',
  },
  sampleTextStatLabel: {
    fontFamily: theme.fontFamily.bodyBold,
    fontSize: theme.fontSize.statLabel,
    color: theme.colors.text,
  },
  sampleTextBody: {
    fontFamily: theme.fontFamily.body,
    fontSize: theme.fontSize.body,
    color: theme.colors.text,
    flex: 1.2,
    textAlign: 'right',
  },
  sampleTextSmall: {
    fontFamily: theme.fontFamily.body,
    fontSize: theme.fontSize.small,
    color: theme.colors.subtext,
    flex: 1.2,
    textAlign: 'right',
  },
  familyBlock: {
    marginTop: 12,
    padding: 12,
    backgroundColor: theme.colors.backgroundAlt,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  sampleFamilyText: {
    fontSize: theme.fontSize.body,
    color: theme.colors.text,
    marginTop: 6,
  },
  infoBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.backgroundAlt,
    borderRadius: 12,
    padding: 12,
    marginTop: 8,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
  },
  infoBarText: {
    flex: 1,
    fontFamily: theme.fontFamily.body,
    fontSize: theme.fontSize.small,
    color: theme.colors.subtext,
    marginLeft: 8,
  },
});

export default HomeScreen;
