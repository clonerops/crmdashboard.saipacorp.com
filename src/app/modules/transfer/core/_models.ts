export interface BLandsByStatus {
    fromDate: string
    toDate: string
    contractor_id: number
}
export interface BLandsCarsByStatus extends BLandsByStatus{
    dealer_no: number
}