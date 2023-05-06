import { useEffect, useState } from 'react';
import axios from 'axios';
import DevCard from './devCard';
import '../developers/developers.scss';
import { API_URL } from '../../consts';

const DeveloperPage = () => {
  const [dev, setDev] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchInput, setSearchInput] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(`${API_URL}/developers`);
      setIsLoading(false);
      setDev(data);
    };
    fetchData();
  }, []);

  const filteredDev = dev.filter((elem) => {
    return (
      elem.title.toLowerCase().includes(searchInput.toLowerCase()) ||
      elem.first_name.toLowerCase().includes(searchInput.toLowerCase())
    );
  });

  return (
    <>
      <div className="searchBar">
        <input
          className="searchBar"
          type="text"
          placeholder="Search developers by title or name..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div className="dev_page">
        {isLoading ? (
          <p>data is being fethed</p>
        ) : (
          <ul>
            {filteredDev.map((elem) => (
              <DevCard key={elem.id} elem={elem} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default DeveloperPage;
