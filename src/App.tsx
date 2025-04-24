import './App.css';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import React, { ReactNode } from 'react';
import Routes from './routes';
import { CsConfigProvider } from './contexts/ConfigContext';
import { CsThemeProvider } from './themes';
import "./locale/i18n";
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { store } from './store';


interface RouterProps {
  children: ReactNode;
}

const Router: React.FC<RouterProps> = ({ children }) => {
  if (process.env.NODE_ENV === 'development') {
    return <BrowserRouter>{children}</BrowserRouter>;
  }
  return <HashRouter>{children}</HashRouter>;
};

function App() {
  return (
    <Provider store={store}>
      <CsConfigProvider>
        <CsThemeProvider>
          <Router>
            <Routes />
          </Router>
          <ToastContainer
            position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          // theme={theme.palette.mode}
          />
        </CsThemeProvider>
      </CsConfigProvider>
    </Provider>

  );
}

export default App;
