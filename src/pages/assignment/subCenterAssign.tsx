import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import BorderWithTitle from '../../components/common/borderWithTitle'
import PaginatedTable from '../../components/common/TableWithPagination'
import DistrictModal from '../../components/common/modals/districtModal'
import axiosInstance from '../../axiosInstance'
import SpinnerLoder from '../../components/common/spinnerLoder'
import SelectSubCenter from '../../components/common/assignmentSelect/selectSubCenter'
import userSelectedValue from '../../components/common/customHooks/userSelectedValue'
import useAccess from '../../components/common/customHooks/useAccess'
import './assignment.css'
import { postRequest } from '../../components/services/apiServices'

const headCells = [
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
    id: 'RoleName',
    numeric: false,
    disablePadding: true,
    label: 'Role Name',
  },
  {
    id: 'Type',
    numeric: false,
    disablePadding: true,
    label: 'Type',
  },
  {
    id: 'Name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
  },
  {
    id: 'Mobile',
    numeric: false,
    disablePadding: false,
    label: 'Mobile',
  },
  {
    id: 'Action',
    numeric: false,
    disablePadding: false,
    label: 'Action',
  },
]

export default function PhcoAssign() {
  const [loading, setLoading] = useState(false)
  const [isBloading, setBLoading] = useState(false)
  const [visible, setVisible] = useState(false)
  const [totalCount, setTotalCount] = useState(0)
  const [formData, setFormData] = useState({})
  const [tableData, setTableData] = useState([])
  const [copyOfTableData, setCopyOfTableData] = useState([])

  const [currentPage, setCurrentPage] = useState(1) // Current page
  const [rowsPerPage, setRowsPerPage] = useState(10) // Rows per page

  const [{ loginAuthAccess, mobileAuthAccess }] = useAccess()
  const [{ Mobile }] = userSelectedValue()

  const fecthIntialData = async () => {
    setLoading(true)
    let { data } = await postRequest(
      'getAssignedMasters',
      {
        ReqType: loginAuthAccess,
        DataType: 'SubCenter',
        Mobile: mobileAuthAccess ? Mobile : '',
        PageNumber: currentPage,
        RowsPerPage: rowsPerPage,
      },
      setLoading,
    )
    setTableData(data.TotalData)
    setCopyOfTableData(data?.TotalData)
    setTotalCount(data?.TotalCount || 0)
  };

  useEffect(() => {
    fecthIntialData()
  }, [rowsPerPage, currentPage])

  const handleClickAdd = (values: any) => {
    setFormData(values)
    setVisible(!visible)
  }

  const handleSubmitModal = async (values: any) => {
    setLoading(true)
    values['ReqType'] = 2
    await postRequest('assignmentProcess', values, setLoading)
    await fecthIntialData()
    setVisible(false)
  }

  const openModalForm = () => {
    return (
      <DistrictModal
        setVisible={setVisible}
        visible={visible}
        handleSubmitModal={handleSubmitModal}
        title={'SubCenter Modal'}
        formData={formData}
        isLastAssign={true}
      />
    )
  }

  const handleClickModify = (data: any) => {
    setFormData(data)
    setVisible(!visible)
  }

  return (
    <div>
      {visible && openModalForm()}
      <SpinnerLoder loading={loading} />
      <BorderWithTitle title={'Assignment'}>
        <SelectSubCenter handleSubmitForm={handleClickAdd} loading={isBloading} />
      </BorderWithTitle>
      <PaginatedTable
        headCells={headCells}
        handleClickModify={handleClickModify}
        title={'SubCenter Data'}
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
