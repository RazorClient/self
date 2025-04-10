import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import {
  StaticParamList,
  createNavigationContainerRef,
  createStaticNavigation,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DefaultNavBar from './components/DefaultNavBar';
import HomeNavBar from './components/HomeNavBar';
import AppLayout from './layouts/AppLayout';
import AccountRecoveryChoiceScreen from './screens/AccountFlow/AccountRecoveryChoiceScreen';
import AccountRecoveryScreen from './screens/AccountFlow/AccountRecoveryScreen';
import AccountVerifiedSuccessScreen from './screens/AccountFlow/AccountVerifiedSuccessScreen';
import RecoverWithPhraseScreen from './screens/AccountFlow/RecoverWithPhraseScreen';
import SaveRecoveryPhraseScreen from './screens/AccountFlow/SaveRecoveryPhraseScreen';
import DisclaimerScreen from './screens/DisclaimerScreen';
import HomeScreen from './screens/HomeScreen';
import LaunchScreen from './screens/LaunchScreen';
import MockDataScreen from './screens/MockDataScreen';
import ConfirmBelongingScreen from './screens/Onboarding/ConfirmBelongingScreen';
import LoadingScreen from './screens/Onboarding/LoadingScreen';
import PassportCameraScreen from './screens/Onboarding/PassportCameraScreen';
import PassportCameraTrouble from './screens/Onboarding/PassportCameraTrouble';
import PassportDataNotFound from './screens/Onboarding/PassportDataNotFound';
import PassportNFCScanScreen from './screens/Onboarding/PassportNFCScanScreen';
import PassportNFCTrouble from './screens/Onboarding/PassportNFCTrouble';
import PassportOnboardingScreen from './screens/Onboarding/PassportOnboardingScreen';
import UnsupportedPassportScreen from './screens/Onboarding/UnsupportedPassport';
import ProofRequestStatusScreen from './screens/ProveFlow/ProofRequestStatusScreen';
import ProveScreen from './screens/ProveFlow/ProveScreen';
import QRCodeTroubleScreen from './screens/ProveFlow/QRCodeTrouble';
import QRCodeViewFinderScreen from './screens/ProveFlow/ViewFinder';
import CloudBackupScreen from './screens/Settings/CloudBackupScreen';
import DevSettingsScreen from './screens/Settings/DevSettingsScreen';
import ModalScreen from './screens/Settings/ModalScreen';
import PassportDataInfoScreen from './screens/Settings/PassportDataInfoScreen';
import ShowRecoveryPhraseScreen from './screens/Settings/ShowRecoveryPhraseScreen';
import SettingsScreen from './screens/SettingsScreen';
import SplashScreen from './screens/SplashScreen';
import { useApp } from './stores/appProvider';
import { useProofInfo } from './stores/proofProvider';
import analytics from './utils/analytics';
import { black, slate300, white } from './utils/colors';
import { setupUniversalLinkListenerInNavigation } from './utils/qrCodeNew';

const AppNavigation = createNativeStackNavigator({
  initialRouteName: 'Splash',
  orientation: 'portrait_up',
  screenOptions: {
    header: DefaultNavBar,
    navigationBarColor: white,
  },
  layout: AppLayout,
  screens: {
    /**
     * STATIC SCREENS
     */
    Splash: {
      screen: SplashScreen,
      options: {
        header: () => (
          <StatusBar barStyle="light-content" backgroundColor={black} />
        ),
        navigationBarColor: black,
      },
    },
    Launch: {
      screen: LaunchScreen,
      options: {
        headerShown: false,
        gestureEnabled: false,
      },
    },
    Modal: {
      screen: ModalScreen,
      options: {
        headerShown: false,
        presentation: 'transparentModal',
        animation: 'fade',
      },
    },
    /**
     * SCAN PASSPORT FLOW
     */
    PassportOnboarding: {
      screen: PassportOnboardingScreen,
      options: {
        animation: 'slide_from_bottom',
        // presentation: 'modal' wanted to do this but seems to break stuff
        headerShown: false,
      },
    },
    PassportCameraTrouble: {
      screen: PassportCameraTrouble,
      options: {
        headerShown: false,
        animation: 'slide_from_bottom',
        presentation: 'modal',
      },
    },
    PassportNFCTrouble: {
      screen: PassportNFCTrouble,
      options: {
        headerShown: false,
        animation: 'slide_from_bottom',
        presentation: 'modal',
      },
    },
    PassportCamera: {
      screen: PassportCameraScreen,
      options: {
        headerShown: false,
        animation: 'slide_from_bottom',
      },
    },
    PassportNFCScan: {
      screen: PassportNFCScanScreen,
      options: {
        headerShown: false,
        animation: 'slide_from_bottom',
      },
      initialParams: {
        passportNumber: '',
        dateOfBirth: '',
        dateOfExpiry: '',
      },
    },
    ConfirmBelongingScreen: {
      screen: ConfirmBelongingScreen,
      options: {
        headerShown: false,
      },
    },
    UnsupportedPassport: {
      screen: UnsupportedPassportScreen,
      options: {
        headerShown: false,
      },
    },
    LoadingScreen: {
      screen: LoadingScreen,
      options: {
        headerShown: false,
        navigationBarColor: black,
      },
    },
    CreateMock: {
      screen: MockDataScreen,
      options: {
        title: 'Mock Passport',
      },
    },
    /**
     * HOME SECTION
     */
    Home: {
      screen: HomeScreen,
      options: {
        title: 'Self',
        header: HomeNavBar,
        navigationBarColor: black,
        presentation: 'card',
      },
    },
    Disclaimer: {
      screen: DisclaimerScreen,
      options: {
        title: 'Disclaimer',
        headerShown: false,
      },
    },
    /**
     * QR CODE SCANNING + PROVE FLOW
     */
    QRCodeViewFinder: {
      screen: QRCodeViewFinderScreen,
      options: {
        headerShown: false,
        animation: 'slide_from_bottom',
        // presentation: 'modal',
      },
    },
    QRCodeTrouble: {
      screen: QRCodeTroubleScreen,
      options: {
        headerShown: false,
        animation: 'slide_from_bottom',
        presentation: 'modal',
      },
    },
    PassportDataNotFound: {
      screen: PassportDataNotFound,
      options: {
        headerShown: false,
        gestureEnabled: false,
        animation: 'slide_from_bottom',
        // presentation: 'modal',
      },
    },
    ProveScreen: {
      screen: ProveScreen,
      options: {
        title: 'Request Proof',
        headerStyle: {
          backgroundColor: black,
        },
        headerTitleStyle: {
          color: white,
        },
      },
    },
    ProofRequestStatusScreen: {
      screen: ProofRequestStatusScreen,
      options: {
        headerShown: false,
        animation: 'slide_from_bottom',
      },
    },
    /**
     * CREATE OR RECOVER ACCOUNT
     */
    AccountRecovery: {
      screen: AccountRecoveryScreen,
      options: {
        headerShown: false,
      },
    },
    AccountRecoveryChoice: {
      screen: AccountRecoveryChoiceScreen,
      options: {
        headerShown: false,
      },
    },
    SaveRecoveryPhrase: {
      screen: SaveRecoveryPhraseScreen,
      options: {
        headerShown: false,
        animation: 'slide_from_bottom',
      },
    },
    RecoverWithPhrase: {
      screen: RecoverWithPhraseScreen,
      options: {
        headerTintColor: black,
        title: 'Enter Recovery Phrase',
        headerStyle: {
          backgroundColor: black,
        },
        headerTitleStyle: {
          color: slate300,
        },
        headerBackTitle: 'close',
      },
    },
    AccountVerifiedSuccess: {
      screen: AccountVerifiedSuccessScreen,
      options: {
        headerShown: false,
        animation: 'slide_from_bottom',
      },
    },
    /**
     * SETTINGS
     */
    Settings: {
      screen: SettingsScreen,
      options: {
        animation: 'slide_from_bottom',
        title: 'Settings',
        headerStyle: {
          backgroundColor: white,
        },
        headerTitleStyle: {
          color: black,
        },
        navigationBarColor: black,
      },
      config: {
        screens: {},
      },
    },
    ShowRecoveryPhrase: {
      screen: ShowRecoveryPhraseScreen,
      options: {
        title: 'Recovery Phrase',
        headerStyle: {
          backgroundColor: white,
        },
      },
    },
    PassportDataInfo: {
      screen: PassportDataInfoScreen,
      options: {
        title: 'Passport Data Info',
        headerStyle: {
          backgroundColor: white,
        },
      },
    },
    DevSettings: {
      screen: DevSettingsScreen,
      options: {
        title: 'Developer Settings',
        headerStyle: {
          backgroundColor: white,
        },
      },
    },
    CloudBackupSettings: {
      screen: CloudBackupScreen,
      options: {
        title: 'Cloud backup',
        headerStyle: {
          backgroundColor: black,
        },
        headerTitleStyle: {
          color: slate300,
        },
      },
    },
  },
});

export type RootStackParamList = StaticParamList<typeof AppNavigation>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

// Create a ref that we can use to access the navigation state
export const navigationRef = createNavigationContainerRef();

const { trackScreenView } = analytics();

const Navigation = createStaticNavigation(AppNavigation);
const NavigationWithTracking = () => {
  const trackScreen = () => {
    const currentRoute = navigationRef.getCurrentRoute();
    if (currentRoute) {
      console.log(`Screen View: ${currentRoute.name}`);
      trackScreenView(`${currentRoute.name}`, {
        screenName: currentRoute.name,
      });
    }
  };

  // Add these hooks to get access to the necessary functions
  const { setSelectedApp, cleanSelfApp } = useProofInfo();
  const { startAppListener } = useApp();

  // Setup universal link handling at the navigation level
  React.useEffect(() => {
    const cleanup = setupUniversalLinkListenerInNavigation(
      navigationRef,
      setSelectedApp,
      cleanSelfApp,
      startAppListener,
    );

    return () => {
      cleanup();
    };
  }, [setSelectedApp, cleanSelfApp, startAppListener]);

  return (
    <GestureHandlerRootView>
      <Navigation ref={navigationRef} onStateChange={trackScreen} />
    </GestureHandlerRootView>
  );
};

export default NavigationWithTracking;
