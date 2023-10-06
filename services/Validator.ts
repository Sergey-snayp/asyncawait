import { IAccumulatorResponse, IAccumulatorRequest } from '../interfaces/Accumulator';
import { APIWrapperType } from '../interfaces/APIWrapper';
import { IAccumulatorCalculator } from "../interfaces/Accumulator";
export class Validator {
    APIWrapper: APIWrapperType;
    accCalculator: IAccumulatorCalculator;

    constructor(provider: APIWrapperType, accCalculator: IAccumulatorCalculator) {
        this.APIWrapper = provider;
        this.accCalculator = accCalculator;
    }
    validateAccumulator = async (accumulatorRequest: IAccumulatorRequest): Promise<IAccumulatorResponse> => {
        const [validUser, odds] = await Promise.all([
            this.APIWrapper.validateUserRisk(accumulatorRequest.user.id),
            this.APIWrapper.getOutcomeOdds(accumulatorRequest.outcomeIds)
        ]);

        const [accumulatorOdds, validOdds] = await Promise.all([
            this.accCalculator.calculateOdds(odds),
            this.APIWrapper.validateOdds(odds)
        ]);

        const validAccumulatorRisk = await this.APIWrapper.validateAccumulatorRisk(accumulatorOdds);

        return {
            accumulatorOdds,
            accept: validAccumulatorRisk && validOdds && validUser,
        }
    }
}

