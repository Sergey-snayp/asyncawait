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

export interface IAccumulator extends IAccumulatorRequest {
    odds: odds,
    validUser: boolean,
}
