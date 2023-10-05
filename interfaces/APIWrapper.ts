import { outcomeIds, odds } from './Validator';
import {IUser} from "./User";

export interface IAPIWrapper {
    validateAccumulatorRisk: (accumulatorOdds: number) => Promise<boolean>,
    getOutcomeOdds: (outcomeIds: outcomeIds) => Promise<number[]>,
    validateOdds: (odds: odds) => Promise<boolean>,
    calculateAccumulatorOdds: (odds: odds) => Promise<number>,
    validateUserRisk: (userId: IUser['id']) => Promise<boolean>
}
