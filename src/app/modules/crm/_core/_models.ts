export interface ComplaintOrRequestSendData {
  fromDate: string
  toDate: string
}
export interface ICarEvaluation {
  qustionNo?: number
  carGroupID?: number
  countAll?: number
  countAllYes?: number
  countAllNo?: number
  countAllVeryMuch?: number
  countAllMuch?: number
  countAllMedium?: number
  countAllLow?: number
  countAllVeryLow?: number
}

export interface IQuestion {
  qustionNo: number,
  question: string
}
