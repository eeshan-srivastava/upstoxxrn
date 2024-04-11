import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, StyleSheet, View } from 'react-native';
import SafeArea from '../widgets/SafeArea';
import colorCode from '../../../resources/colors/colorCode';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import normDimens from '../../../resources/dimens/normDimens';
import NavigationRoutes from '../../navigation/NavigationRoutes';
import BackPressUtils from '../../../utils/BackPressUtils';
import ColorUtils from '../../../resources/colors/ColorUtils';
import MainHeader from './MainHeader';
import UserHolding from '../userHolding/UserHolding';

interface Props {}

interface Route {
    params: {
        source?: string;
    };
}

const ReactNavTab = createBottomTabNavigator();

const Main = (props: Props) => {
    const navigation: any = useNavigation();
    const route = useRoute() as Route;

    useEffect(() => {}, []);

    const onBackPress = () => {
        if (navigation.canGoBack()) {
            navigation.goBack();
        }
        return true;
    };

    useEffect(() => {
        BackHandler.addEventListener(BackPressUtils.HARDWARE_BACKPRESS, onBackPress);
        return () => BackHandler.removeEventListener(BackPressUtils.HARDWARE_BACKPRESS, onBackPress);
    }, []);

    const onBackPresssed = () => {
        onBackPress();
    };

    return (
        <SafeArea>
            <View style={styles.container1}>
                <MainHeader title="Upstox Holding" />
                <UserHolding />
            </View>
        </SafeArea>
    );
};

export default Main;

const styles = StyleSheet.create({
    container1: {
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: colorCode.backround,
        flex: 1,
    },
});
