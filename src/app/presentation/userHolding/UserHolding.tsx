import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import SafeArea from '../widgets/SafeArea';
import colorCode from '../../../resources/colors/colorCode';
import PageStateComponent from '../widgets/pageState/PageStateComponent';
import DefaultErrorView from '../widgets/view/DefaultErrorView';
import DefaultLoadingView from '../widgets/view/DefaultLoadingView';
import { FlashList, MasonryFlashList } from '@shopify/flash-list';
import { PageStateType } from '../widgets/pageState/PageStateUtils';
import strings from '../../../resources/strings/strings';
import { PaginationStateType } from '../../utils/PaginationUtils';
import { getApiErrorMessageFromError } from '../../../utils/AppUtils';
import normDimens from '../../../resources/dimens/normDimens';
import { ActivityIndicator } from 'react-native-paper';
import { UserHoldingItemBean, toUserHoldingItemBean } from '../bean/UserHoldingBean';
import { UserHoldingRC } from '../../../domain/model/UserHoldingRC';
import { upstoxUseCase } from '../../../domain/usecase';
import { UserHoldingItemContent } from '../../../domain/model/UserHoldingContent';
import UserHoldingItem from './UserHoldingItem';
import TextView from '../widgets/textView/TextView';
import BottomTray from '../widgets/tray/BottomTray';
import normFonts, { FontWeight } from '../../../resources/dimens/normFonts';
import ColorUtils from '../../../resources/colors/ColorUtils';
import AppConstant from '../../../utils/AppConstant';
import UHSummaryItem from './summary/UHSummaryItem';
import { roundNumber } from '../../../utils/NumberUtils';

interface Props {}

const UserHolding = (props: Props) => {
    const navigation: any = useNavigation();

    const [fullPageState, setFullPageState] = useState<PageStateType>(PageStateType.LOADING);
    const [fullPageErrorText, setFullPageErrorText] = useState<string>(strings.something_went_wrong);

    const [holdings, setHoldings] = useState<Array<UserHoldingItemBean>>([]);
    const [totalCV, setTotalCV] = useState<number>(0);
    const [totalIV, setTotalIV] = useState<number>(0);
    const [totalPNL, setTotalPNL] = useState<number>(0);
    const [todaysTotalPNL, setTodaysTotalPNL] = useState<number>(0);

    const getUserHoldingData = async (request: UserHoldingRC) => {
        upstoxUseCase
            .getUserHolding({ requestContent: request })
            .then((response) => {
                let _totalCV = 0;
                let _totalIV = 0;
                let _totalPNL = 0;
                let _todaysTotalPNL = 0;
                const data =
                    response?.userHolding.map((item: UserHoldingItemContent) => {
                        return toUserHoldingItemBean(item);
                    }) || [];

                data.map((item: UserHoldingItemBean) => {
                    _totalCV = _totalCV + item.currentValue;
                    _totalIV = _totalIV + item.investmentValue;
                    _todaysTotalPNL = _todaysTotalPNL + item.individualPNL;
                });
                _totalPNL = _totalCV - _totalIV;
                setTotalCV(roundNumber(_totalCV));
                setTotalIV(roundNumber(_totalIV));
                setTodaysTotalPNL(roundNumber(_todaysTotalPNL));
                setTotalPNL(roundNumber(_totalPNL));
                setHoldings(data);
                setFullPageState(PageStateType.SUCCESS);
            })
            .catch((err) => {
                const message = getApiErrorMessageFromError({ error: err });
                setFullPageErrorText(message);
                setFullPageState(PageStateType.ERROR);
            });
    };

    const init = async () => {
        getUserHoldingData({});
    };

    useEffect(() => {
        init();
    }, []);

    const onClickItem = (item: UserHoldingItemBean) => {};

    const renderItem = ({ item, index }: { item: UserHoldingItemBean; index: number }) => {
        return <UserHoldingItem item={item} separator={!(holdings.length - 1 === index)} />;
    };

    const keyExtractor = (item: UserHoldingItemBean, index: any) => {
        return item.id.toString();
    };

    const onRetry = () => {
        setFullPageState(PageStateType.LOADING);
        getUserHoldingData({});
    };

    const ExpandedSummary = () => {
        return (
            <View style={styles.container6}>
                <UHSummaryItem
                    title={'Current Value :'}
                    value={AppConstant.defaultCurrency.symbol + totalCV}
                    style={styles.container7}
                />
                <UHSummaryItem
                    title={'Total Investment:'}
                    value={AppConstant.defaultCurrency.symbol + totalIV}
                    style={styles.container7}
                />
                <UHSummaryItem
                    title={'Today Profit & Loss :'}
                    value={AppConstant.defaultCurrency.symbol + todaysTotalPNL}
                    style={styles.container7}
                />
                <UHSummaryItem
                    title={'Profit & Loss :'}
                    value={AppConstant.defaultCurrency.symbol + totalPNL}
                    style={styles.container8}
                />
            </View>
        );
    };

    const CollapsedSummary = () => {
        return (
            <View style={styles.container6}>
            <UHSummaryItem
                title={'Profit & Loss :'}
                value={AppConstant.defaultCurrency.symbol + totalPNL}
                style={styles.container8}
            />
            </View>
        );
    };

    return (
        <PageStateComponent
            pageState={fullPageState}
            errorComponent={
                <DefaultErrorView
                    secondaryText={fullPageErrorText}
                    onRetry={onRetry}
                    backButtonVisible={false}
                />
            }
            loadingComponent={<DefaultLoadingView message={'Fetching holding, please wait...'} />}>
            <View style={styles.container1}>
                <FlashList
                    data={holdings}
                    renderItem={renderItem}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={keyExtractor}
                    estimatedItemSize={normDimens.DIMEN_260}
                />
                <BottomTray
                    expandedComponent={<ExpandedSummary />}
                    collapsedComponent={<CollapsedSummary />}
                />
            </View>
        </PageStateComponent>
    );
};

export default UserHolding;

const styles = StyleSheet.create({
    container1: {
        backgroundColor: colorCode.transparent,
        flex: 1,
    },
    container2: {
        marginVertical: normDimens.DIMEN_16,
        width: normDimens.DIMEN_32,
        height: normDimens.DIMEN_32,
    },
    container3: {
        width: normDimens.DIMEN_32,
        height: normDimens.DIMEN_32,
        marginVertical: normDimens.DIMEN_16,
    },
    container5: {
        width: normDimens.SCREEN_WIDTH,
        height: normDimens.DIMEN_80,
        alignItems: 'center',
    },
    container6: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        backgroundColor: colorCode.white,
    },
    container7: {
        display: 'flex',
        flexDirection: 'row',
        width: normDimens.DIMEN_328,
        height: normDimens.DIMEN_40,
        justifyContent: 'space-between',
    },
    container8: {
        display: 'flex',
        flexDirection: 'row',
        width: normDimens.DIMEN_328,
        height: normDimens.DIMEN_50,
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
