import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../consts';
import { useParams } from 'react-router-dom';
import '../create_developer/create_developer.scss';

const CreateDeveloper = () => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState([]);

  const [projectsName, setProjectsName] = useState([]);
  const [newProjectsName, setNewProjectsName] = useState([]);

  const [projectsDescription, setProjectsDescription] = useState([]);
  const [newProjectsDescription, setNewProjectsDescription] = useState([]);

  const [projectSource, setProjectsSource] = useState([]);
  const [newProjectsSource, setNewProjectsSource] = useState([]);

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
    skill: [],
    project: [],
  });

  const { id } = useParams();

  useEffect(() => {
    const fetchSkills = async () => {
      const { data } = await axios.get(`${API_URL}skills/`);
      setSkills(data); //This line is updating the state variable skills with the fetched data.
      console.log(data);
    };
    fetchSkills();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${ API_URL}/skills/`, {
        skill: newSkill,
      });
      console.log(res);
      setSkills([...skills, res.data]); //This line is updating the state variable skills by adding the newly added skill to the list of skills.
      setNewSkill(''); //This line is resetting the state variable newSkill to an empty string.
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewSkill = (e) => {
    //This line is defining a function called handleNewSkill that is called when a new skill is typed in the input field.
    setNewSkill(e.target.value); //This line is updating the state variable newSkill with the value of the input field.
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await axios.get(`${API_URL}projects/`);
      setProjectsName(data);
      console.log(data);
    };
    fetchProjects();
  }, []);

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/skills/${skillsid}/`, {
        project_name: newProjectsName,
        description: newProjectsDescription,
        source_link: newProjectsSource,
      });
      console.log(res);
      setProjectsName([...projectsName, res.data]);
      setNewProjectsName('');
      setProjectsDescription([...projectsDescription, res.data]);
      setNewProjectsDescription('');
      setProjectsSource([projectSource, res.data]);
      setNewProjectsSource('');
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewProjectName = (e) => {
    setNewProjectsName(e.target.value);
  };
  const handleProjectdescription = (e) => {
    setNewProjectsDescription(e.target.value);
  };
  const handleProjectSource = (e) => {
    setNewProjectsSource(e.target.value);
  };

  const onChange = (e) => {
    if (e.target.name === 'skills') {
      // add new skill id to the array of skill ids
      if (createDev.skill.includes(e.target.value)) {
        console.log('this is 119');
      } else {
        setCreateDev({
          ...createDev,
          skill: [...createDev.skill, e.target.value],
        });
      }
      //   setCreateDev({
      //     ...createDev,
      //     skill: [...createDev.skill, e.target.value],

      //   });
    } else if (e.target.name === 'projects') {
      // add new skill id to the array of skill ids
      setCreateDev({
        ...createDev,
        project: [...createDev.project, e.target.value],
      });
    } else {
      // update other fields of the form
      setCreateDev({
        ...createDev,
        [e.target.name]: e.target.value,
      });
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const requestConfing = {
      headers: { authorization: `Bearer ${token}` },
    };
    try {
      const { data } = await axios.post(
        `${API_URL}developers/`,
        createDev,
        requestConfing
      );
      console.log(data);
    } catch (e) {
      console.log(e);
      setShowError(true);
    }
  };

  return (
    <div className="create_contanier">
      <h2>Create Developer</h2>

      <form onSubmit={onSubmit}>
        <label>
          Title:
          <input type="text" name="title" onChange={onChange} required />
        </label>
        <br />
        <label>
          First Name:
          <input type="text" name="first_name" onChange={onChange} required />
        </label>
        <br />
        <label>
          Last Name:
          <input type="text" name="last_name" onChange={onChange} required />
        </label>
        <br />
        <label>
          Email:
          <input type="email" name="email" onChange={onChange} required />
        </label>
        <br />
        <label>
          Based In:
          <input type="text" name="based_in" onChange={onChange} required />
        </label>
        <br />
        <label>
          Country:
          <input type="text" name="country" onChange={onChange} required />
        </label>
        <br />
        <label>
          Profile Image URL:
          <input type="url" name="img" onChange={onChange} required />
        </label>
        <br />
        <label>
          Facebook:
          <input type="url" name="facebook" onChange={onChange} />
        </label>
        <br />
        <label>
          Instagram:
          <input type="url" name="instagram" onChange={onChange} />
        </label>
        <br />
        <label>
          GitHub:
          <input type="url" name="git_hub" onChange={onChange} />
        </label>
        <br />
        <label>
          LinkedIn:
          <input type="url" name="linkden" onChange={onChange} />
        </label>
        <br />
        <label>
          About:
          <textarea name="info" onChange={onChange} required />
        </label>
        <br />
        <label>
          Skills:
          <select
            name="skills"
            onChange={onChange}
            multiple
            required
            className="select"
          >
            {skills &&
              skills.map((skill) => (
                <option key={skill.id} value={skill.id}>
                  {skill.skill}
                </option>
              ))}
          </select>
        </label>
        <br />
        <label>
          Add new skill:
          <input type="text" value={newSkill} onChange={handleNewSkill} />
          <button type="button" onClick={handleSubmit}>
            Add Skill
          </button>
        </label>
        <br />
        <br />
        <label>
          Projects:
          <select
            name="projects"
            onChange={onChange}
            multiple
            required
            className="select"
          >
            {projectsName.map((elem) => (
              <option key={elem.id} value={elem.id}>
                {elem.project_name}
              </option>
            ))}
          </select>
        </label>
        <br />
        <label>
          <p>Add new Project:</p>

          <input
            type="text"
            value={newProjectsName}
            onChange={handleNewProjectName}
            placeholder="Project name"
          />

          <input
            type="text"
            value={newProjectsDescription}
            onChange={handleProjectdescription}
            placeholder="Project description"
          />
          <input
            type="text"
            value={newProjectsSource}
            onChange={handleProjectSource}
            placeholder="Project URL"
          />
          <button type="button" onClick={handleProjectSubmit}>
            Add Project
          </button>
        </label>
        <br />
        {showError && <p>Something went wrong. Please try again later.</p>}
        <br />
        <button type="submit">Create Developer</button>
      </form>
    </div>
  );
};
export default CreateDeveloper;
