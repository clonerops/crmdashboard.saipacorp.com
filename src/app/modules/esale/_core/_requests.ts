import {dashboardHttp} from '../../../../_cloner/helpers/axiosConfig'
import {
  SaleByProductDepositorsReportRequest,
  SaleByProductInvoicedReportDetailRequest,
  SaleByProductInvoicedReportRequest,
  SaleByProductPriorityReportRequest,
  SaleByProductReportRequest,
  SaleReportRequest,
} from './_models'

const getSaleTotalTypes = async () => {
  const {data} = await dashboardHttp.get('LotteryWinnerReport/GetSaleTotalTypes')
  return data
}
const getSaleTotalTypeDetails = async (id: number) => {
  const {data} = await dashboardHttp.get(
    `LotteryWinnerReport/GetSaleTotalTypeDetails?saleTotalTypeId=${id}`
  )
  return data
}

const getDeliverDates = async () => {
  const {data} = await dashboardHttp.get('LotteryWinnerReport/GetDeliverDates')
  return data
}

const getWinnerTypes = async () => {
  const {data} = await dashboardHttp.get('LotteryWinnerReport/GetWinnerTypes')
  return data
}

// Reports
const getSaleMountReport = async () => {
  const {data} = await dashboardHttp.get('LotteryWinnerReport/GetSaleStatisticsReport', {
    headers: {
      saletypeId: 2,
      saleTotalTypeDetailId: 0,
      isJavani: -1,
    },
  })
  return data
}
const getSaleReport = async (formData: SaleReportRequest) => {
  const {data} = await dashboardHttp.get('LotteryWinnerReport/GetSaleStatisticsReport', {
    headers: {
      saletypeId: formData.saletypeId,
      saleTotalTypeDetailId: formData.saleTotalTypeDetailId,
      isJavani: formData.isJavani,
    },
  })
  return data
}

const getSaleByProductReport = async (formData: SaleByProductReportRequest) => {
  const {data} = await dashboardHttp.get('LotteryWinnerReport/GetSaleStatisticsByCarTypeReport', {
    headers: {
      saletypeId: formData.saletypeId,
      saleTotalTypeDetailId: formData.saleTotalTypeDetailId,
      isJavani: formData.isJavani,
      WinnerType: formData.winnerType,
    },
  })
  return data
}
const getSaleByProductPriorityReport = async (formData: SaleByProductPriorityReportRequest) => {
  const {data} = await dashboardHttp.get(
    'LotteryWinnerReport/GetSaleStatisticsByPriorityProductReport',
    {
      headers: {
        saletypeId: formData.saletypeId,
        saleTotalTypeDetailId: formData.saleTotalTypeDetailId,
        priority: formData.priority,
        isJavani: formData.isJavani,
        winnerType: formData.winnerType,
      },
    }
  )
  return data
}
const getSaleByProductDepositorsReport = async (formData: SaleByProductDepositorsReportRequest) => {
  const {data} = await dashboardHttp.get(
    'LotteryWinnerReport/GetPayedStatisticByCarType',
    {
      headers: {
        fromDate: formData.fromDate,
        toDate: formData.toDate,
        saletypeId: formData.saletypeId,
        saleTotalTypeDetailId: formData.saleTotalTypeDetailId,
        isJavani: formData.isJavani,
        priority: formData.priority,
      },
    }
  )
  return data
}
const getSaleByProductInvoicedReport = async (formData: SaleByProductInvoicedReportRequest) => {
  const {data} = await dashboardHttp.get(
    'LotteryWinnerReport/GetAddmissionStatisticByCarType',
    {
      headers: {
        saletypeId: formData.saletypeId,
        saleTotalTypeDetailId: formData.saleTotalTypeDetailId,
        isJavani: formData.isJavani,
        priority: formData.priority
      },
    }
  )
  return data
}
const getSaleByProductInvoicedReportDetail = async (formData: SaleByProductInvoicedReportDetailRequest) => {
  const {data} = await dashboardHttp.get(
    'LotteryWinnerReport/GetAddmissionStatisticDetailByCarType',
    {
      headers: {
        saletypeId: formData.saletypeId,
        saleTotalTypeDetailId: formData.saleTotalTypeDetailId,
        isJavani: formData.isJavani,
        priority: formData.priority
      },
    }
  )
  return data
}
const getSaleByProductPriorityAndSaleDetailReport = async (formData: SaleReportRequest) => {
  const {data} = await dashboardHttp.get('LotteryWinnerReport/GetSaleStatByDeliverDate', {
    headers: {
      saletypeId: formData.saletypeId,
      saleTotalTypeDetailId: formData.saleTotalTypeDetailId,
      isJavani: formData.isJavani,
    },
  })
  return data
}

