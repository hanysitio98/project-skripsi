import { AuthProvider } from 'auth/useAuth';
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import { LoginPage } from 'views/component';
import { ChangePassword, EditBilling, EditEmployee, EditFreelancer, EditProject, EditTrainer, EditTraining } from 'views/component/components';
import { ProtectedRoute } from 'views/component/layout/ProtectedRoute';
import { Billing, Freelancer, Home, Participant, PriceList, Registration, Setting, Trainer, TrainingList, TrainingNext, TrainingHistory, TransactionHistory, UserProfile, Project, Catalog, EventDetail, SuccessPage } from 'views/component/pages';
import Employee from 'views/component/pages/Employee';

const AppRouter = () => {

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>

            <Route path="/catalog" element={<Catalog />} />
            <Route path="/event-detail/:id" element={<EventDetail />} />
            <Route path="/success/:id" element={<SuccessPage />} />
            <Route path="/registration/:id" element={<Registration />} />
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>} />
            <Route path="/signin" element={
              <LoginPage />} />

            <Route path="/profile/:id" element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>} />
            <Route path="/change-password/:id" element={
              <ProtectedRoute>
                <ChangePassword />
              </ProtectedRoute>} />
            <Route path="/setting" element={
              <ProtectedRoute>
                <Setting />
              </ProtectedRoute>} />
            <Route path="/training-list" element={
              <ProtectedRoute>
                <TrainingList />
              </ProtectedRoute>} />
            <Route path="/training-next" element={
              <ProtectedRoute>
                <TrainingNext />
              </ProtectedRoute>} />
            <Route path="/training-history" element={
              <ProtectedRoute>
                <TrainingHistory />
              </ProtectedRoute>} />
            <Route path="/participant" element={
              <ProtectedRoute>
                <Participant />
              </ProtectedRoute>} />
            <Route path="/freelancer" element={
              <ProtectedRoute>
                <Freelancer />
              </ProtectedRoute>} />
            <Route path="/trainer" element={<Trainer />} />

            <Route path="/price-list" element={
              <ProtectedRoute>
                <PriceList />
              </ProtectedRoute>} />
            <Route path="/transaction-history" element={
              <ProtectedRoute>
                <TransactionHistory />
              </ProtectedRoute>} />
            <Route path="/billing" element={
              <ProtectedRoute>
                <Billing />
              </ProtectedRoute>} />

            <Route path="/project" element={
              <ProtectedRoute>
                <Project />
              </ProtectedRoute>} />

            <Route path="/employee" element={
              <ProtectedRoute>
                <Employee />
              </ProtectedRoute>} />

            {/* <Route path="/add-freelancer" element={<AddFreelancer />} /> */}
            <Route path="/edit-freelancer/:id" element={
              <ProtectedRoute>
                <EditFreelancer />
              </ProtectedRoute>} />

            {/* <Route path="/add-trainer" element={<AddTrainer />} /> */}
            <Route path="/edit-trainer/:id" element={
              <ProtectedRoute>
                <EditTrainer />
              </ProtectedRoute>} />

            <Route path="/edit-employee/:id" element={
              <ProtectedRoute>
                <EditEmployee />
              </ProtectedRoute>} />

            <Route path="/edit-training/:id" element={
              <ProtectedRoute>
                <EditTraining />
              </ProtectedRoute>} />

            <Route path="/edit-billing/:id" element={
              <ProtectedRoute>
                <EditBilling />
              </ProtectedRoute>} />

            <Route path="/edit-project/:id" element={
              <ProtectedRoute>
                <EditProject />
              </ProtectedRoute>} />

          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default AppRouter;