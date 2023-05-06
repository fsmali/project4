import axios from "axios"
import { useState } from "react"
import { DEV_ENDPOINT_URL } from "../../consts";

const CreateDeveloper=()=>{
const [showError, setShowError] = useState(false);
const [createDev, setCreateDev] = useState({
title: '',
first_name: '',
last_name: '',
email: '',
based_in: '',
country: '',
img: '',
facebook: '',
instagram: '',
git_hub: '',
linkden: '',
info: '',
});

const onChange = (e) => {
let skillArray = [];
let projectArray = [];
if (e.target.name === 'project_url') {
projectArray.push(parseInt(e.target.value));
}
if (e.target.name === 'skill') {
skillArray.push(parseInt(e.target.value));
console.log(skillArray);
}

    setCreateDev({
      ...createDev,

      [e.target.name]:
        e.target.name === 'skill'
          ? skillArray
          : e.target.name === 'project_url'
          ? projectArray
          : e.target.value,
    });
    console.log(createDev);

};
const onSubmit = async (e) => {
e.preventDefault();
console.log('submit button click');
const token = localStorage.getItem('token');
const requestConfing = {
headers: { authorization: `Bearer ${token}` },
};
console.log({ token });

    try {
      // console.log('request body ', createDev);
      // console.log('request heading', requestConfing);

      const { res } = await axios.post(
        'http://localhost:8000/developers/',
        // createDev,
        // requestConfing
      );

      console.log(res);
    } catch (e) {
      console.log(e);
      setShowError(true);
    }

};

return (
<div className="view">
<h1>Create developer Page</h1>

      {showError && <div className="error">Something Went Wrong.</div>}
      <form className="register_page" onSubmit={onSubmit}>
        <input
          placeholder="Job title*"
          name="title"
          value={createDev.title}
          onChange={onChange}
        />
        <input
          placeholder="First name*"
          name="first_name"
          value={createDev.first_name}
          onChange={onChange}
        />
        <input
          placeholder="Lastname*"
          name="last_name"
          value={createDev.last_name}
          onChange={onChange}
        />
        <input
          placeholder="Email*"
          name="email"
          value={createDev.email}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Based_in*"
          name="based_in"
          value={createDev.based_in}
          onChange={onChange}
        />
        <input
          type="Text"
          placeholder="Country*"
          name="country"
          value={createDev.country}
          onChange={onChange}
        />
        <input
          type="img"
          placeholder="Img*"
          name="img"
          value={createDev.img}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Facebook*"
          name="facebook"
          value={createDev.facebook}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Instagram*"
          name="instagram"
          value={createDev.instagram}
          onChange={onChange}
        />
        <input
          type="text"
          placeholder="Git_hub*"
          name="git_hub"
          value={createDev.git_hub}
          onChange={onChange}
        />
         <input
          type="text"
          placeholder="Linkden*"
          name="linkden"
          value={createDev.linkden}
          onChange={onChange}
        />

            {/* name="skill"
            value={createDev.skill}
            onChange={onChange}
            multiple */}
           <select>
            <option value="">Select a skill</option>
            <option value="12">python</option>
            <option value="13">Java Script</option>
            <option value="14">CSS</option>
            <option value="15">HTML</option>
            <option value="16">Node.Js</option>
            <option value="17">React</option>
            <option value="18">Mongo</option>
          </select>
          <select
            name="project_url"
            value={createDev.project_url}
            onChange={onChange}
            multiple
          >
            <option value="">Select a project URL</option>
            <option value="1">Tetris</option>
            <option value="2">React-Node.js Projetc</option>
            <option value="3">Mongo-React Project</option>
            <option value="4">d-jango-React Project</option>
          </select>
         <button className="register_button" type="submit">
          Submit Developer
        </button>
        <br /> <br /> <br />
        <br />
        <br />
      </form>
    </div>

);
}
export default CreateDeveloper
