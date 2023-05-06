import { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../consts';
import '../homePage/homepage.scss';
import DeveloperPage from '../developers/developers';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [data, formData] = useState([]);
  const [position, setPosition] = useState(0);

  useEffect(() => {
    const fethcData = async () => {
      const { data } = await axios.get(`${API_URL}developers/`);
      console.log(data);
      formData(data);
    };
    fethcData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPosition((position + 1) % data.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [position, data.length]);

  return (
    <>
      <div className="home">
        <div className="main_home">
          <div className="coding_img">
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/002/099/443/small_2x/programming-code-coding-or-hacker-background-programming-code-icon-made-with-binary-code-digital-binary-data-and-streaming-digital-code-vector.jpg"
              className="coding_image"
            />
            <h1 className="coding_img_heading_h1">
              Bespoke Software Development and Dedicated Teams For Your Unique
              Business Needs
            </h1>
            <div className="button">
              <Link to="/developers">
                <button className="button_primary">see more developers</button>
              </Link>
            </div>
          </div>

          <div className="main_div">
            <form action="main_form">
              <ul className="main_ul">
                {data.map((i, id) => (
                  <li
                    className={`main_li ${
                      position === id ? 'main_li_visible' : 'main_li_hidden'
                    }`}
                    key={id}
                  >
                    <div className="main_cardHolder">
                      <img
                        className="main_cardHolder_img"
                        src={i.img}
                        alt={i.title}
                      />
                      <h3 className="main_cardHolder_li">{i.title}</h3>
                      <h3 className="main_cardHolder_li">
                        {i.first_name} {i.last_name}
                      </h3>
                    </div>
                  </li>
                ))}
              </ul>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
