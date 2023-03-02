import React, { useEffect } from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import LeftNavBar from '../Navigation/LeftNavBar';
import { clearProject } from "../../store/project"
import { useSelector, useDispatch } from 'react-redux';
import "./HomePage.css"

function HomePage() {
    const sessionUser = useSelector(state => state.session.user);
    const dispatch = useDispatch()

    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]


    useEffect(() => {
        dispatch(clearProject())
    }, [dispatch])

    const todayObj = new Date();
    const month = MONTHS[todayObj.getUTCMonth()]
    const day = DAYS[todayObj.getUTCDay()]
    const date = todayObj.getUTCDate()

    const today = `${day}, ${month} ${date}`

    if (!sessionUser) return (
        <Redirect to="/"/>
    )
    return (
        <div className='home-page-content-and-left-navbar'>
            <LeftNavBar />
            <div className='home-page-content-container'>
                <div className='home-page-header'>Home</div>
                <div className='home-page-date-greeting-container'>
                    <div className='home-page-date'>
                        {today}
                    </div>
                    <div className='home-page-greeting'>
                        {`Hello ${sessionUser.first_name}`}
                    </div>
                </div>
                <div id="home-page-body-container">
                    More content coming soon!
                </div>
            </div>
        </div>
    )
}

export default HomePage
