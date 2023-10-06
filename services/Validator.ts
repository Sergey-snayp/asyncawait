import { IAccumulatorResponse, IAccumulatorRequest } from '../interfaces/Accumulator';
import { APIWrapperType } from '../interfaces/APIWrapper';
import { IAccumulatorCalculator } from "../interfaces/Accumulator";

export class Validator {
    apiWrapper: APIWrapperType;
    accCalculator: IAccumulatorCalculator;

    constructor(apiWrapper: APIWrapperType, accCalculator: IAccumulatorCalculator) {
        this.apiWrapper = apiWrapper;
        this.accCalculator = accCalculator;
    }

    validateAccumulator = async (accumulatorRequest: IAccumulatorRequest): Promise<IAccumulatorResponse> => {
        const [validUser, odds] = await Promise.all([
            this.apiWrapper.validateUserRisk(accumulatorRequest.user.id),
            this.apiWrapper.getOutcomeOddsInParallel(accumulatorRequest.outcomeIds)
        ]);

        const [accumulatorOdds, validOdds] = await Promise.all([
            this.accCalculator.calculateOddsParallel(odds),
            this.apiWrapper.validateOddsInParallel(odds)
        ]);

        const validAccumulatorRisk = await this.apiWrapper.validateAccumulatorRisk(accumulatorOdds);

        return {
            accumulatorOdds,
            accept: validAccumulatorRisk && validOdds && validUser,
        }
    }
}

