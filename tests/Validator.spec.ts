import { IAccumulatorRequest } from '../interfaces/Accumulator';
import { Validator } from '../services/Validator';
import { ApiWrapper } from '../services/APIWrapper';
import { AccumulatorCalculator } from '../helpers/AccumulatorCalculator';


describe('Validator', () => {

    test('Should reject bets from user 1', async() => {
        // This is a template outcome we will be testing against
        const accumulatorRequest: IAccumulatorRequest = {
            user:{ id: 1},
            outcomeIds: [1,2]
        };

        const validator = new Validator(ApiWrapper, AccumulatorCalculator);
        const result = await validator.validateAccumulator(accumulatorRequest);
        expect(result.accept).toBeFalsy();
    });

    test('Should accept bets from user 2', async() => {
        // This is a template outcome we will be testing against
        const accumulatorRequest: IAccumulatorRequest = {
            user:{ id: 2},
            outcomeIds: [1,2]
        };

        const validator = new Validator(ApiWrapper, AccumulatorCalculator);
        const result = await validator.validateAccumulator(accumulatorRequest);
        expect(result.accept).toBeTruthy();
        expect(result.accumulatorOdds).toEqual(4.5);
    });
    test('Should reject outcome 11', async() => {
        // This is a template outcome we will be testing against
        const accumulatorRequest: IAccumulatorRequest = {
            user:{ id: 2},
            outcomeIds: [1,11]
        };

        const validator = new Validator(ApiWrapper, AccumulatorCalculator);
        const result = await validator.validateAccumulator(accumulatorRequest);
        expect(result.accept).toBeFalsy();
    });
    test('Should reject this outcome combination', async() => {
        // This is a template outcome we will be testing against
        const accumulatorRequest: IAccumulatorRequest = {
            user:{ id: 2 },
            outcomeIds: [1,2,3,4]
        };

        const validator = new Validator(ApiWrapper, AccumulatorCalculator);
        const result = await validator.validateAccumulator(accumulatorRequest);
        expect(result.accept).toBeFalsy();
        expect(result.accumulatorOdds).toEqual(121.5);
    });
});
