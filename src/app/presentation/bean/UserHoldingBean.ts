import { UserHoldingItemContent } from '../../../domain/model/UserHoldingContent';
import { generateRandomString, parseProtection } from '../../../utils/AppUtils';
import { roundNumber } from '../../../utils/NumberUtils';

interface UserHoldingItemBean {
    id: string;
    symbol: string;
    quantity: number;
    ltp: number;
    avgPrice: number;
    close: number;
    currentValue: number;
    investmentValue: number;
    pl: number;
    individualPNL: number;
}

const toUserHoldingItemBean = (data: UserHoldingItemContent): UserHoldingItemBean => {
    return parseProtection(() => {
        const currentValue = roundNumber(data.ltp * data.quantity);
        const investmentValue = roundNumber(data.avgPrice * data.quantity);
        const pl = roundNumber(currentValue - investmentValue);
        const individualPNL = roundNumber((data.close = data.ltp) * data.quantity);
        const item: UserHoldingItemBean = {
            id: generateRandomString(),
            symbol: data.symbol,
            quantity: data.quantity,
            ltp: data.ltp,
            avgPrice: data.avgPrice,
            close: data.close,
            currentValue: currentValue,
            investmentValue: investmentValue,
            pl: pl,
            individualPNL: individualPNL,
        };
        return item;
    });
};

export { type UserHoldingItemBean, toUserHoldingItemBean };
