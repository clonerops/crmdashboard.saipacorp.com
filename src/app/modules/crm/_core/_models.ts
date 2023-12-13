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

export interface ISurvery extends ComplaintOrRequestSendData {
  carGroupID?: number
}

export interface ITopx {
  fromDate?: string
  toDate?: string
  top?: number
}
export interface ITopxFilter extends ITopx {
  carGroupID?: number
  kilometrFrom?: number
  kilometrTo?: number
}

export interface ICarType {
  typeID: number
  typeName: string
}