import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'; //-----> to delete
import Language from './Language';
import LoginScreen from './loginscreen';
import SignUpScreen from './SignupScreen';
import HomeScreen from './HomeScreen';
import CropListScreen from './CropListScreen';
import CropDetailsScreen from './CropDetailsScreen';
import SellProductScreen from './SellProductScreen';
import DiseaseScreen from './DiseaseScreen';
import GroupFormScreen from './GroupFormScreen';
import DiscussSreen from './DiscussSreen';
import SettingSceen from './SettingSceen';
import ChatScreen from './ChatScreen';
import LoanScreen from './LoanScreen';
import DetailsScreen from './DetailsScreen';
import MyCropsScreen from './MyCropsScreen';
import GovSchemesScreen from './GovSchemesScreen';
import FinanceScreen from './FinanceScreen';
import BuyHomeScreen from './BuyHomeScreen';
import WeatherScreen from './WeatherScreen';
import RegionChatGroupScreen from './RegionChatGroupScreen';
import SideBar from './sidebar';

const HomeStack = createStackNavigator(
  {
    HomeScreen: {
      screen: HomeScreen,
    },
    CropListScreen: {
      screen: CropListScreen,
    },
    CropDetailsScreen: {
      screen: CropDetailsScreen,
    },
    SellProductScreen: {
      screen: SellProductScreen,
    },
    LoanScreen: {
      screen: LoanScreen,
    },
    GroupFormScreen: {
      screen: GroupFormScreen,
    },
    DiseaseScreen: {
      screen: DiseaseScreen,
    },
    DiscussSreen: {
      screen: DiscussSreen,
    },
    ChatScreen: {
      screen: ChatScreen,
    },
    GovSchemesScreen: {
      screen: GovSchemesScreen,
    },
    FinanceScreen: {
      screen: FinanceScreen,
    },
    WeatherScreen: {
      screen: WeatherScreen,
    },
    RegionChatGroupScreen: {
      screen: RegionChatGroupScreen,
    },
    MyCropsScreen: {
      screen: MyCropsScreen,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'HomeScreen',
  },
);

const LoginStack = createMaterialTopTabNavigator(
  {
    Loginscreen: {
      screen: LoginScreen,
    },
    SignUpscreen: {
      screen: SignUpScreen,
    },
  },
  {
    initialRouteName: 'SignUpscreen',
    lazy: false,
    swipeEnabled: true,
    tabBarPosition: 'bottom',
    tabBarOptions: {
      tabStyle: {
        backgroundColor: '#000000',
      },
      labelStyle: {
        fontSize: 20,
      },
    },
  },
);

const Drawer = createDrawerNavigator(
  {
    Home: {
      screen: HomeStack,
    },
    BuyHome: {
      screen: BuyHomeScreen,
    },
    Settings: {
      screen: SettingSceen,
    },
    Language: {
      screen: Language,
      navigationOptions: {
        drawerLockMode: "locked-closed"
      },
    },
    Login: {
      screen: LoginStack,
      navigationOptions: {
        drawerLockMode: "locked-closed"
      },
    },

    Profile: {
      screen: DetailsScreen,
      navigationOptions: {
        drawerLockMode: "locked-closed"
      },
    },
  },
  {
    initialRouteName: 'Home',
    drawerType: 'front',
    headerMode: 'none',
    contentComponent: props => <SideBar {...props} />,
    drawerWidth: 190,
  },
);

export default createAppContainer(Drawer);
