import { getOutcomeOdds, validateAccumulatorRisk, validateOdd, validateUserRisk } from "../API";
import { outcomeIds, odds } from '../interfaces/Accumulator';
import { IUser } from "../interfaces/User";

export class ApiWrapper {
    static validateAccumulatorRisk = (accumulatorOdds: number): Promise<boolean> => validateAccumulatorRisk(accumulatorOdds);

    static getOutcomeOdd = (outcomeId: number): Promise<number> => getOutcomeOdds(outcomeId);

    static getOutcomeOddsInParallel = (outcomeIds: outcomeIds): Promise<number[]> =>
        Promise.all(
            outcomeIds.map((outcomeId) => ApiWrapper.getOutcomeOdd(outcomeId))
        );

    static validateOdd = (odd: number): Promise<boolean> => validateOdd(odd);

    static validateOddsInParallel = (odds: odds): Promise<boolean> =>
        Promise.all(
            odds.map(odd => ApiWrapper.validateOdd(odd))
        ).then(results => results.every(Boolean))

    static validateUserRisk = (userId: IUser['id']): Promise<boolean> => validateUserRisk(userId);
}
