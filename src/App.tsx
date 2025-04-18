import './App.css';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import React, { ReactNode } from 'react';
import Routes from './routes';
import { CsConfigProvider } from './contexts/ConfigContext';
import { CsThemeProvider } from './themes';
import "./locale/i18n";


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
    <CsConfigProvider>
      <CsThemeProvider>
        <Router>
          <Routes />
        </Router>
      </CsThemeProvider>
    </CsConfigProvider>
  );
}

export default App;
