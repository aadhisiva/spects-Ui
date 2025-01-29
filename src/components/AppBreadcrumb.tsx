import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'

import routes from '../routes'

import { CBreadcrumb, CBreadcrumbItem, CCol, CRow } from '@coreui/react'
import './sidebar.css'

const AppBreadcrumb = () => {
  const currentLocation = useLocation().pathname

  const getRouteName = (pathname: any, routes: any) => {
    const currentRoute = routes.find((route: any) => route.path === pathname)
    return currentRoute ? currentRoute.name : false
  }

  const getBreadcrumbs = (location: any) => {
    const breadcrumbs: any = []
    location.split('/').reduce((prev: any, curr: any, index: any, array: any) => {
      const currentPathname = `${prev}/${curr}`
      const routeName = getRouteName(currentPathname, routes)
      routeName &&
        breadcrumbs.push({
          pathname: currentPathname,
          name: routeName,
          active: index + 1 === array.length ? true : false,
        })
      return currentPathname
    })
    return breadcrumbs
  }

  const breadcrumbs = getBreadcrumbs(currentLocation)

  return (
    <>
      <CCol md={6}>
        <CBreadcrumb className="my-0">
          <CBreadcrumbItem href="/spects/">Auth</CBreadcrumbItem>
          <CBreadcrumbItem active={true}>{currentLocation.split('/')[1]}</CBreadcrumbItem>
          {/* {breadcrumbs.map((breadcrumb: any, index: any) => {
        return (
          <CBreadcrumbItem
            {...(breadcrumb.active ? { active: true } : { href: breadcrumb.pathname })}
            key={index}
          >
            {breadcrumb.name}
          </CBreadcrumbItem>
        )
      })} */}
        </CBreadcrumb>
      </CCol>
      <CCol md={6}>
        <div className="scroll-container">
          <div className="scroll-content">
            {/* Replace this with your actual content */}
            <span className="scroll-title"> *** Spectacles distribution application ***</span>
          </div>
        </div>
      </CCol>
    </>
  )
}

export default React.memo(AppBreadcrumb)
