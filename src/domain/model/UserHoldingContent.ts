import { parseProtection } from '../../utils/AppUtils';

interface UserHoldingItemContent {
    symbol: string;
    quantity: number;
    ltp: number;
    avgPrice: number;
    close: number;
}

interface UserHoldingContent {
    userHolding: Array<UserHoldingItemContent>;
}

const toUserHoldingContent = (data: any): UserHoldingContent => {
    return parseProtection(() => {
        return {
            userHolding: data.userHolding,
        };
    });
};

export { type UserHoldingItemContent, type UserHoldingContent, toUserHoldingContent };
