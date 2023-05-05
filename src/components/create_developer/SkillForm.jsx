// import { useState, useEffect } from 'react';
// import axios from 'axios';

// const SkillForm = () => {
//   const [skills, setSkills] = useState([]);
//   const [newSkill, setNewSkill] = useState('');

//   useEffect(() => {
//     const fetchSkills = async () => {
//       const res = await axios.get('http://localhost:8000/skills/');
//       setSkills(res.data);
//     };
//     fetchSkills();
//   }, []);

//   const handleNewSkill = (e) => {
//     setNewSkill(e.target.value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await axios.post('http://localhost:8000/skills/', {
//         skill: newSkill,
//       });
//       setSkills([...skills, res.data]);
//       setNewSkill('');
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <label htmlFor="newSkill">New Skill:</label>
//         <input
//           type="text"
//           id="newSkill"
//           value={newSkill}
//           onChange={handleNewSkill}
//         />
//         <button type="submit">Add Skill</button>
//       </form>
//       <ul>
//         {skills.map((skill) => (
//           <li key={skill.id}>{skill.skill}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default SkillForm;
