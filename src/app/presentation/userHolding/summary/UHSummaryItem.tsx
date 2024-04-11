import React from 'react';
import { StyleSheet, TouchableOpacity, View, ViewStyle } from 'react-native';
import colorCode from '../../../../resources/colors/colorCode';
import ColorUtils from '../../../../resources/colors/ColorUtils';
import normDimens from '../../../../resources/dimens/normDimens';
import normFonts, { FontWeight } from '../../../../resources/dimens/normFonts';
import { ImageResizeMode } from '../../widgets/imageView/ImageUtils';
import ImageView from '../../widgets/imageView/ImageView';
import TextView from '../../widgets/textView/TextView';
import { UserHoldingItemBean } from '../../bean/UserHoldingBean';

interface Props {
    title: string;
    value: string;
    style?: ViewStyle;
}

const UHSummaryItem = (props: Props) => {
    const { title, value, style = {} } = props;

    return (
        <View style={{ ...styles.container1, ...style }}>
            <TextView fontWeight={FontWeight._600} style={styles.text1}>
                {title}
            </TextView>
            <TextView fontWeight={FontWeight._400} style={styles.text2}>
                {value}
            </TextView>
        </View>
    );
};

export default UHSummaryItem;

const styles = StyleSheet.create({
    container1: {
        display: 'flex',
        flexDirection: 'row',
        width: normDimens.DIMEN_328,
        height: normDimens.DIMEN_40,
        justifyContent: 'space-between',
    },
    text1: {
        fontSize: normFonts.FONT_12,
        color: ColorUtils.getAlphaColor({ colorCode: colorCode.black, opacityPercent: 100 }),
        alignSelf: 'center',
    },
    text2: {
        fontSize: normFonts.FONT_11,
        color: ColorUtils.getAlphaColor({ colorCode: colorCode.black, opacityPercent: 80 }),
        alignSelf: 'center',
    },
});
