import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import UserAuthenticationLoginRegister from "pages/user-authentication-login-register";
import UserDashboard from "pages/user-dashboard";
import PropertyDetailView from "pages/property-detail-view";
import AdminDashboard from "pages/admin-dashboard";
import AdminPropertyManagement from "pages/admin-property-management";
import PropertyManagementAddEdit from "pages/property-management-add-edit";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<UserAuthenticationLoginRegister />} />
        <Route path="/user-authentication-login-register" element={<UserAuthenticationLoginRegister />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/property-detail-view" element={<PropertyDetailView />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-property-management" element={<AdminPropertyManagement />} />
        <Route path="/property-management-add-edit" element={<PropertyManagementAddEdit />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;