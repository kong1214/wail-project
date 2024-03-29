import React, { useState,useContext } from "react";
import { useDispatch } from "react-redux";
import { createProject } from "../../../store/project";
import { useHistory } from "react-router-dom";
import { ThemeContext } from "../../../context/Themes";
import "./CreateProjectPage.css"


function CreateProjectPage() {
  const dispatch = useDispatch();
  const history = useHistory()
  const [projectName, setProjectName] = useState("");
  const [projectIcon, setProjectIcon] = useState("");
  const [projectStatus, setProjectStatus] = useState("");
  const [errors, setErrors] = useState([]);
  const [dueDate, setDueDate] = useState({});
  const { theme } = useContext(ThemeContext)

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
    // if (projectName.length > 1 && projectName.length < 30) {
    //   window.alert(
    //     "The project name must be between 1 and 30 characters long."
    //   )
    //   return
    // }
    const newProject = {
      name: projectName,
      icon: projectIcon,
      status: projectStatus,
      due_date: dateParser(dueDate),
      created_at: date,
      updated_at: date
    }
    return await dispatch(createProject(newProject))
      .then((res) => {
        if (res.errors) {
          let errorsArr = []
          for (const error of res.errors) {
            const errorSplit = error.split(" : ")
            errorsArr.push(errorSplit[1])
          }
          setErrors(errorsArr)
        } else history.push(`/project/${res.id}`)
      })
    // .catch(async (res) => {
    //     const data = await res.json();
    //     if (data && data.errors) setErrors(data.errors)
    //   }
    // )
  };
  let errorsClassName = "errors-container"
  if (errors.length > 0) errorsClassName += " visible"
  return (
    <div className="create-project-center-container">
      <div className="create-project-container">
        <div className="new-project-header">New Project</div>
        <form className="create-project-form-container" onSubmit={handleSubmit}>
          <div className={errorsClassName}>
            {errors.map((error, idx) => (
              <div className="individual-error" key={idx}>{error}</div>
            ))}
          </div>
          <div id="create-project-form-name-container" className="label-input-container">
            <label id="project-name-input-label" className="form-label">Project Name</label>
            <input
              id="project-name-input"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              required
            />
          </div>
          <div id="create-project-icon-status-container">
            <div id="create-project-form-icon-container" className="label-input-container">
              <label id="project-icon-dropdown-label" className="form-label">Project Icon</label>
              <select
                id="project-icon-dropdown"
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
              <label id="project-status-dropdown-label" className="form-label">Project Status</label>
              <select
                id="project-status-dropdown"
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
            <label id="dueDate-label" className="form-label">Due Date</label>
            <input
              type="date"
              id="dueDate-input"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>
          <button style={{backgroundColor: theme['active']}} id="create-project-button" type="submit">Create</button>
        </form>
      </div>
      {/* <img id="create-project-project-screenshot" src={screenshot}></img> */}
    </div>
  );
}

export default CreateProjectPage;
