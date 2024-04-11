import React, { useState, useRef } from 'react';
import { View, TouchableOpacity, Animated, StyleSheet, LayoutChangeEvent } from 'react-native';
import normDimens from '../../../../resources/dimens/normDimens';
import colorCode from '../../../../resources/colors/colorCode';
import { NavArrowDown, NavArrowUp } from 'iconoir-react-native';

interface Props {
    expandedComponent: React.ReactNode;
    collapsedComponent: React.ReactNode;
}

const BottomTray = (props: Props) => {
    const { expandedComponent, collapsedComponent } = props;
    const [isExpanded, setIsExpanded] = useState<boolean>(false);
    const translateY = useRef(new Animated.Value(1)).current;

    const toggleTray = () => {
        setIsExpanded(!isExpanded);
        Animated.timing(translateY, {
            toValue: isExpanded ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    const handleLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        translateY.setValue(height);
    };

    return (
        <View style={styles.container1} onLayout={handleLayout}>
            <TouchableOpacity style={styles.container3} onPress={toggleTray}>
                {isExpanded ? (
                    <NavArrowDown
                        width={normDimens.DIMEN_22}
                        height={normDimens.DIMEN_22}
                        strokeWidth={normDimens.DIMEN_2}
                        color={colorCode.arsenic}
                    />
                ) : (
                    <NavArrowUp
                        width={normDimens.DIMEN_22}
                        height={normDimens.DIMEN_22}
                        strokeWidth={normDimens.DIMEN_2}
                        color={colorCode.arsenic}
                    />
                )}
            </TouchableOpacity>
            <Animated.View
                style={[
                    styles.container2,
                    // {
                    //     transform: [
                    //         {
                    //             translateY: translateY.interpolate({
                    //                 inputRange: [0, 1],
                    //                 outputRange: [0, -1],
                    //             }),
                    //         },
                    //     ],
                    // },
                ]}>
                {isExpanded ? expandedComponent : collapsedComponent}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container1: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        borderTopLeftRadius: normDimens.DIMEN_0,
        borderTopRightRadius: normDimens.DIMEN_0,
        elevation: normDimens.DIMEN_8,
    },
    container2: {},
    container3: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: normDimens.DIMEN_10,
    },
});

export default BottomTray;
