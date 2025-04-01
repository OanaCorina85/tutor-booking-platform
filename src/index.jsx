// src/index.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BookingForm from './pages/bookingForm'; 
import HomePage from './pages/home.page';
import TemplatePage from './pages/template.page';
import SchedulePage from './pages/clientsBookings';
import hocs from './common/hocs';


createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route index={true} element={<HomePage />} />
          <Route path="/template" element={hocs.WithAuth(TemplatePage)} />
          <Route path="/appointments" element={<SchedulePage />} />
          <Route path="/schedule" element={<BookingForm />} /> {/* Ruta pentru BookingForm */}

        </Routes>
      </BrowserRouter>
  </StrictMode>
);

