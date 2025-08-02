import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.scss';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DetailsPanel from './components/DetailsPanel';
import { Provider } from 'react-redux';
import { store } from './store/store';

const root = document.getElementById('root');
if (!root) throw new Error('root not found');
createRoot(root).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/REACT2025Q3">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<App />}>
              <Route path="/" element={<DetailsPanel />} />
            </Route>
          </Routes>
        </ErrorBoundary>
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
