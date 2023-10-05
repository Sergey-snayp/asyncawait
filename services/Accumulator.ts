

class Accumulator {
    private validator;

    public setValidator = (validator) => {
        this.validator = validator;
    }

    public validateAccumulator = (accumulator) => {
        const { accumulatorOdds, validationParams } = this.validator.getResult(accumulator);

        return {
            accumulatorOdds,
            accept: validationParams.validAccumulatorRisk && validationParams.validOdds && validationParams.validUser
        }
    }
}
