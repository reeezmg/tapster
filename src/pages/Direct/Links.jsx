import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaEdit } from "react-icons/fa";

export default function Links() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [profileInfo, setProfileInfo] = useState({ 
    name: "",    
    phone: "",
    email: "",
    address: "",
    bio: "", 
    profilePicture: "" ,
    backgroundImage: ""
  });
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const fetchWebData = async () => {
      try {
        const { data } = await axios.get(`https://server.tapster.shop/api/web/getWebDataByIdForLink/${id}`);
        
        if (!data || !data.responseData) {
          console.error("No responseData received");
          return;
        } 

        setProfileInfo({
          name: data.responseData.name || "",
          phone: data.responseData.phone || "",
          email: data.responseData.email || "",
          address: data.responseData.address || "",
          bio: data.responseData.bio || "",
          profilePicture: data.responseData.profilePicture || "",
          backgroundImage: data.responseData.backgroundImage || "",
        });
        setLinks(data.responseData.links || []);
      } catch(error) {
        console.log(error);
      }    
    };
    
    fetchWebData();
  }, [id]); 

  const handleEditClick = () => {
    const route = profileInfo.name ? `/direct/login` : `/direct/register/${id}`;
    navigate(route);
  };

  return (
    <div className="p-6 relative">
      {/* Edit Icon */}
      <button 
        onClick={handleEditClick} 
        className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
      >
        <FaEdit size={24} />
      </button>

      {/* Profile Header */}
      <div className="flex flex-col items-center justify-center border-b pb-4 mb-6">
        {/* Background Image */}
        <div
          className="w-full h-48 bg-gray-200 bg-cover rounded-lg mb-4"
          style={{
            backgroundImage: `url(${ `https://unifeed.s3.ap-south-1.amazonaws.com/${profileInfo.backgroundImage}`})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        {/* Profile Picture */}
        <img
          src={`https://unifeed.s3.ap-south-1.amazonaws.com/${profileInfo.profilePicture}`}
          alt=""
          className="w-32 h-32 rounded-full border-4 border-white -mt-16 shadow-md object-cover"
        />
        {/* Profile Name */}
        <h3 className="text-xl font-semibold text-gray-800 mt-4">{profileInfo.name || "Name not provided"}</h3>
        
        {/* Phone, Email, and Address */}
        <div className="text-center mt-2 space-y-1">
          {profileInfo.phone && <p className="text-sm text-gray-600">{profileInfo.phone}</p>}
          {profileInfo.email && <p className="text-sm text-gray-600">{profileInfo.email}</p>}
          {profileInfo.address && <p className="text-sm text-gray-600">{profileInfo.address}</p>}
        </div>
        
        {/* Bio or Additional Info */}
        <p className="text-sm text-gray-500 mt-4">{profileInfo.bio || "Your bio or description goes here..."}</p>
      </div>

      {/* Links Section */}
      <div className="space-y-4">
        {links.map((link, index) => (
          <div key={index} className="flex items-center space-x-4 border-b py-3">
            {/* Link Icon */}
            <div className="flex justify-center items-center w-8 h-8 rounded-full bg-blue-500 text-white">
              <i className={`fab fa-${link.site.toLowerCase()}`} />
            </div>
            {/* Link Information */}
            <div className="flex-1">
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-lg"
              >
                {link.site || "No site selected"}
              </a>
              <p className="text-sm text-gray-400 mt-1">{link.url}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
