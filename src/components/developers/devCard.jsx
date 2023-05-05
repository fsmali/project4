import '../developers/dev_card.scss'
import { Link } from 'react-router-dom';



   function isAuthenticated() {
     const token = localStorage.getItem('token');
     return token !== null && token !== undefined;
   }
const DevCard=({elem})=>{

     const handleClick = () => {
       if (isAuthenticated()) {
       
       } else {
         alert('Please log in first');
         // Navigate to login page
       }
     };
    return (
      <div className="dev_container">
        <li className="dev-list">
          <img src={elem.img} alt="Developer pictures" className="img" />
        </li>
        <li>{elem.title}</li>
        <li className="dev-list">
          {elem.first_name} {elem.last_name}
        </li>
        <li className="dev-list">
          <a className="card-link" href={`mailto:${Element.email}`}>
            <img
              src="https://i.redd.it/izqwm1g21b751.png"
              className="social-icon"
            ></img>
          </a>
        </li>
        <Link to={`/developers/${elem.id}`} className="dev-list">
          <button className="dev_button" onClick={handleClick}>
            See more
          </button>
        </Link>
      </div>
    );
    }
    export default DevCard

    // Junior Software Engineer 