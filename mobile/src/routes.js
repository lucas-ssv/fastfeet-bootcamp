import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';

import SignIn from '~/pages/SignIn';
import Deliveries from '~/pages/Deliveries';
import Profile from '~/pages/Profile';
import OrderDetails from '~/pages/OrderDetails';
import ReportProblem from '~/pages/ReportProblem';
import ViewProblem from '~/pages/ViewProblem';
import ConfirmDelivery from '~/pages/ConfirmDelivery';

export default (signedIn = false) =>
    createAppContainer(
        createSwitchNavigator(
            {
                Sign: createSwitchNavigator({
                    SignIn,
                }),
                App: createBottomTabNavigator(
                    {
                        Deliveries: {
                            screen: createStackNavigator(
                                {
                                    Deliveries,
                                    OrderDetails,
                                    ReportProblem,
                                    ViewProblem,
                                    ConfirmDelivery,
                                },
                                {
                                    defaultNavigationOptions: {
                                        headerTitleAlign: 'center',
                                        headerStyle: {
                                            backgroundColor: '#7d40e7',
                                            elevation: 0,
                                            shadowOpacity: 0,
                                        },
                                        headerTitleStyle: {
                                            color: '#fff',
                                            fontSize: 16,
                                        },
                                        headerLeftContainerStyle: {
                                            marginLeft: 20,
                                        },
                                    },
                                }
                            ),
                            navigationOptions: {
                                tabBarLabel: 'Entregas',
                                tabBarIcon: ({ tintColor }) => (
                                    <Icon
                                        name="view-headline"
                                        size={20}
                                        color={tintColor}
                                    />
                                ),
                                tabBarOptions: {
                                    keyboardHidesTabBar: true,
                                    activeTintColor: '#7d40e7',
                                    inactiveTintColor: '#999',
                                    style: {
                                        backgroundColor: '#fff',
                                    },
                                },
                            },
                        },
                        Profile,
                    },
                    {
                        resetOnBlur: true,
                        tabBarOptions: {
                            keyboardHidesTabBar: true,
                            activeTintColor: '#7d40e7',
                            inactiveTintColor: '#999',
                            style: {
                                backgroundColor: '#fff',
                            },
                        },
                    }
                ),
            },
            {
                initialRouteName: signedIn ? 'App' : 'Sign',
            }
        )
    );
