import { odds } from '../interfaces/Accumulator';

export class AccumulatorCalculator {
    static calculateOdds = (odds: odds): Promise<number> => {
        return new Promise((resolve) => {
            resolve(odds.reduce((a, b) => a * b));
        })
    }
}
