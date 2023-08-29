import React, { Dispatch, useEffect, useState } from 'react'
import { LayoutComponent } from '../Layout/LayoutComponent'
import { Routes, Route, BrowserRouter, redirect, Navigate, HashRouter } from 'react-router-dom'
import { SignInComponent } from './signIn/signInComponent'
import { DashBoardHierarchy } from '../pages/DashBoardHierarchy'
import { AssignmentTable } from '../pages/AssignmentTable'
import { ReportsTable } from '../pages/Reports/ReportsTable'
import { PageNotFound } from '../components/common/ErrorBoundaries/PageNotFound'
import { SessionTimeout } from '../components/common/Sessions/SessionTimeout'
import { useDispatch, useSelector } from "react-redux";
import { LogOut, getMe, reset } from '../redux/features/authSlice'
import { IStateValues } from '../type'
import { ShowInfoPageForOnline } from '../components/common/OnlineOroffline'
import { PrimaryScreeningReports } from '../pages/Reports/PScreeningReports'

var condition = navigator.onLine;

const AuthLayout: React.FC = () => {
  // auth user
  const dispatch: Dispatch<any> = useDispatch();

  const userStore: any = useSelector((state: IStateValues) => state?.auth);

  useEffect(() => {
    dispatch(getMe(''));
  }, [dispatch]);

  const handleLogOut = () => {
    dispatch(LogOut());
    dispatch(reset("logout"));
  };

  return (
    <div>
      {!condition && <ShowInfoPageForOnline />}
      <LayoutComponent>
        <SessionTimeout isAuthenticated={userStore?.isSuccess} logOut={handleLogOut} />
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Navigate to={"/signin"} replace={true} />} />
            <Route path='/signin' element={<SignInComponent />} />
            <Route path='/dashboard' element={<DashBoardHierarchy />} />
            <Route path='/assignment-list' element={<AssignmentTable />} />
            <Route path='/reports-list' element={<ReportsTable />} />
            <Route path='/primary-screening-list' element={<PrimaryScreeningReports />} />
            <Route path='*' element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </LayoutComponent>
    </div>
  )
};

export default AuthLayout;
