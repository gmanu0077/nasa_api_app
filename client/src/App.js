import Login from './pages/login';
import Signup from './pages/signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthContextProvider } from './context/context-api';
import { createBrowserHistory } from "@remix-run/router";
import Dashboard from './pages/dashboard';
import { LoginWITHROUTER } from './pages/login';
import { SignupWITHROUTER } from './pages/signup';
import { DashboardLog } from './pages/dashboard';
import './App.css'
function App() {
  const history = createBrowserHistory();
  return (
    <div className="App">
      <AuthContextProvider>
        <BrowserRouter history={history}>
          <Routes>
            <Route exact path="/" element={<LoginWITHROUTER />} />


            <Route path="/signup" element={<SignupWITHROUTER />} />
            <Route path="/dashboard" element={<DashboardLog />} />

          </Routes>








        </BrowserRouter>
      </AuthContextProvider>

    </div>
  );
}

export default App;
