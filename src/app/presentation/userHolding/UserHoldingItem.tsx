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
import AppConstant from '../../../utils/AppConstant';
import strings from '../../../resources/strings/strings';

interface Props {
    item: UserHoldingItemBean;
    style?: ViewStyle;
    separator?: boolean;
}

const UserHoldingItem = (props: Props) => {
    const { item, style, separator = true } = props;

    return (
        <View style={[styles.container1, style]}>
            <View style={styles.container2}>
                <View style={styles.container4}>
                    <TextView fontWeight={FontWeight._600} style={styles.text1}>
                        {item.symbol}
                    </TextView>
                    <View style={styles.container5}>
                        <TextView fontWeight={FontWeight._400} style={styles.text2}>
                            {'LTP : '}
                        </TextView>
                        <TextView fontWeight={FontWeight._600} style={styles.text3}>
                            {AppConstant.defaultCurrency.symbol + strings.symbols.space + item.ltp}
                        </TextView>
                    </View>
                </View>
                <View style={styles.container4}>
                    <TextView fontWeight={FontWeight._400} style={styles.text1}>
                        {item.quantity}
                    </TextView>
                    <View style={styles.container5}>
                        <TextView fontWeight={FontWeight._400} style={styles.text2}>
                            {'P/L : '}
                        </TextView>
                        <TextView fontWeight={FontWeight._600} style={styles.text3}>
                            {AppConstant.defaultCurrency.symbol + strings.symbols.space + item.pl}
                        </TextView>
                    </View>
                </View>
            </View>
            {separator ? <View style={styles.container3} /> : null}
        </View>
    );
};

export default UserHoldingItem;

const styles = StyleSheet.create({
    container1: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: colorCode.white,
    },
    container2: {
        display: 'flex',
        flexDirection: 'column',
        width: normDimens.DIMEN_328,
        height: normDimens.DIMEN_60,
    },
    container3: {
        display: 'flex',
        flexDirection: 'column',
        width: normDimens.DIMEN_328,
        height: normDimens.DIMEN_1,
        backgroundColor: colorCode.backround,
    },
    container4: {
        display: 'flex',
        flexDirection: 'row',
        width: normDimens.DIMEN_328,
        height: normDimens.DIMEN_30,
        justifyContent: 'space-between',
    },
    container5: {
        display: 'flex',
        flexDirection: 'row',
        height: normDimens.DIMEN_30,
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
    text3: {
        fontSize: normFonts.FONT_11,
        color: ColorUtils.getAlphaColor({ colorCode: colorCode.black, opacityPercent: 100 }),
        alignSelf: 'center',
    },
});
