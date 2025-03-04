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



  

  return (
    <div>
     <img
       src={testImage}
       alt="Local Test Image"
       className="w-full h-48 object-cover"
     />
     reez
    </div>
  );
}

export default Response;
