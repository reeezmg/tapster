import React, { useEffect, useState } from 'react';
import { Trash2 } from "lucide-react";
import Select from 'react-select';
import { useNavigate,useParams } from "react-router-dom";
import axios from "axios";

export default function LinkForms() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [profileInfo, setProfileInfo] = useState({ 
            name: "",
            phone: "",
            email: "",
            address: "",
            bio: "", 
            profilePicture: null ,
            backgroundImage:null
        });
        const [links, setLinks] = useState([]);

    const websites = [
      "Facebook", "Twitter", "LinkedIn", "Instagram", "GitHub", "YouTube", "Reddit", "TikTok", "Snapchat", "Pinterest", 
      "Tumblr", "Flickr", "Medium", "Quora", "DeviantArt", "Vimeo", "Dribbble", "Behance", "SoundCloud", "Spotify", 
      "Twitch", "Discord", "WhatsApp", "WeChat", "Telegram", "Mastodon", "Blogger", "WordPress", "Meetup", "Goodreads",
      "Stack Overflow", "CodePen", "HackerRank", "LeetCode", "Kaggle", "Bitbucket", "GitLab", "Mixcloud", "Last.fm", "Bandcamp",
      "AngelList", "Product Hunt", "Foursquare", "Kickstarter", "GoFundMe", "Etsy", "eBay", "Amazon", "Coursera", "Udemy",
      "Khan Academy", "edX", "Skillshare", "Trello", "Notion", "Evernote", "Asana", "ClickUp", "Monday.com", "Dropbox", "Google Drive"
    ].map(site => ({ value: site, label: site }));
  
    // Add a new link
    const addLink = () => {
      setLinks([...links, { site: "", url: "" }]);
    };
  
    // Update a specific link
    const updateLink = (index, field, value) => {
      const newLinks = links.map((link, i) =>
        i === index ? { ...link, [field]: value } : link
      );
      setLinks(newLinks);
    };
  
    // Remove a specific link
    const removeLink = (index) => {
      setLinks(links.filter((_, i) => i !== index));
    };
  
    // Handle file input for profile picture
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
          setProfileInfo({ ...profileInfo, profilePicture: file });
      }
    };
    const handleBioFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        console.log(file)
          setProfileInfo({ ...profileInfo, backgroundImage: file });
      }
    };

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
        }catch(error){
          console.log(error)
        }    
      }
  
      fetchWebData();
  }, []); 

  const uploadImage = async (file, name) => {
    if (!file) return null; // If no file, return null

    const formData = new FormData();
    formData.append("image", file);
    formData.append("name", name); // Use a unique name for each image

    const response = await axios.post("https://server.tapster.shop/api/images/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true
    });

    return response.data; // Assuming the server responds with the uploaded image URL
};

const handleSave = async (e) => {
  e.preventDefault();
  let formData;  

  

  try {
    
    profileInfo.profilePicture = profileInfo.profilePicture ? await uploadImage(profileInfo.profilePicture,Date.now()) : null;
    profileInfo.backgroundImage = profileInfo.backgroundImage ? await uploadImage(profileInfo.backgroundImage, Date.now()) : null;
    formData = {...profileInfo,links}
      const response = await axios.post("https://server.tapster.shop/api/web/forLink", {formData,id},{withCredentials:true});
      navigate(`/direct/profile/${id}`);
  } catch (error) {
   console.log(error)
  }
 
};

const handleBack = () => {
  navigate(`/direct/profile/${id}`);
}

  
    return (
      <div className="p-4 max-w-xl mx-auto">
        {/* Profile Information Section */}
        <div className="flex justify-between mt-6 mb-4">
            <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleBack}
            >
                Back
            </button>
            <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleSave}
            >
                Save
            </button>
        </div>
        <div className="mb-4">
          <label className="block mb-1 mt-3">Name</label>
          <input
            type="text"
            value={profileInfo.name}
            onChange={(e) => setProfileInfo({ ...profileInfo, name: e.target.value })}
            placeholder="Enter Name"
            className="p-2 border rounded w-full mb-2"
          />

          <label className="block mb-1 mt-3">Phone Number</label>
          <input
            type="text"
            value={profileInfo.phone}
            onChange={(e) => setProfileInfo({ ...profileInfo, phone: e.target.value })}
            placeholder="Enter Phone Number"
            className="p-2 border rounded w-full mb-2"
          />

          <label className="block mb-1 mt-3">Email</label>
          <input
            type="text"
            value={profileInfo.email}
            onChange={(e) => setProfileInfo({ ...profileInfo, email: e.target.value })}
            placeholder="Enter Email"
            className="p-2 border rounded w-full mb-2"
          />

          <label className="block mb-1 mt-3">Address</label>
          <input
            type="text"
            value={profileInfo.address}
            onChange={(e) => setProfileInfo({ ...profileInfo, address: e.target.value })}
            placeholder="Enter Address"
            className="p-2 border rounded w-full mb-2"
          />

          <label className="block mb-1 mt-3">Bio</label>
          <input
            type="text"
            value={profileInfo.bio}
            onChange={(e) => setProfileInfo({ ...profileInfo, bio: e.target.value })}
            placeholder="Enter Bio"
            className="p-2 border rounded w-full mb-2"
          />

          {/* File input for profile picture */}
          <label className="block mb-1 mt-3">Profile Picture</label>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/*" // Accept only image files
            className="p-2 border rounded w-full mb-2"
          />

          {/* File input for bio image */}
          <label className="block mb-1 mt-3">Background Image</label>
          <input
            type="file"
            onChange={handleBioFileChange}
            accept="image/*" // Accept only image files
            className="p-2 border rounded w-full mb-2"
          />
        </div>

          
        {/* Add Link Button */}
        <button onClick={addLink} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">Add Link</button>
        
        {/* Render Links */}
        <div className="mt-4 space-y-4">
          {links.map((link, index) => (
            <div key={index} className="p-4 flex flex-col space-y-2 border rounded-lg shadow-md bg-white">
              <Select
                value={websites.find(site => site.value === link.site) || ""}
                onChange={(selectedOption) => updateLink(index, "site", selectedOption.value)}
                options={[...websites, { value: "Email", label: "Email" }, { value: "Phone Number", label: "Phone Number" }]}
                className="w-60"
                isSearchable
              />
              <input
                type="text"
                value={link.url}
                onChange={(e) => updateLink(index, "url", e.target.value)}
                placeholder="Enter Profile URL / Email / Phone Number"
                className="p-2 border rounded w-full"
              />
              <button onClick={() => removeLink(index)} className="bg-red-500 text-white p-2 rounded self-end">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  }
