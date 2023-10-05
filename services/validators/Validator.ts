import { IAccumulatorResponse, IAccumulatorRequest } from '../../interfaces/Validator';

export class Validator {
    public validationSteps = [];

    public getResult = (accumulator) => {
        return this.validationSteps.reduce((acc, step)=> step(acc), accumulator);
    };
}
