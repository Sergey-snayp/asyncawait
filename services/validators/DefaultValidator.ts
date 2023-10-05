import { Validator } from "./Validator";
import { IAPIWrapper } from '../../interfaces/APIWrapper';

class DefaultValidator {
    private validator;
    private validateService: IAPIWrapper;

    constructor(validateService: IAPIWrapper) {
        this.validateService = validateService;
        this.reset()
    }

    public validateUserAndGetOutcomeOdds = async () => {
        const func = async (accumulator) => {
            const [validUser, odds] = await Promise.all([
                this.validateService.validateUserRisk(accumulator.user.id),
                this.validateService.getOutcomeOdds(accumulator.outcomeIds)
            ]);

            accumulator.odds = odds;
            accumulator.validationParams = { ...accumulator.validationParams, validUser };
        }

        this.validator.validationSteps.push(func)
    }

    public calculateAndValidateOdds = async () => {
        const func = async (accumulator) => {
            const [accumulatorOdds, validOdds] = await Promise.all([
                this.validateService.calculateOdds(accumulator.odds),
                this.validateService.validateOdds(accumulator.odds)
            ]);

            accumulator.validationParams = { ...accumulator.validationParams, validOdds };
            accumulator.accumulatorOdds = accumulatorOdds;
        }

        this.validator.validationSteps.push(func);
    }

    public validateAccumulatorRisk = async (accumulator) => {
        const func = async (accumulator) => {
            const validAccumulatorRisk = await this.validateService.validateAccumulatorRisk(accumulator.accumulatorOdds);

            accumulator.validationParams = { ...accumulator.validationParams, validAccumulatorRisk};
        }

        this.validator.validationSteps.push(func);
    }

    public reset = (): void => {
        this.validator = new Validator();
    }

    public getResult = () => {
        const result = this.validator.getResult();
        this.reset();

        return result;
    }
}
