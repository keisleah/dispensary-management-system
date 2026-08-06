import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { LoginPage } from '@/pages/login-page'
import { RegisterPage } from '@/pages/register-page'
import { DashboardOverviewPage } from '@/pages/dashboard-overview-page'
import { DashboardSymptomsPage } from '@/pages/dashboard-symptoms-page'
import { DashboardVisitsPage } from '@/pages/dashboard-visits-page'
import { DashboardProfilePage } from '@/pages/dashboard-profile-page'
import { DashboardLayout } from '@/layouts/dashboard-layout'
import { AdminLayout } from '@/layouts/admin-layout'
import { AdminStudentsPage } from '@/pages/admin-students-page'
import { AdminStudentDetailPage } from '@/pages/admin-student-detail-page'
import { AdminSymptomsPage } from '@/pages/admin-symptoms-page'
import { AdminInventoryPage } from '@/pages/admin-inventory-page'
import { ProtectedRoute } from '@/components/auth/protected-route'
import { AdminRoute } from '@/components/auth/admin-route'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardOverviewPage />} />
          <Route path="symptoms" element={<DashboardSymptomsPage />} />
          <Route path="visits" element={<DashboardVisitsPage />} />
          <Route path="profile" element={<DashboardProfilePage />} />
        </Route>

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route index element={<Navigate to="students" replace />} />
          <Route path="students" element={<AdminStudentsPage />} />
          <Route path="students/:studentId" element={<AdminStudentDetailPage />} />
          <Route path="symptoms" element={<AdminSymptomsPage />} />
          <Route path="inventory" element={<AdminInventoryPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App