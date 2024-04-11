import { upstoxRepository } from '../../data/repository';
import { UserHoldingContent } from '../model/UserHoldingContent';
import { UserHoldingRC } from '../model/UserHoldingRC';

const getUserHolding = async (params: { requestContent: UserHoldingRC }): Promise<UserHoldingContent> => {
    return new Promise((resolve, reject) => {
        upstoxRepository
            .getUserHoldingApiCall(params)
            .then((response) => {
                resolve(response);
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default {
    getUserHolding,
};
