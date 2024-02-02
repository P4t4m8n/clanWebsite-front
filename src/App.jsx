import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { AppHeader } from "./cmps/AppHeader";
import { UnitIndex } from "./pages/UnitIndex";
import { UnitDetails } from "./cmps/UnitDetails";
import { UnitEdit } from "./pages/UnitEdit";
import { Home } from "./pages/Home";
import { EventCalendar } from './pages/EventCalendar';


export function App() {


    return (
        <>
            <Router>
                <section className="main-container">
                    <AppHeader />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/units" element={<UnitIndex />} />
                        <Route path="/units/:unitId" element={<UnitDetails />} />
                        <Route path="/units/edit" element={<UnitEdit />} />
                        <Route path="/units/:unitId/edit" element={<UnitEdit />} />
                        <Route path="/calender" element={<EventCalendar />}/>
                </Routes>
                </section>
            </Router>
        </>
    )


}