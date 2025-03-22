// src/index.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppointmentsProvider } from './pages/appointmentsContext';
import BookingForm from './pages/bookingClientForm'; // Importăm BookingForm
import HomePage from './pages/home.page';
import TemplatePage from './pages/template.page';
import SchedulePage from './pages/programariClienti';

import hocs from './common/hocs';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppointmentsProvider>
      <BrowserRouter>
        <Routes>
          <Route index={true} element={<HomePage />} />
          <Route path="/template" element={hocs.WithAuth(TemplatePage)} />
          <Route path="/appointments" element={<SchedulePage />} />
          <Route path="/schedule" element={<BookingForm />} /> {/* Ruta pentru BookingForm */}

        </Routes>
      </BrowserRouter>
    </AppointmentsProvider>
  </StrictMode>
);
