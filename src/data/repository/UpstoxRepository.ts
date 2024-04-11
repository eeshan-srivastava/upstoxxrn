import { UserHoldingContent, toUserHoldingContent } from '../../domain/model/UserHoldingContent';
import { UserHoldingRC } from '../../domain/model/UserHoldingRC';
import { upstoxApi } from '../network/apis';

const getUserHoldingApiCall = async (params: {
    requestContent: UserHoldingRC;
}): Promise<UserHoldingContent> => {
    return new Promise((resolve, reject) => {
        upstoxApi
            .getUserHoldingApi(params)
            .then((response) => {
                resolve(toUserHoldingContent(response));
            })
            .catch((err) => {
                reject(err);
            });
    });
};

export default {
    getUserHoldingApiCall,
};
