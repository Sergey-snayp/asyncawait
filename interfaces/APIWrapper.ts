import { outcomeIds, odds } from './Accumulator';
import {IUser} from "./User";

export type APIWrapperType = {
    validateAccumulatorRisk: (accumulatorOdds: number) => Promise<boolean>,
    getOutcomeOdds: (outcomeIds: outcomeIds) => Promise<number[]>,
    validateOdds: (odds: odds) => Promise<boolean>,
    validateUserRisk: (userId: IUser['id']) => Promise<boolean>
}
