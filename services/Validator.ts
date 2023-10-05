import { IAccumulatorResponse, IAccumulatorRequest, IAccumulator } from '../interfaces/Validator';
import { IAPIWrapper } from '../interfaces/APIWrapper';
export class Validator {
    APIWrapper: IAPIWrapper;

    constructor(provider: IAPIWrapper) {
        this.APIWrapper = provider;
    }
    validateAccumulator = async (accumulatorRequest: IAccumulatorRequest): Promise<IAccumulatorResponse> => {
        const [validUser, odds] = await Promise.all([
            this.APIWrapper.validateUserRisk(accumulatorRequest.user.id),
            this.APIWrapper.getOutcomeOdds(accumulatorRequest.outcomeIds)
        ]);

        const [accumulatorOdds, validOdds] = await Promise.all([
            this.APIWrapper.calculateOdds(odds),
            this.APIWrapper.validateOdds(odds)
        ]);

        const validAccumulatorRisk = await this.APIWrapper.validateAccumulatorRisk(accumulatorOdds);

        return {
            accumulatorOdds,
            accept: validAccumulatorRisk && validOdds && validUser,
        }
    }
}

