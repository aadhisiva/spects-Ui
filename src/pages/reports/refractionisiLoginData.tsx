import { useEffect, useState } from 'react'
import SpinnerLoder from '../../components/common/spinnerLoder'
import BorderWithTitle from '../../components/common/borderWithTitle'
import userSelectedValue from '../../components/common/customHooks/userSelectedValue'
import { postRequest, PostRequestWithdownloadFile } from '../../components/services/apiServices'
import PaginatedTable from '../../components/common/TableWithPagination'
import SelectRefractionistReport from '../../components/common/assignmentSelect/selectRefractionistReport'
import useAccess from '../../components/common/customHooks/useAccess'

const headCells = [
  {
    id: 'Mobile',
    numeric: false,
    disablePadding: true,
    label: 'Refractionist Mobile',
  },
  {
    id: 'Name',
    numeric: false,
    disablePadding: true,
    label: 'Refractionist Name',
  },
  {
    id: 'DistrictName',
    numeric: false,
    disablePadding: true,
    label: 'District Name',
  },
  {
    id: 'TalukName',
    numeric: false,
    disablePadding: true,
    label: 'Taluk Name',
  },
  {
    id: 'PhcoName',
    numeric: false,
    disablePadding: true,
    label: 'Phco Name',
  },
  {
    id: 'SubCenterName',
    numeric: false,
    disablePadding: true,
    label: 'SubCenter Name',
  },
  {
    id: 'UpdatedDate',
    numeric: false,
    disablePadding: true,
    label: 'Date&Time',
  },
  {
    id: 'TotalSubmit',
    numeric: false,
    disablePadding: true,
    label: 'TotalSubmit',
  }
]

export default function RefractionistLoginData() {
  const [totalCount, setTotalCount] = useState(0)
  const [tableData, setTableData] = useState([])
  const [copyOfTableData, setCopyOfTableData] = useState([])
  const [loading, setLoading] = useState(false)
  const [currentPage, setCurrentPage] = useState(1) // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10) // Rows per page

  const [searchObject, setSearchObject] = useState<any>({})
  const [searching, setSearching] = useState(true)

  const [{ UserId }] = userSelectedValue();
  const [{ reportsReqType }] = useAccess();

  useEffect(() => {
    if (searching) {
      getDataFromApi()
    }
    setSearching(false);
  }, [rowsPerPage, currentPage, searching, searchObject])

  const getDataFromApi = async () => {
    const { FromDate, ToDate } = searchObject
    let response = await postRequest(
      'fetchRefraLoginReports',
      {
        DataType: reportsReqType,
        FromDate: FromDate || null,
        ToDate: ToDate || null,
        PageNumber: currentPage,
        RowsPerPage: rowsPerPage,
      },
      setLoading,
    )
    setTableData(response?.data.TotalData)
    setCopyOfTableData(response?.data.TotalData)
    setTotalCount(response?.data.TotalCount)
    setLoading(false)
  }

  const handleSearchData = (values: any) => {
    setSearchObject(values)
    setSearching(true)
  }

  const handleDownloadReports = async (values: any) => {
    const { FromDate, ToDate } = values
    await PostRequestWithdownloadFile(
      'downloadRefraLoginReports',
      {
        FromDate: FromDate || null,
        ToDate: ToDate || null,
        PageNumber: currentPage,
        RowsPerPage: rowsPerPage,
      },
      `spectacles_${new Date().toJSON().split('T')[0]}`,
    )
  }
  const handleClickModify = () => {}
  return (
    <div>
      <SpinnerLoder loading={loading} />
      <BorderWithTitle title={'Search Date Wise Reports'}>
        <SelectRefractionistReport
          handleSubmitForm={handleSearchData}
          handleDownloadReports={handleDownloadReports}
        />
      </BorderWithTitle>
      <PaginatedTable
        headCells={headCells}
        handleClickModify={handleClickModify}
        title={'Refractionist Login Report'}
        originalData={tableData}
        totalCount={totalCount}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        pagination={true}
      />
    </div>
  )
}
