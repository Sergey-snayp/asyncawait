import { odds } from '../interfaces/Accumulator';

export class AccumulatorCalculator {
    static calculateOdds = (odds: odds): number => {
        return odds.reduce((a, b) => a * b);
    }

    static calculateOddsParallel = (odds: odds): Promise<number> => {
        return new Promise((resolve) => {
            resolve(AccumulatorCalculator.calculateOdds(odds));
        })
    }
}
