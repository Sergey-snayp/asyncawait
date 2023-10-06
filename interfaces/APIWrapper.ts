import { outcomeIds, odds } from './Accumulator';
import {IUser} from "./User";

export type APIWrapperType = {
    validateAccumulatorRisk: (accumulatorOdds: number) => Promise<boolean>,
    getOutcomeOddsInParallel: (outcomeIds: outcomeIds) => Promise<number[]>,
    validateOddsInParallel: (odds: odds) => Promise<boolean>,
    validateUserRisk: (userId: IUser['id']) => Promise<boolean>
}