// Tables Details
const getSaleDetailsReport = async (formData: SaleReportRequest) => {
  const {data} = await dashboardHttp.get('LotteryWinnerReport/GetSaleReportByCar', {
    headers: {
      saletypeId: formData.saletypeId,
      saleTotalTypeDetailId: formData.saleTotalTypeDetailId,
      isJavani: formData.isJavani,
    },
  })
  return data
}
const getSaleTotalDetailReport = async (isJavani: number = -1) => {
  const {data} = await dashboardHttp.get('LotteryWinnerReport/GetSaleReportBySaleTotalType', {
    headers: {
      isJavani,
    },
  })
  return data
}

// Download Excel
const downloadTotalTypeExcel = async (formData: SaleReportRequest) => {
  const {data} = await dashboardHttp.get('LotteryWinnerFileReport/GetSaleExcelReportByCar', {
    responseType: 'arraybuffer',
    headers: {
      'Content-Type': 'blob',
      saletypeId: formData.saletypeId,
      saleTotalTypeDetailId: formData.saleTotalTypeDetailId,
      isJavani: formData.isJavani,
    },
  })
  return data
}
const downloadTotalTypeDetailExcel = async (isJavani: number = -1) => {
  const {data} = await dashboardHttp.get('LotteryWinnerFileReport/GetSaleExcelReportBySaleTotalType', {
    responseType: 'arraybuffer',
    headers: {
      isJavani,
      'Content-Type': 'blob',
    },
  })
  return data
}

const downloadInvoicedDetailExcel = async (formData: SaleByProductInvoicedReportDetailRequest) => {
  const {data} = await dashboardHttp.get('LotteryWinnerFileReport/GetAdmsStatisticDetailByCarTypeExcelRep', {
    responseType: 'arraybuffer',
    headers: {
      'Content-Type': 'blob',
      saletypeId: formData.saletypeId,
      saleTotalTypeDetailId: formData.saleTotalTypeDetailId,
      isJavani: formData.isJavani,
      priority: formData.priority
    },
  })
  return data
}

const downloadSamtDepartemantReportExcel = async (formData: SaleByProductInvoicedReportDetailRequest) => {
  const {data} = await dashboardHttp.get('LotteryWinnerFileReport/GetSamtStatisticExcelRep', {
    responseType: 'arraybuffer',
    headers: {
      'Content-Type': 'blob',
      saletypeId: formData.saletypeId,
      saleTotalTypeDetailId: formData.saleTotalTypeDetailId,
      isJavani: formData.isJavani,
      priority: formData.priority
    },
  })
  return data
}




export {
  getSaleTotalTypes,
  getSaleTotalTypeDetails,
  getDeliverDates,
  getWinnerTypes,
  getSaleReport,
  getSaleMountReport,
  getSaleByProductReport,
  getSaleByProductPriorityReport,
  getSaleByProductPriorityAndSaleDetailReport,
  getSaleByProductDepositorsReport,
  getSaleByProductInvoicedReport,
  getSaleByProductInvoicedReportDetail,
  getSaleDetailsReport,
  getSaleTotalDetailReport,
  downloadTotalTypeExcel,
  downloadTotalTypeDetailExcel,
  downloadInvoicedDetailExcel,
  downloadSamtDepartemantReportExcel
}
