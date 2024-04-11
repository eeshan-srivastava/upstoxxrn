import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import colorCode from '../../../resources/colors/colorCode';
import ColorUtils from '../../../resources/colors/ColorUtils';
import normDimens from '../../../resources/dimens/normDimens';
import normFonts, { FontWeight } from '../../../resources/dimens/normFonts';
import { ImageResizeMode } from '../widgets/imageView/ImageUtils';
import ImageView from '../widgets/imageView/ImageView';
import TextView from '../widgets/textView/TextView';
import { UserHoldingItemBean } from '../bean/UserHoldingBean';

interface Props {
    title: string;
}

const MainHeader = (props: Props) => {
    const { title = '' } = props;

    return (
        <View style={styles.container1}>
            <TextView fontWeight={FontWeight._500} style={styles.text1}>
                {title}
            </TextView>
        </View>
    );
};

export default MainHeader;

const styles = StyleSheet.create({
    container1: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        width: '100%',
        height: normDimens.DIMEN_52,
        backgroundColor: colorCode.primary,
    },
    text1: {
        fontSize: normFonts.FONT_16,
        color: colorCode.white,
        marginStart: normDimens.DIMEN_16,
    },
});
