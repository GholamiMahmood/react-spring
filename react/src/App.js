import './App.css';
import { NavBar } from './components/nav-bar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { PageDaccueil } from './pages/accueil/accueil';
import { Connection } from './pages/connection';
import { RegisterPage } from './pages/register/register.page';
import { ProfilePage } from './pages/profile/profile';
import { MonPanier } from './pages/monpanier/monpanier';
import { AdminPage } from './pages/admin/admin.page';
import { NotFoundPage } from './pages/not-found/not-found.page';
import { UnauthorizedPage } from './pages/unauthorized/unauthorized.page';
import { AuthGuard } from './guards/auth.guard';
import { Role } from './models/role';

function App() {
  return (
      <BrowserRouter>
          <NavBar/>
          <div className="container">
              <Routes>
                  <Route path="/" element={<PageDaccueil/>}/>
                  <Route path="/accueil" element={<PageDaccueil/>}/>
                  <Route path="/connection" element={<Connection/>}/>
                  <Route path="/register" element={<RegisterPage/>}/>
                  <Route path="/monpanier" element={<MonPanier/>}/>
                  <Route path="/profile" element={
                      <AuthGuard roles={[Role.ADMIN, Role.USER]}>
                          <ProfilePage/>
                      </AuthGuard>
                  }
                  />

                  <Route path="/admin" element={
                      <AuthGuard roles={[Role.ADMIN]}>
                          <AdminPage/>
                      </AuthGuard>
                  }/>

                  <Route path="/404" element={<NotFoundPage/>}/>
                  <Route path="/401" element={<UnauthorizedPage/>}/>
                  <Route path="*" element={<NotFoundPage/>}/>
              </Routes>
          </div>
      </BrowserRouter>
  );
}

export default App;
