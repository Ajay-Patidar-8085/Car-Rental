// src/App.jsx

import React, { lazy, Suspense } from 'react';

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";

import './App.css';



// Lazy route-level components only

const HomeComponent = lazy(() => import('./Pages/Home'));
const AllCarsPageComponent = lazy(() => import('./Pages/AllCarsPage'));
const CarDetailPageComponent = lazy(() => import('./Pages/CarDetailPage'));
const BillingPageComponent = lazy(() => import('./Pages/BillingPage'));

const NavbarComponent = lazy(() => import('./Components/Navbar'));

const FooterComponent = lazy(() => import('./Components/Footer'));
const Account = lazy(() => import('./Pages/Account'));



function App() {

  return (
    <div className="min-h-screen bg-[#F6F7F9]">
      <Router>
        {/* Lazy-load Navbar (you can keep this static if preferred) */}
        <Suspense
          fallback={
            <div className="max-w-[1200px] mx-auto mt-9">
              <Skeleton height={50} />
            </div>
          }
        >
          <NavbarComponent />
        </Suspense>

        {/* Main Content Area with background */}
        <main className="bg-[#F6F7F9]">
          <Routes>
            <Route path="/" element={
              <Suspense fallback={<div className="max-w-[1200px] mx-auto mt-9"><Skeleton height={300} /></div>}>
                <HomeComponent />
              </Suspense>
            } />
            <Route path="/cars" element={
              <Suspense fallback={<div className="max-w-[1200px] mx-auto mt-9"><Skeleton height={300} /></div>}>
                <AllCarsPageComponent />
              </Suspense>
            } />
            <Route path="/car/:carName" element={
              <Suspense fallback={<div className="max-w-[1200px] mx-auto mt-9"><Skeleton height={300} /></div>}>
                <CarDetailPageComponent />
              </Suspense>
            } />
            <Route path="/billing" element={
              <Suspense fallback={<div className="max-w-[1200px] mx-auto mt-9"><Skeleton height={300} /></div>}>
                <BillingPageComponent />
              </Suspense>
            } />
            <Route path="*" element={
              <Suspense fallback={<div className="max-w-[1200px] mx-auto mt-9"><Skeleton height={300} /></div>}>
                <HomeComponent />
              </Suspense>
            } />
            <Route path="/account" element={
              <Suspense fallback={<div className="max-w-[1200px] mx-auto mt-9"><Skeleton height={300} /></div>}>
                < Account />
              </Suspense>} ></Route>
          </Routes>


        </main>

        {/* Footer */}
        <Suspense
          fallback={
            <div className="max-w-[1200px] mx-auto mt-9">
              <Skeleton height={200} />
            </div>
          }
        >
          <FooterComponent />
        </Suspense>
      </Router>
    </div>
  );

}



export default App;

