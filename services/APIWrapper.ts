import { getOutcomeOdds, validateAccumulatorRisk, validateOdd, validateUserRisk } from "../API";
import { outcomeIds, odds } from '../interfaces/Accumulator';
import { IUser } from "../interfaces/User";

export class ApiWrapper {
    static validateAccumulatorRisk = (accumulatorOdds): Promise<boolean> => validateAccumulatorRisk(accumulatorOdds);
    static getOutcomeOdds = (outcomeIds: outcomeIds): Promise<number[]> => Promise.all( outcomeIds.map((outcomeId) => getOutcomeOdds(outcomeId)) );

    static validateOdds = (odds: odds): Promise<boolean> =>
        Promise.all(
            odds.map(odd => validateOdd(odd))
        ).then(results => results.every(Boolean))

    static validateUserRisk = (userId: IUser['id']): Promise<boolean> => validateUserRisk(userId);
}
