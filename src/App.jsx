import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { AppHeader } from "./cmps/AppHeader"
import { UnitIndex } from "./pages/UnitIndex"
import { UnitDetails } from "./cmps/UnitDetails"
import { UnitEdit } from "./pages/UnitEdit"
import { Home } from "./pages/Home"
import { UserManager } from './cmps/User/UserMangar'
import { Provider } from 'react-redux'
import { store } from './store/store'
import { EventCalender } from './pages/EventCalender'
import { AdminDashboard } from './pages/AdminDashboard'
import { RoleEdit } from './cmps/AdminDashboard/Discord/Role/RoleEdit'
import { RoleDetails } from './cmps/AdminDashboard/Discord/Role/RoleDetails'
import '../src/styles/main.scss'
import { About } from './pages/About'
import { UserEdit } from './cmps/AdminDashboard/User/UserEdit'
import { UserDetails } from './cmps/User/userDetails'
import { ApplyCmp } from './cmps/User/ApplyCmp'

export function App() {

    return (
        <Provider store={store}>
            <Router>
                <section className="main-container grid">
                    <AppHeader />
                    <UserManager></UserManager>
                    <main className='main-content grid'>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/units" element={<UnitIndex />} />
                            <Route path="/units/:unitId" element={<UnitDetails />} />
                            <Route path="/units/edit" element={<UnitEdit />} />
                            <Route path="/units/:unitId/edit" element={<UnitEdit />} />
                            <Route path="/events" element={<EventCalender />} />
                            <Route path="/admin/user/:userId" element={<UserDetails />} />
                            <Route path="/apply" element={<ApplyCmp />} />
                            
                            <Route path="/admin" element={<AdminDashboard />} >
                                <Route path="/admin/role/edit/:roleId?" element={<RoleEdit />} />
                                <Route path="/admin/role/:roleId" element={<RoleDetails />} />
                                <Route path="/admin/user/edit/:userId?" element={<UserEdit />} />
                            </Route>
                        </Routes>
                    </main>
                </section>
            </Router>
        </Provider>
    )
}