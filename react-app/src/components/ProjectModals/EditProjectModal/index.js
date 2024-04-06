import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { editProject } from "../../../store/project";
import { ThemeContext } from "../../../context/Themes";
import "./EditProjectModal.css"

function EditProjectFormModal({ project }) {

    function dateFormatter(date) {
        const dateArr = date.split("/")
        return `${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`
    }

    const dispatch = useDispatch();
    const { theme } = useContext(ThemeContext)
    const [projectName, setProjectName] = useState(project.name);
    const [projectIcon, setProjectIcon] = useState(project.icon);
    const [projectStatus, setProjectStatus] = useState(project.status);
    const [errors, setErrors] = useState([]);
    const [dueDate, setDueDate] = useState(dateFormatter(project.due_date));
    const { closeModal } = useModal();


    const today = new Date();
    const year = today.getUTCFullYear();
    let month = today.getUTCMonth() + 1;
    if (month < 10) {
        month = `0${month}`
    }
    const day = today.getUTCDate();
    const date = `${month}/${day}/${year}`;

    const dateParser = (date) => {
        const dateArr = date.split("-")
        return `${dateArr[1]}/${dateArr[2]}/${dateArr[0]}`
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedProject = {
            name: projectName,
            icon: projectIcon,
            status: projectStatus,
            due_date: dateParser(dueDate),
            updated_at: date
        }
        return await (dispatch(editProject(updatedProject, project.id)))
            .then((res) => {
                if (res.errors) {
                    let errorsArr = []
                    for (const error of res.errors) {
                      const errorSplit = error.split(" : ")
                      errorsArr.push(errorSplit[1])
                    }
                    setErrors(errorsArr)
                } else closeModal()
            })
    };

    let errorsClassName="errors-container"
    if (errors.length > 0) errorsClassName += " visible"
    return (
        <div id="edit-project-container">
            <div className="edit-project-header">Edit Project</div>
            <form id="edit-project-form-container" onSubmit={handleSubmit}>
                <div className={errorsClassName}>
                    {errors.map((error, idx) => (
                        <div className="individual-error"key={idx}>{error}</div>
                    ))}
                </div>
                <div id="create-project-form-name-container" className="label-input-container">
                    <label id="project-name-input-label">Project Name</label>
                    <input
                        id="project-name-input"
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                    />
                </div>
                <div id="create-project-icon-status-container">
                    <div id="create-project-form-icon-container"  className="label-input-container">
                        <label id="project-icon-dropdown-label">Project Icon</label>
                        <select
                            id="project-icon-dropdown-input"
                            className="dropdown-create"
                            value={projectIcon}
                            onChange={(e) => setProjectIcon(e.target.value)}
                            required
                        >
                            <option value="">Select an icon</option>
                            <option value="briefcase">Briefcase</option>
                            <option value="chat_bubble">Chat Bubble</option>
                            <option value="monitor">Monitor</option>
                            <option value="shoe">Shoe</option>
                        </select>
                    </div>
                    <div id="create-project-form-status-container" className="label-input-container">
                        <label id="project-status-dropdown-label">Project Status</label>
                        <select
                            id="project-status-dropdown-input"
                            className="dropdown-create"
                            value={projectStatus}
                            onChange={(e) => setProjectStatus(e.target.value)}
                            required
                        >
                            <option value="">Select a status</option>
                            <option value="On Track">On Track</option>
                            <option value="At Risk">At Risk</option>
                            <option value="Off Track">Off Track</option>
                            <option value="On Hold">On Hold</option>
                        </select>
                    </div>
                </div>
                <div id="create-project-form-due-date-container" className="label-input-container">
                    <label id="dueDate-label">Due Date</label>
                    <input
                        type="date"
                        id="dueDate-input"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        required
                    />
                </div>
                <button style={{backgroundColor: theme['active']}} id="edit-project-button" type="submit">Save</button>
            </form>
        </div>
    );
}

export default EditProjectFormModal;
