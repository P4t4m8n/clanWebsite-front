import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { AppHeader } from "./cmps/AppHeader"
import { UnitIndex } from "./pages/UnitIndex"
import { UnitDetails } from "./cmps/UnitDetails"
import { UnitEdit } from "./pages/UnitEdit"
import { Home } from "./pages/Home"
import { UserManager } from './cmps/User/UserMangar'
import { Provider } from 'react-redux'
import { store } from './store/store'
import '../src/styles/main.scss'
import { EventCalender } from './pages/EventCalender'

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
                            <Route path="/units" element={<UnitIndex />} />
                            <Route path="/units/:unitId" element={<UnitDetails />} />
                            <Route path="/units/edit" element={<UnitEdit />} />
                            <Route path="/units/:unitId/edit" element={<UnitEdit />} />
                            <Route path="/events" element={<EventCalender />} />
                        </Routes>
                    </main>
                </section>
            </Router>
        </Provider>
    )
}