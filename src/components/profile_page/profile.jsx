import { useEffect, useState } from 'react';
import '../profile_page/profile.scss';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../consts';

const ProfilePage = () => {
  const { id } = useParams();

  const [comment, setComment] = useState('');

  const [confirmMessage, setConfirmMessage] = useState('');

  const [profile, setProfile] = useState(undefined);

  const [error, setError] = useState('');

  const [skills, setSkills] = useState([]);
  const [skillsid, setSkillsid] = useState([]);

  const [projects, setProjects] = useState([]);
  const [projectsId, setProjectsId] = useState([]);
  const [description, setDescription] = useState([]);
  const [source, setSource] = useState([]);

  const [isInEditMode, setIsInEditMode] = useState({
    title: false,
    first_name: false,
    last_name: false,
    email: false,
    based_in: false,
    country: false,
    img: false,
    facebook: false,
    instagram: false,
    git_hub: false,
    linkden: false,
    info: false,
    skill: false,
    project: false,
  });

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

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${API_URL}developers/${id}/`);
      setProfile(data);
      // console.log(data);
      setCreateDev(data);
    };
    fetchData();
  }, []);

  const editSkill = async () => {
    try {
      const res = await axios.put(`http://localhost:8000/skills/${skillsid}/`, {
        skill: skills,
      });

      console.log('this is for data skill', res.data);
      setConfirmMessage(res.data.message);

      const { data } = await axios.get(`${API_URL}developers/${id}/`);

      setProfile(data);
    } catch (err) {
      setError(err.response.data.message);
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  const onskillHandler = (e) => {
    setSkills(e.target.value);
    setSkillsid(e.target.id);
  };
  const editProject = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8000/projects/${projectsId}/`,
        {
          project_name: projects,
          description: description,
          source_link: source,
        }
      );
      setConfirmMessage(res.data.message);
      const { data } = await axios.get(`${API_URL}developers/${id}/`);
      setProfile(data);
    } catch (err) {
      setError(err.response.data.message);
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  const onProjectHandler = (e) => {
    setProjects(e.target.value);
    setProjectsId(e.target.id);
  };
  const onDescriptionHandler = (e) => {
    setDescription(e.target.value);
    setProjectsId(e.target.id);
  };
  const onSourceHandler = (e) => {
    setSource(e.target.value);
    setProjectsId(e.target.id);
  };

  const addComment = async (Id) => {
    try {
      const data1 = await axios.post(`${API_URL}comments/`, {
        text: comment,
        developer: id,
      });
      setConfirmMessage(data1.data.message);
      const { data } = await axios.get(`${API_URL}developers/${Id}/`);
      console.log('this is data for comment', data);
      setComment('');
      setProfile(data);

      setTimeout(() => {
        setConfirmMessage('');
      }, 3000);
    } catch (err) {
      setError(err.response.data.message);
      setTimeout(() => {
        setError('');
      }, 3000);
    }
  };

  const onChangeHandler = (e) => {
    setComment(e.target.value);
  };

  const onSubmit = async (e) => {
    const token = localStorage.getItem('token');
    const requestConfing = {
      headers: { authorization: `Bearer ${token}` },
    };
    try {
      console.log('this is createdev', createDev);
      const { data } = await axios.put(
        `${API_URL}/developers/${id}/`,
        { ...createDev, skill: createDev.skill.map((i) => i.id) },
        { ...createDev, description: createDev.project.map((i) => i.id) },
        { ...createDev, project_name: createDev.project.map((i) => i.id) },
        { ...createDev, source_link: createDev.project.map((i) => i.id) },
        requestConfing
      );
      setProfile(data);
    } catch (e) {
      console.log('this error');
      console.log(e);
    }
  };

  const onChange = (e) => {
    setCreateDev({
      ...createDev,
      [e.target.name]: e.target.value,
    });
  };

  return profile ? (
    <>
      <div className="profile_container">
        <div className="profile_div">
          <form className="profile_form">
            {isInEditMode.img ? (
              <input
                className="profile_input"
                type="text"
                value={createDev.img}
                placeholder="profile img"
                name="img"
                onChange={onChange}
                onBlur={() => {
                  setIsInEditMode({ ...isInEditMode, img: false });
                  onSubmit();
                }}
              />
            ) : (
              <ul className="profile_ul">
                <li className="profile_li">
                  <img
                    className="profile_img"
                    src={profile.img}
                    alt="Profile Image"
                    onDoubleClick={() =>
                      setIsInEditMode({ ...isInEditMode, img: true })
                    }
                  />
                </li>
              </ul>
            )}

            {isInEditMode.title ? (
              <input
                className="profile_input"
                type="text"
                value={createDev.title}
                placeholder="profile title"
                name="title"
                onChange={onChange}
                onBlur={() => {
                  setIsInEditMode({ ...isInEditMode, title: false });
                  onSubmit();
                }}
              />
            ) : (
              <ul className="profile_ul">
                <li
                  className="profile_li"
                  onDoubleClick={() =>
                    setIsInEditMode({ ...isInEditMode, title: true })
                  }
                >
                  {profile.title}
                </li>
              </ul>
            )}

            {isInEditMode.first_name ? (
              <input
                className="profile_input"
                type="text"
                value={createDev.first_name}
                placeholder="profile first_name"
                name="first_name"
                onChange={onChange}
                onBlur={() => {
                  setIsInEditMode({ ...isInEditMode, first_name: false });
                  onSubmit();
                }}
              />
            ) : (
              <ul className="profile_ul">
                <li
                  className="profile_li"
                  onDoubleClick={() =>
                    setIsInEditMode({ ...isInEditMode, first_name: true })
                  }
                >
                  {profile.first_name}
                </li>
              </ul>
            )}

            {isInEditMode.last_name ? (
              <input
                className="profile_input"
                type="text"
                value={createDev.last_name}
                placeholder="profile last_name"
                name="last_name"
                onChange={onChange}
                onBlur={() => {
                  setIsInEditMode({ ...isInEditMode, last_name: false });
                  onSubmit();
                }}
              />
            ) : (
              <ul className="profile_ul">
                <li
                  className="profile_li"
                  onDoubleClick={() =>
                    setIsInEditMode({ ...isInEditMode, last_name: true })
                  }
                >
                  {profile.last_name}
                </li>
              </ul>
            )}

            {isInEditMode.based_in ? (
              <input
                className="profile_input"
                type="text"
                value={createDev.based_in}
                placeholder="profile based_in"
                name="based_in"
                onChange={onChange}
                onBlur={() => {
                  setIsInEditMode({ ...isInEditMode, based_in: false });
                  onSubmit();
                }}
              />
            ) : (
              <ul className="profile_ul">
                <li
                  className="profile_li"
                  onDoubleClick={() =>
                    setIsInEditMode({ ...isInEditMode, based_in: true })
                  }
                >
                  {profile.based_in}
                </li>
              </ul>
            )}

            {isInEditMode.country ? (
              <input
                className="profile_input"
                type="text"
                value={createDev.country}
                placeholder="profile country"
                name="country"
                onChange={onChange}
                onBlur={() => {
                  setIsInEditMode({ ...isInEditMode, country: false });
                  onSubmit();
                }}
              />
            ) : (
              <ul className="profile_ul">
                <li
                  className="profile_li"
                  onDoubleClick={() =>
                    setIsInEditMode({ ...isInEditMode, country: true })
                  }
                >
                  {profile.country}
                </li>
              </ul>
            )}

            <div className="icon_div">
              {isInEditMode.email ? (
                <input
                  className="profile_input"
                  type="text"
                  value={createDev.email}
                  placeholder="profile email"
                  name="email"
                  onChange={onChange}
                  onBlur={() => {
                    console.log('user left output');
                    setIsInEditMode({ ...isInEditMode, email: false });
                    onSubmit();
                  }}
                />
              ) : (
                <ul className="profile_ul">
                  <li
                    className="profile_li"
                    href={`mailto:${profile.email}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onDoubleClick={() =>
                      setIsInEditMode({ ...isInEditMode, email: true })
                    }
                  >
                    <a className="card-link" href={`mailto:${createDev.email}`}>
                      <img
                        src="https://i.redd.it/izqwm1g21b751.png"
                        className="social-icon"
                      ></img>
                    </a>
                  </li>
                </ul>
              )}

              {isInEditMode.facebook ? (
                <input
                  className="profile_input"
                  type="text"
                  value={createDev.facebook}
                  placeholder="profile facebook"
                  name="facebook"
                  onChange={onChange}
                  onBlur={() => {
                    setIsInEditMode({ ...isInEditMode, facebook: false });
                    onSubmit();
                  }}
                />
              ) : (
                <ul className="profile_ul">
                  <li
                    className="profile_li"
                    href={profile.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    onDoubleClick={() =>
                      setIsInEditMode({ ...isInEditMode, facebook: true })
                    }
                  >
                    <a
                      className="card-link"
                      href={profile.facebook}
                      target="_blank"
                    >
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Facebook_icon.svg/512px-Facebook_icon.svg.png?20220812153731"
                        className="social-icon"
                      ></img>
                    </a>
                  </li>
                </ul>
              )}

              {isInEditMode.instagram ? (
                <input
                  className="profile_input"
                  type="text"
                  value={createDev.instagram}
                  placeholder="profile instagram"
                  name="instagram"
                  onChange={onChange}
                  onBlur={() => {
                    setIsInEditMode({ ...isInEditMode, instagram: false });
                    onSubmit();
                  }}
                />
              ) : (
                <ul className="profile_ul">
                  <li
                    className="profile_li"
                    href={profile.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    onDoubleClick={() =>
                      setIsInEditMode({ ...isInEditMode, instagram: true })
                    }
                  >
                    <a
                      className="card-link"
                      href={profile.instagram}
                      target="_blank"
                    >
                      <img
                        src="https://www.freepnglogos.com/uploads/logo-ig-png/logo-ig-stunning-instagram-logo-vector-download-for-new-7.png"
                        className="social-icon"
                      ></img>
                    </a>
                  </li>
                </ul>
              )}

              {isInEditMode.git_hub ? (
                <input
                  className="profile_input"
                  type="text"
                  value={createDev.git_hub}
                  placeholder="profile git_hub"
                  name="git_hub"
                  onChange={onChange}
                  onBlur={() => {
                    setIsInEditMode({ ...isInEditMode, git_hub: false });
                    onSubmit();
                  }}
                />
              ) : (
                <ul className="profile_ul">
                  <li
                    className="profile_li"
                    href={profile.git_hub}
                    target="_blank"
                    rel="noopener noreferrer"
                    onDoubleClick={() =>
                      setIsInEditMode({ ...isInEditMode, git_hub: true })
                    }
                  >
                    <a
                      className="card-link"
                      href={profile.git_hub}
                      target="_blank"
                    >
                      <img
                        src="https://logos-world.net/wp-content/uploads/2020/11/GitHub-Logo.png"
                        className="social-icon"
                      ></img>
                    </a>
                  </li>
                </ul>
              )}

              {isInEditMode.linkden ? (
                <input
                  className="profile_input"
                  type="text"
                  value={createDev.linkden}
                  placeholder="profile linkden"
                  name="linkden"
                  onChange={onChange}
                  onBlur={() => {
                    setIsInEditMode({ ...isInEditMode, linkden: false });
                    onSubmit();
                  }}
                />
              ) : (
                <ul className="profile_ul">
                  <li
                    className="profile_li"
                    href={profile.linkden}
                    target="_blank"
                    rel="noopener noreferrer"
                    onDoubleClick={() =>
                      setIsInEditMode({ ...isInEditMode, linkden: true })
                    }
                  >
                    <a
                      className="card-link"
                      href={profile.linkden}
                      target="_blank"
                    >
                      <img
                        src="https://static.vecteezy.com/system/resources/previews/018/930/587/original/linkedin-logo-linkedin-icon-transparent-free-png.png"
                        className="social-icon"
                      ></img>
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </form>
        </div>

        <div className="info_div">
          <form action="info_form">
            {isInEditMode.info ? (
              <input
                className="info_input"
                type="text"
                value={createDev.info}
                placeholder="profile info"
                name="info"
                onChange={onChange}
                onBlur={() => {
                  setIsInEditMode({ ...isInEditMode, info: false });
                  onSubmit();
                }}
              />
            ) : (
              <ul className="info_ul">
                <li
                  className="info_li"
                  onDoubleClick={() =>
                    setIsInEditMode({ ...isInEditMode, info: true })
                  }
                >
                  <h2 className="h2_info">Infomation About developer</h2>
                  <p className="p_info">{profile.info}</p>
                </li>
              </ul>
            )}
          </form>
        </div>
      </div>

      <br />
      <br />
      <br />
      <div className="skill_div">
        {isInEditMode.skill ? (
          <input
            id={isInEditMode.skill}
            placeholder="skill"
            className="skill_input"
            type="text"
            value={skills.skills}
            name="skill"
            onChange={onskillHandler}
            onBlur={() => {
              setIsInEditMode({ ...isInEditMode, skill: false });
              editSkill(id);
            }}
          />
        ) : (
          <ul className="skill_ul">
            {profile.skill &&
              profile.skill.map((elem, id) => (
                <li
                  className="skill_li"
                  key={elem.id}
                  id={elem.id}
                  onDoubleClick={() =>
                    setIsInEditMode({ ...isInEditMode, skill: elem.id })
                  }
                >
                  {elem.skill}
                </li>
              ))}
          </ul>
        )}
      </div>

      <div className="project_container">
        {isInEditMode.project_name ? (
          <input
            id={isInEditMode.project_name}
            className="project_input"
            type="text"
            value={projects}
            name="project_name"
            onChange={onProjectHandler}
            onBlur={() => {
              setIsInEditMode({ ...isInEditMode, project_name: false });
              editProject(id);
            }}
          />
        ) : (
          <ul className="project_ul">
            {profile.project &&
              profile.project.map((i, id) => (
                <li
                  className="project_li"
                  key={i.id}
                  id={i.id}
                  onDoubleClick={() =>
                    setIsInEditMode({ ...isInEditMode, project_name: i.id })
                  }
                >
                  <h3>{i.project_name}</h3>
                  <p>{i.description}</p>
                  <a href={i.source_link} target="_blank">
                    More info
                  </a>
                </li>
              ))}
          </ul>
        )}

        {/* {isInEditMode.description ? (
          <input
            className="project_input"
            id={isInEditMode.description}
            type="text"
            value={description}
            name="description"
            onChange={onDescriptionHandler}
            onBlur={() => {
              setIsInEditMode({ ...isInEditMode, description: false });
              editProject(id);
            }}
          />
        ) : (
          <ul className="project_ul">
            {profile.project &&
              profile.project.map((i, id) => (
                <li
                  className="project_li"
                  key={i.id}
                  id={i.id}
                  onDoubleClick={() =>
                    setIsInEditMode({ ...isInEditMode, description: i.id })
                  }
                >
                  {i.description}
                </li>
              ))}
          </ul>
        )}
        {isInEditMode.source_link ? (
          <input
            id={isInEditMode.source_link}
            className="project_input"
            type="text"
            value={source}
            name="source_link"
            onChange={onSourceHandler}
            onBlur={() => {
              console.log('user left output');
              setIsInEditMode({ ...isInEditMode, source_link: false });
              editProject(id);
            }}
          />
        ) : (
          <ul className="project_ul">
            {profile.project &&
              profile.project.map((i, id) => (
                <li
                  className="project_li"
                  key={i.id}
                  id={i.id}
                  onDoubleClick={() =>
                    setIsInEditMode({ ...isInEditMode, source_link: i.id })
                  }
                >
                  <a href={i.source_link} target="_blank">
                    More info
                  </a>
                </li>
              ))}
          </ul>
        )} */}
      </div>

      <div className="text-container">
        {profile.comments &&
          profile.comments.map((comment, ind) => (
            <li key={ind} className="posted">
              {comment.text}
            </li>
          ))}

        <div className="comment-flexbox">
          <form
            className="comment-form"
            onSubmit={(e) => {
              e.preventDefault();
              addComment(id);
            }}
          >
            {error && <h4 className="error-comment">{error}</h4>}
            <div className="input-comment">
              <input
                className="comment-input"
                type="text"
                placeholder="Add your comment"
                onChange={onChangeHandler}
                value={comment}
              ></input>
              <button className="comment_button">Submit</button>
            </div>
          </form>
        </div>
      </div>
    </>
  ) : null;
};

export default ProfilePage;
