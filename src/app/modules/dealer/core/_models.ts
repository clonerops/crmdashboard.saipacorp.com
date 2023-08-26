export interface IDealers {
    dlR_NO: number;
    dlR_NAME: string;
    prvN_NO: number;
    prvN_NAME: string;
    citY_NO: number;
    citY_NAME: string;
    address: string;
    mobilE_NO: string;
    teL_NO: string;
    latitude: number;
    longitude: number;
    dlR_STATUS: number;
}

export interface IDealerQuestion {
    weaknessInappropriateTreatment: number
    weaknessCarNotClean: number
    weaknessPersonelNoCleaning: number
    weaknessGetExtraMoney: number
    weaknessSaleNoCleaning: number
    weaknessDeliveryNoCleaning: number
    weaknessNotFixProblem: number
    weaknessInadequateTraining: number
    strengthAppropriateTreatment: number
    strengthCarWasClean: number
    strengthPersonelWasClean: number
    strengthProperReception: number
    strengthExistCleaningInSale: number
    strengthExistCleaningInDelivery: number
    strengthNotProblem: number
    strengthProperTraining: number
    surveyTotal: number
    customersCount: number
    satisfactionRateSum: number
}