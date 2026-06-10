import React from 'react';
import { StatusBar, StyleSheet, Text, View, ScrollView } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '@/styles/theme';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" backgroundColor={theme.colors.background} />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.heading}>Theme Test</Text>
          
          <View style={styles.card}>
            <Text style={styles.cardTitle}>Font Families</Text>
            
            <View style={styles.fontSection}>
              <Text style={styles.label}>LuckiestGuy-Regular (heading):</Text>
              <Text style={[styles.testText, { fontFamily: theme.fontFamily.heading, fontSize: theme.fontSize.heading }]}>
                Luckiest Guy!
              </Text>
            </View>

            <View style={styles.fontSection}>
              <Text style={styles.label}>Baloo2-Regular (body):</Text>
              <Text style={[styles.testText, { fontFamily: theme.fontFamily.body, fontSize: theme.fontSize.body }]}>
                Baloo 2 Regular is standard body font.
              </Text>
            </View>

            <View style={styles.fontSection}>
              <Text style={styles.label}>Baloo2-Bold (bodyBold):</Text>
              <Text style={[styles.testText, { fontFamily: theme.fontFamily.bodyBold, fontSize: theme.fontSize.button }]}>
                Baloo 2 Bold for buttons and highlights.
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>Color Palette</Text>
            <View style={styles.colorRow}>
              <View style={[styles.colorChip, { backgroundColor: theme.colors.primary }]} />
              <Text style={styles.colorText}>Primary: {theme.colors.primary}</Text>
            </View>
            <View style={styles.colorRow}>
              <View style={[styles.colorChip, { backgroundColor: theme.colors.accent }]} />
              <Text style={styles.colorText}>Accent: {theme.colors.accent}</Text>
            </View>
            <View style={styles.colorRow}>
              <View style={[styles.colorChip, { backgroundColor: theme.colors.secondary }]} />
              <Text style={styles.colorText}>Secondary: {theme.colors.secondary}</Text>
            </View>
            <View style={styles.colorRow}>
              <View style={[styles.colorChip, { backgroundColor: theme.colors.text }]} />
              <Text style={styles.colorText}>Text: {theme.colors.text}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    padding: 24,
    alignItems: 'stretch',
  },
  heading: {
    fontFamily: theme.fontFamily.heading,
    fontSize: theme.fontSize.heading,
    color: theme.colors.text,
    textAlign: 'center',
    marginBottom: 24,
  },
  card: {
    backgroundColor: theme.colors.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontFamily: theme.fontFamily.bodyBold,
    fontSize: theme.fontSize.title,
    color: theme.colors.text,
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingBottom: 4,
  },
  fontSection: {
    marginBottom: 16,
  },
  label: {
    fontFamily: theme.fontFamily.body,
    fontSize: theme.fontSize.small,
    color: theme.colors.subtext,
    marginBottom: 4,
  },
  testText: {
    color: theme.colors.text,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  colorChip: {
    width: 24,
    height: 24,
    borderRadius: 6,
    marginRight: 12,
  },
  colorText: {
    fontFamily: theme.fontFamily.body,
    fontSize: theme.fontSize.body,
    color: theme.colors.text,
  },
});

export default App;

