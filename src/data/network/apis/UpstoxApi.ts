import { UserHoldingRC } from '../../../domain/model/UserHoldingRC';
import Api from '../Api';
import ApiRoutes from '../ApiRoutes';
import { getRequest } from '../ApiUtils';

const getUserHoldingApi = async (params: { requestContent: UserHoldingRC }): Promise<any> => {
    const apiRoute = ApiRoutes.userHolding;
    return new Promise((resolve, reject) => {
        getRequest({
            route: apiRoute,
            axiosClient: Api.authorized_axios_client_v3,
        })
            .then((response) => {
                resolve(response);
            })
            .catch((errorMessage: string) => {
                reject(errorMessage);
            });
    });
};

export default {
    getUserHoldingApi,
};
