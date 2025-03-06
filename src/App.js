import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";

import Login from "./Components/User/Login/Login";
import Header from "./Components/User/Header/Header";
import Footer from "./Components/User/Footer/Footer";
import HeaderSection from "./Components/User/HeaderSection/HeaderSection";
import RegistForm from "./Components/User/RegistForm/RegistForm";
import HeaderSectionCompany from "./Components/User/HeaderSectionCompany/HeaderSectionCompany";
import JobVacancy from "./Components/User/JobVacancy/JobVacancy";
import ProfileUser from "./Components/User/ProfileUser/ProfileUser";
import StatusPekerjaan from "./Components/User/StatusPekerjaan/StatusPekerjaan";

// Admin
import SideBar from "./Components/Admin/SideBar/SideBar";
import AccountList from "./Components/Admin/UserList/UserList";
import JobVacanciesList from "./Components/Admin/JobVacanciesList/JobVacanciesList";
import CandidateList from "./Components/Admin/CandidateList/CandidateList";
import CandidateList2 from "./Components/Admin/CandidateList/CandidateList2";
import LoginAdmin from "./Components/Admin/LoginAdmin/LoginAdmin";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={
          <>
            <Header />
            <HeaderSection />
            <Footer />
          </>} />
        <Route exact path="/Login" element={
          <>
            <Login />
          </>} />
        <Route exact path="/RegistForm" element={
          <>
            <Header />
            <RegistForm />
            <Footer />
          </>} />
        <Route exact path="/Company" element={
          <>
            <Header />
            <HeaderSectionCompany />
            <Footer />
          </>} />
        <Route exact path="/JobVacancy" element={
          <>
            <Header />
            <JobVacancy />
            <Footer />
          </>} />
        <Route exact path="/ProfileUser" element={
          <>
            <Header />
            <ProfileUser />
            <Footer />
          </>} />
        <Route exact path="/StatusPekerjaan" element={
          <>
            <Header />
            <StatusPekerjaan />
            <Footer />
          </>} />
        <Route exact path="/Admin" element={
          <>
            <LoginAdmin />
          </>} />
        <Route exact path="/AccountList" element={
          <>
            <SideBar />
            <AccountList />
          </>} />
        <Route exact path="/JobVacanciesList" element={
          <>
            <SideBar />
            <JobVacanciesList />
          </>} />
        <Route exact path="/CandidateList" element={
          <>
            <SideBar />
            <CandidateList2 />
          </>} />
      </Routes>
    </Router>
  );
}

export default App;
