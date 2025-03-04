import React, { useEffect, useState } from 'react';

import testImage from "../Images/abstract1b.png"

function Response() {



  

  return (
    <div>
     <img
       src={testImage}
       alt="Local Test Image"
       className="w-full h-48 object-cover"
     />
     
    </div>
  );
}

export default Response;
