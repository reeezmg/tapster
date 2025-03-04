import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { ContactPreview } from './CardLanding/Types/ToContact';
import { ProfilePreview } from './CardLanding/Types/ToDirectURL';
import ShopLandingPage from './CardLanding/Types/ShopLanding';
import PortfolioLanding from './CardLanding/Types/PortfolioLanding';
import { EmbedLink } from './CardLanding/Types/ExternalLink';
import testImage from "../Images/abstract1b.png"

function Response() {
  const { uname } = useParams(); // Get uname from route params
  const [response, setResponse] = useState(null);
  const [webType, setWebType] = useState("");

  useEffect(() => {
    const fetchWebData = async () => {
      try {
        const { data } = await axios.get(`https://server.tapster.shop/api/web/getWebData/${uname}`);
        setResponse(data.responseData);
        console.log(data)
        setWebType(data.webType);
      } catch (error) {
        console.error("Error fetching data:", error.response?.data || error.message);
      }
    };

    fetchWebData();
  }, [uname]);

  if (!response) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div>
       <img
       src={testImage}
       alt="Local Test Image"
       className="w-full h-48 object-cover"
     />
      <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
       
       

        
      </div>
    </div>
  );
}

export default Response;
