import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CRow, CCol, CImage } from '@coreui/react'
import { postRequest } from '../../components/services/apiServices'
import { useLocation } from 'react-router-dom'

// Example large JSON object (you can replace it with your own large data)
const jsonData = {
  name: 'Sample Item',
  description: 'This is a detailed description of the sample item.',
  image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...',
  price: '$100',
  category: 'Electronics',
  stock: 'Available',
  manufacturer: 'Sample Manufacturer',
  specifications: {
    weight: '1kg',
    dimensions: '10x10x10 cm',
    warranty: '1 year',
  },
}

export default function PreviewPage() {
  const [jsonData, setJsonData] = useState<any>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchReportsOfId()
  }, [])
  const { id, ReportType } = useLocation().state;

  const fetchReportsOfId = async () => {
    let response = await postRequest('fetchDetailedReportsOfId', {
        ReportType: ReportType ?? "",
        id: id ?? ""
    }, setLoading)
    setJsonData(response?.data || [])
  }
  if(!jsonData[0]) return null;
  let jsonDataWIthoutImage = {...jsonData[0]};
  delete jsonDataWIthoutImage.image;
  delete jsonDataWIthoutImage.initial_image;
  return (
    <CRow>
      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            <strong>Application Details</strong>
          </CCardHeader>
          <CCardBody>
            {/* Loop through the JSON object */}
            {Object.entries(jsonDataWIthoutImage).map(([key, value]: any) => {
              return (
                <div key={key} style={{ display: 'flex', marginBottom: '10px' }}>
                  {/* Fixed width for keys */}
                  <div style={{ minWidth: '150px', fontWeight: 'bold' }}>
                    {key}:
                  </div>
                  <div>{value}</div>
                </div>
              )
            })}
          </CCardBody>
        </CCard>
      </CCol>
      <CCol xs="12" md="6">
        <CCard>
          <CCardHeader>
            <strong>Application Images</strong>
          </CCardHeader>
          <CCardBody>
            {/* Display base64 Image */}
            {jsonData[0]['initial_image'] && (
              <div className="mt-3">
                <p>Intial Image:</p>
                <CImage
                  src={`data:image/png;base64,${jsonData[0]['initial_image']}`}
                  alt="Item Image"
                  fluid
                  className="mt-2"
                  style={{ width: 200, height: 200 }}
                />
              </div>
            )}
            {jsonData[0]['image'] && (
              <div className="mt-3">
                <p>Delivered:</p>
                <CImage
                  src={`data:image/png;base64,${jsonData[0]['image']}`}
                  alt="Item Image"
                  fluid
                  className="mt-2"
                  style={{ width: 200, height: 200 }}
                />
              </div>
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}
