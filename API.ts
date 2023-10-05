import { IUser } from "./interfaces/User";

const delay = (seconds: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, seconds * 1000);
    });
  }

export const validateOdd = async(odd: number): Promise<boolean> => {
    await delay(0.1);
    if (odd > 10){
        return false
    }
    return true;
}

export const validateUserRisk = async(userId: IUser['id']): Promise<boolean> => {
    await delay(0.1);
    if (userId===1){
        return false
    }
    return true;
}

export const validateAccumulatorRisk = async(odds: number): Promise<boolean> => {
    await delay(0.1);
    if (odds > 100){
        return false
    }
    return true;
}

export const getOutcomeOdds = async(outcomeId: number) => {
    await delay(0.1);
    return outcomeId * 1.5;
}
