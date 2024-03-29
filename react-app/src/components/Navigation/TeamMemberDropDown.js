import React, { useState, useEffect, useRef, useContext } from "react";
import { useSelector } from "react-redux";
import OpenModalButton from "../OpenModalButton";
import DeleteTeamMemberModal from "../TeamModals/DeleteTeamMemberModal";
import { ThemeContext } from '../../context/Themes'
import "./TeamMemberDropDown.css"

function TeamMemberDropDown({ user, className, initials, isSessionUser = false }) {

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
    const sessionUser = useSelector(state => state.session.user);
    const singleProject = useSelector(state => state.project.singleProject)
    const { theme } = useContext(ThemeContext)

    const isProjectOwner = sessionUser.id === singleProject.owner_id;
    const isCurrentUserProjectOwner = isProjectOwner && sessionUser.id === user.id;
    const isCurrentUser = sessionUser.id === user.id;
    const isCurrentUserAndNotOwner = isCurrentUser && !isProjectOwner;
    const shouldShowButton = isProjectOwner || isCurrentUser;

    let buttonText = isCurrentUserAndNotOwner ? "Leave Project" : "Remove User";
    const isLoggedInProjectOwnerClassName = "remove-user-from-team-button" + (isCurrentUserProjectOwner ? " hidden" : "");



    const openMenu = () => {
        if (showMenu) return;
        setShowMenu(true);
    };

    useEffect(() => {
        if (!showMenu) return;

        const closeMenu = (e) => {
            if (!ulRef.current.contains(e.target)) {
                setShowMenu(false);
            }
        };

        document.addEventListener("click", closeMenu);

        return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);


    const ulClassName = "user-dropdown" + (showMenu ? "" : " hidden");
    const closeMenu = () => setShowMenu(false);

    const circleStyle = {
        backgroundColor: isCurrentUser ? `${theme['active']}` : ''
    }
    return (
        <div>
            <button onClick={openMenu} className={className} style={circleStyle}>
                {initials}
            </button>
            <div className={ulClassName} ref={ulRef}>
                <div className="user-dropdown-name">{user.first_name} {user.last_name}</div>
                <div className="user-dropdown-email">{user.email}</div>
                {/* if the logged in user is the project owner or the user is the logged in user,
                create the buttons. If the project owner is the logged in user, no button only for him */}
                {shouldShowButton && (
                    <OpenModalButton
                        buttonText={buttonText}
                        onButtonClick={closeMenu}
                        modalComponent={<DeleteTeamMemberModal user={user} project={singleProject} isCurrentUserAndNotOwner={isCurrentUserAndNotOwner}/>}
                        className={`modal-button ${isLoggedInProjectOwnerClassName}`}
                    />
                )}
            </div>
        </div>
    );
}

export default TeamMemberDropDown;
