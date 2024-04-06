import React, { useState, useContext } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../../context/Modal";
import { createTask } from "../../../store/task";
import { ThemeContext } from "../../../context/Themes";
import "./CreateTaskModal.css";

function CreateTaskFormModal({ projectId, sections }) {

    const { theme } = useContext(ThemeContext)
    const dispatch = useDispatch();

    function sectionIdByName(name) {
        const section = sections.find(section => section.name === name)
        return section.id
    }

    const [taskName, setTaskName] = useState("");
    const [priority, setPriority] = useState("");
    const [taskStatus, setTaskStatus] = useState("");
    const [projectSectionName, setProjectSectionName] = useState("")
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [errors, setErrors] = useState([]);
    const { closeModal } = useModal();


    const today = new Date()
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
        const newTask = {
            name: taskName,
            priority: priority,
            status: taskStatus,
            section_id: sectionIdByName(projectSectionName),
            description: description,
            due_date: dateParser(dueDate),
            created_at: date,
            updated_at: date
        }
        return await dispatch(createTask(newTask, projectId))
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

    let errorsClassName = "errors-container"
    if (errors.length > 0) errorsClassName += " visible"

    return (
        <div id="create-task-container">
            <div className="create-task-header">Create Task</div>
            <form id="create-task-form-container" onSubmit={handleSubmit}>
                <div className={errorsClassName}>
                    {errors.map((error, idx) => (
                        <div className="individual-error" key={idx}>{error}</div>
                    ))}
                </div>
                <div id="create-project-form-name-container" className="label-input-container">
                    <label id="task-name-input-label">Task Name</label>
                    <input
                        id="task-name-input"
                        type="text"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}
                        required
                    />
                </div>
                <div id="create-task-priority-status-container">
                    <div id="task-priority-container" className="label-input-container">
                        <label id="task-priority-dropdown-label">Task Priority</label>
                        <select
                            id="task-priority-dropdown-input"
                            className="dropdown-create"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            required
                        >
                            <option value="">Select a priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </div>
                    <div id="task-status-container" className="label-input-container">
                        <label id="task-status-dropdown-label">Task Status</label>
                        <select
                            id="task-status-dropdown-input"
                            className="dropdown-create"
                            value={taskStatus}
                            onChange={(e) => setTaskStatus(e.target.value)}
                            required
                        >
                            <option value="">Select a status</option>
                            <option value="On Track">On Track</option>
                            <option value="At Risk">At Risk</option>
                            <option value="Off Track">Off Track</option>
                        </select>
                    </div>
                </div>
                <div id="create-task-section-dueDate-container">
                    <div id="create-task-section-container" className="label-input-container">
                        <label id="task-project-section-dropdown-label">Project Section</label>
                        <select
                            id="task-project-section-dropdown-input"
                            className="dropdown-create"
                            value={projectSectionName}
                            onChange={(e) => setProjectSectionName(e.target.value)}
                            required
                        >
                            <option value="">Select a section</option>
                            {sections.map(section => (
                                <option value={section.name}>{section.name}</option>
                            ))}
                        </select>
                    </div>
                    <div id="create-task-dueDate-container" className="label-input-container">
                        <label id="create-task-dueDate-label">Due Date</label>
                        <input
                            type="date"
                            id="create-task-dueDate-input"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <div id="task-description-container">
                    <label id="task-description-input-label">Task Description</label>
                    <textarea
                        id="task-description-input"
                        type="textarea"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button style={{backgroundColor: theme['active']}} id="create-task-button" type="submit">Create</button>
            </form>
        </div>
    );
}

export default CreateTaskFormModal;
