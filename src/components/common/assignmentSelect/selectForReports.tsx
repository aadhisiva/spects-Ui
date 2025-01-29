import { CCol, CFormInput, CRow } from '@coreui/react'
import React, { ChangeEvent, useEffect, useState } from 'react'
import SelectOption from '../form/select'
import { DATATYPE_OPTIONS, RURAL_URBAN, statusOptions } from '../../utils/constants'
import ButtonWithLoader from '../button'
import useForm from '../form/formValidation'
import axiosInstance from '../../../axiosInstance'
import userSelectedValue from '../customHooks/userSelectedValue'
import useAccess from '../customHooks/useAccess'
import SelectDate from '../form/date'
import { CDatePicker } from '@coreui/react-pro'
import { postRequest } from '../../services/apiServices'
import SpinnerLoder from '../spinnerLoder'

interface ISelectDistrict {
  handleSubmitForm?: any
  loading?: boolean
  handleDownloadReports?: any
  countsObj?: any
}

export default function SelectForReports({
  handleSubmitForm,
  loading,
  handleDownloadReports,
  countsObj,
}: ISelectDistrict) {
  const [isLoading, setLoading] = useState(false)
  const [districtDropdown, setDistrictDropdown] = useState([])
  const [talukDropdown, setTalukDropdown] = useState([])
  const [phcoDropdown, setPhcoDropdown] = useState([])
  const [subCenterDropdown, setSubCenterDropdown] = useState([])
  const [selectedDate, setSelectedDate] = useState<Date | null | any>(null)

  const [values, setValues] = useState({
    DataType: '',
    DistrictCode: '',
    TalukCode: '',
    PhcoCode: '',
    SubCenterCode: '',
    Status: '',
    FromDate: '',
    ToDate: '',
  })

  const [{ Mobile }] = userSelectedValue()
  const [{ dropDownAuthAccess, talukAcces, phcoAcces, subCenterAcces, authValues }] = useAccess()

  const handleDataTypeDropdown = async (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      DataType: e.target.value,
      DistrictCode: '',
      TalukCode: '',
      PhcoCode: '',
      SubCenterCode: '',
      Status: '',
      FromDate: '',
      ToDate: '',
    })
    let response = await postRequest(
      'getMasterDropDownForReports',
      {
        ReqType: 1,
        loginType: authValues.DistrictLevel,
        ListType: dropDownAuthAccess,
        Mobile,
      },
      setLoading,
    )
    setLoading(false)
    setDistrictDropdown(response?.data)
  }

  const handleDistictDropdown = async (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      DistrictCode: e.target.value,
      TalukCode: '',
      PhcoCode: '',
      SubCenterCode: '',
      Status: '',
      FromDate: '',
      ToDate: '',
    })
    setLoading(true)
    let response = await postRequest(
      'getMasterDropDownForReports',
      {
        ReqType: 2,
        UDCode: e.target.value,
        loginType: authValues.TalukLevel,
        ListType: dropDownAuthAccess,
        Mobile,
      },
      setLoading,
    )
    setLoading(false)
    setTalukDropdown(response?.data)
  }

  const handleTalukDropdown = async (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      TalukCode: e.target.value,
      PhcoCode: '',
      SubCenterCode: '',
      Status: '',
      FromDate: '',
      ToDate: '',
    })
    setLoading(true)
    let response = await postRequest(
      'getMasterDropDownForReports',
      {
        ReqType: 3,
        UDCode: values.DistrictCode,
        UTCode: e.target.value,
        loginType: authValues.PhcoLevel,
        ListType: dropDownAuthAccess,
        Mobile,
      },
      setLoading,
    )
    setLoading(false)
    setPhcoDropdown(response?.data)
  }

  const handlePhcoDropdown = async (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      PhcoCode: e.target.value,
      SubCenterCode: '',
      Status: '',
      FromDate: '',
      ToDate: '',
    })
    setLoading(true)
    let response = await postRequest(
      'getMasterDropDownForReports',
      {
        ReqType: 4,
        UDCode: values.DistrictCode,
        UTCode: values.TalukCode,
        UPCode: e.target.value,
      },
      setLoading,
    )
    setLoading(false)
    setSubCenterDropdown(response?.data)
  }

  const handleChangeStatus = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      Status: e.target.value,
      FromDate: '',
      ToDate: '',
    })
  }

  const handleChangeFromDate = (e: ChangeEvent<HTMLInputElement>): any => {
    setValues({
      ...values,
      FromDate: e.target.value,
      ToDate: '',
    })
  }

  const handleClearFilter = () => {
    setValues({
      DataType: '',
      DistrictCode: '',
      TalukCode: '',
      PhcoCode: '',
      SubCenterCode: '',
      Status: '',
      FromDate: '',
      ToDate: '',
    })
  }

  return (
    <div>
      <SpinnerLoder loading={loading} />
      <CRow style={{ rowGap: 15 }}>
        <SelectOption
          options={DATATYPE_OPTIONS}
          name={'DataType'}
          value={values.DataType}
          label={'DataType'}
          onChange={handleDataTypeDropdown}
        />
        <SelectOption
          options={districtDropdown}
          name={'DistrictCode'}
          value={values.DistrictCode}
          label={'District Name'}
          onChange={handleDistictDropdown}
        />
        <SelectOption
          options={talukDropdown}
          name={'TalukCode'}
          value={values.TalukCode}
          label={'Taluk Name'}
          onChange={handleTalukDropdown}
        />
        <SelectOption
          options={phcoDropdown}
          name={'PhcoCode'}
          value={values.PhcoCode}
          label={'Phco Name'}
          onChange={handlePhcoDropdown}
        />
        <SelectOption
          options={subCenterDropdown}
          name={'SubCenterCode'}
          value={values.SubCenterCode}
          label={'SubCenter Name'}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValues({ ...values, SubCenterCode: e.target.value })
          }
        />
        <SelectOption
          options={statusOptions}
          name={'Status'}
          value={values.Status}
          label={'Status'}
          onChange={handleChangeStatus}
        />
        <SelectDate
          label={'Select From Date'}
          value={selectedDate}
          isModal={true}
          onChange={handleChangeFromDate}
        />
        <SelectDate
          label={'Select To Date'}
          value={values.ToDate}
          name={'ToDate'}
          isModal={true}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setValues({ ...values, ToDate: e.target.value })
          }
        />
        <ButtonWithLoader
          title={'Search Reports'}
          loading={loading}
          handleClick={() => handleSubmitForm(values)}
        />
        <ButtonWithLoader
          title={'Download Reports'}
          handleClick={() => handleDownloadReports(values)}
        />
        <ButtonWithLoader title={'Clear Filters'} handleClick={handleClearFilter} />
        <CCol md={3} xs={6}>
          <span style={{ fontSize: '19px', fontWeight: 'bold' }}>
            TotalCount : {countsObj?.TotalCount || 0}
          </span>
        </CCol>
        <CCol md={3} xs={6}>
          <span style={{ fontSize: '19px', fontWeight: 'bold' }}>
            OrderPending : {countsObj?.Pending || 0}
          </span>
        </CCol>
        <CCol md={3} xs={6}>
          <span style={{ fontSize: '19px', fontWeight: 'bold' }}>
            ReadyForDeliver : {countsObj?.Ready || 0}
          </span>
        </CCol>
        <CCol md={3} xs={6}>
          <span style={{ fontSize: '19px', fontWeight: 'bold' }}>
            Delivered : {countsObj?.Delivered || 0}
          </span>
        </CCol>
      </CRow>
    </div>
  )
}
