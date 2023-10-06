import { IUser } from "./User";

export type outcomeIds = number[];

export type odds = number[];

export interface IAccumulatorRequest {
    user: IUser;
    outcomeIds: outcomeIds;
}

export interface IAccumulatorResponse {
    accumulatorOdds?: number,
    accept: boolean,
}

export interface IAccumulatorCalculator {
    calculateOddsParallel: (odds: odds) => Promise<number>,
    calculateOdds: (odds: odds) => number,
}
