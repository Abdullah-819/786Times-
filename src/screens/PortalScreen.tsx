import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as WebBrowser from 'expo-web-browser';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { theme } from '../theme';

const PORTAL_URL = 'https://swl-sis.comsats.edu.pk/Login';

interface PortalScreenProps {
    navigation: any;
}

const PortalScreen: React.FC<PortalScreenProps> = ({ navigation }) => {
    const openPortal = () => {
        WebBrowser.openBrowserAsync(PORTAL_URL);
    };

    useEffect(() => {
        openPortal();
    }, []);

    const handleGoBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <LinearGradient
                colors={theme.colors.gradients.professional}
                style={StyleSheet.absoluteFill}
            />

            <SafeAreaView style={styles.safeArea}>
                <BlurView intensity={20} tint="dark" style={styles.header}>
                    <TouchableOpacity
                        style={styles.headerButton}
                        onPress={handleGoBack}
                        activeOpacity={0.7}
                    >
                        <Ionicons name="chevron-back" size={24} color="#EAB308" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Academic Portal</Text>

                    <View style={styles.headerButton} />
                </BlurView>

                <View style={styles.contentContainer}>
                    <View style={styles.iconContainer}>
                        <Ionicons name="globe-outline" size={80} color="#EAB308" />
                    </View>

                    <Text style={styles.title}>Secure Portal Access</Text>
                    <Text style={styles.description}>
                        Launching the COMSATS SIS portal in a secure system-encrypted tab to ensure your login credentials are protected and bypass connectivity restrictions.
                    </Text>

                    <TouchableOpacity style={styles.launchButton} onPress={openPortal}>
                        <LinearGradient
                            colors={['#EAB308', '#CA8A04']}
                            style={styles.gradientButton}
                        >
                            <Text style={styles.launchButtonText}>Re-launch Portal</Text>
                            <Ionicons name="open-outline" size={20} color="#002E5D" />
                        </LinearGradient>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.backLink} onPress={handleGoBack}>
                        <Text style={styles.backLinkText}>Return to Dashboard</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
        marginHorizontal: 16,
        marginTop: 10,
        borderRadius: 16,
        overflow: 'hidden',
    },
    headerButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerTitle: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: '700',
        letterSpacing: 0.5,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 32,
    },
    iconContainer: {
        width: 140,
        height: 140,
        borderRadius: 70,
        backgroundColor: 'rgba(234, 179, 8, 0.1)',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
        color: '#FFFFFF',
        textAlign: 'center',
        marginBottom: 16,
    },
    description: {
        fontSize: 15,
        color: 'rgba(255, 255, 255, 0.6)',
        textAlign: 'center',
        lineHeight: 22,
        marginBottom: 40,
    },
    launchButton: {
        width: '100%',
        borderRadius: 16,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
    },
    gradientButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        gap: 8,
    },
    launchButtonText: {
        color: '#002E5D',
        fontSize: 16,
        fontWeight: '800',
    },
    backLink: {
        marginTop: 24,
        padding: 8,
    },
    backLinkText: {
        color: 'rgba(255, 255, 255, 0.4)',
        fontSize: 14,
        fontWeight: '600',
    },
});

export default PortalScreen;
