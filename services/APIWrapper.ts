import { getOutcomeOdds, validateAccumulatorRisk, validateOdd, validateUserRisk } from "../API";
import { IAPIWrapper } from '../interfaces/APIWrapper';
import { outcomeIds, odds } from '../interfaces/Validator';
import { IUser } from "../interfaces/User";

class ApiWrapper implements IAPIWrapper {
    validateAccumulatorRisk = (accumulatorOdds): Promise<boolean> => validateAccumulatorRisk(accumulatorOdds);
    getOutcomeOdds = (outcomeIds: outcomeIds): Promise<number[]> => Promise.all( outcomeIds.map((outcomeId) => getOutcomeOdds(outcomeId)) );

    validateOdds = (odds: odds): Promise<boolean> =>
        Promise.all(
            odds.map(odd => validateOdd(odd))
        ).then(results => results.every(Boolean))

    calculateAccumulatorOdds = (odds: odds): Promise<number> => {
        return new Promise((resolve) => {
            resolve(odds.reduce((a, b) => a * b));
        })
    }

    validateUserRisk = (userId: IUser['id']): Promise<boolean> => validateUserRisk(userId);
}

export default new ApiWrapper();
