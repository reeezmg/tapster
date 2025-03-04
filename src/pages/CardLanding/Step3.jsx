import React, { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import Modal from "../../components/modal/Modal"
import {ContactInput, ContactPreview} from "./Types/ToContact";
import {Links, ProfilePreview} from "./Types/ToDirectURL";
import ShopInfoForm from "./Types/ShopInfoForm";
import ShopLanding from "./Types/ShopLanding";
import Portfolio from "./Types/Portfolio";
import PortfolioLanding from "./Types/PortfolioLanding";
import { ExternalLink,EmbedLink } from "./Types/ExternalLink";
import axios from "axios";

const Step3 = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [webType, setWebType] = useState('link')
    const [resWebType, setResWebType] = useState('link')
    const [response, setResponse] = useState(null);
    const [externalLink, setExternalLink] = useState("");
    const [profileInfo, setProfileInfo] = useState({ 
        name: "",
        phone: "",
        email: "",
        address: "",
        bio: "", 
        profilePicture: "" ,
        backgroundImage:""
    });
    const [links, setLinks] = useState([]);
    const [shopInfo, setShopInfo] = useState({
        logo: null,
        otherPictures: [],
        productCategories: [],
        businessHours: {
          Monday: { open: false, openingTime: "", closingTime: "" },
          Tuesday: { open: false, openingTime: "", closingTime: "" },
          Wednesday: { open: false, openingTime: "", closingTime: "" },
          Thursday: { open: false, openingTime: "", closingTime: "" },
          Friday: { open: false, openingTime: "", closingTime: "" },
          Saturday: { open: false, openingTime: "", closingTime: "" },
          Sunday: { open: false, openingTime: "", closingTime: "" },
        },
        inquiryPreference: "phone",
      });

      const [studentInfo, setStudentInfo] = useState({
        name: "",
        profession: "",
        description: "",
        email:"",
        phone:"",
        profilePicture: null,
        coverPicture: null,
        academics: [],
        address: "",
        skills: [],
        hobbies: [],
        links: [],
        certifications: [],
        languages: [],
        organizations: [],
        achievements: [],
        works: [],
        experiences: [],
      });


    
      useEffect(() => {
        const fetchWebData = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8000/api/web/getWebDataById/${id}`);
                
                if (!data || !data.responseData) {
                    console.error("No responseData received");
                    return;
                }
 
                // Set the correct state based on webType
                switch (webType) {
                    case "link":
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
                        break;
    
                    case "shop":
                        setShopInfo({
                            logo: data.responseData.logo || null,
                            name: data.responseData.name || "",
                            phone: data.responseData.phone || "",
                            email: data.responseData.email || "",
                            otherPictures: data.responseData.otherPictures || [],
                            productCategories: data.responseData.productCategories || [],
                            businessHours: data.responseData.businessHours || {},
                            inquiryPreference: data.responseData.inquiryPreference || "phone",
                        });
                        break;
    
                    case "student":
                        setStudentInfo({
                            name: data.responseData.name || "",
                            profession: data.responseData.profession || "",
                            description: data.responseData.description || "",
                            email: data.responseData.email || "",
                            phone: data.responseData.phone || "",
                            profilePicture: data.responseData.profilePicture || null,
                            coverPicture: data.responseData.coverPicture || null,
                            academics: data.responseData.academics || [],
                            address: data.responseData.address || "",
                            skills: data.responseData.skills || [],
                            hobbies: data.responseData.hobbies || [],
                            links: data.responseData.links || [],
                            certifications: data.responseData.certifications || [],
                            languages: data.responseData.languages || [],
                            organizations: data.responseData.organizations || [],
                            achievements: data.responseData.achievements || [],
                            works: data.responseData.works || [],
                            experiences: data.responseData.experiences || [],
                        });
                        break;
    
                    case "externalLink":
                        setExternalLink(data.responseData.externalLink || "");
                        break;
    
                    default:
                        console.error("Unknown webType received:", data.webType);
                }
            } catch (error) {
                console.error("Error fetching data:", error.response?.data || error.message);
            }
        };
    
        fetchWebData();
    }, []); 

    useEffect(() => {
      console.log(profileInfo)
    }, [profileInfo])
    
    

    const handleWebTypeChange = (type) => {
        setWebType(type);
    };

    const uploadImage = async (file, name) => {
        if (!file) return null; // If no file, return null

        const formData = new FormData();
        formData.append("image", file);
        formData.append("name", name); // Use a unique name for each image

        const response = await axios.post("http://localhost:8000/api/images/", formData, {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true
        });

        return response.data; // Assuming the server responds with the uploaded image URL
    };

    const handleNext = async (e) => {
        e.preventDefault();
        let formData;  

        if(webType === 'link'){
            profileInfo.profilePicture = profileInfo.profilePicture ? await uploadImage(profileInfo.profilePicture,Date.now()) : "";
            profileInfo.backgroundImage = profileInfo.backgroundImage ? await uploadImage(profileInfo.backgroundImage, Date.now()) : "";
            formData = {...profileInfo,links}
        }else if(webType === 'shop'){
            shopInfo.logo = shopInfo.logo ? await uploadImage(shopInfo.logo, Date.now()) : "";


        shopInfo.otherPictures = shopInfo.otherPictures
            ? await Promise.all(
                shopInfo.otherPictures.map(async (picture) => 
                    await uploadImage(picture, Date.now())
                )
                )
            : [];

        shopInfo.productCategories = shopInfo.productCategories
            ? await Promise.all(
                shopInfo.productCategories.map(async (category) => ({
                    name: category.name,
                    image: await uploadImage(category.image, Date.now())
                }))
                )
            : [];
            formData = shopInfo
        }else if(webType === 'student'){
            studentInfo.profilePicture = studentInfo.profilePicture ? await uploadImage(studentInfo.profilePicture,Date.now()) : "";
            formData = studentInfo
        }else {
            formData = {externalLink}
        }

        try {
            const response = await axios.post("http://localhost:8000/api/web", {formData,id,webType},{withCredentials:true});
            navigate(`/client/pay/${id}`);
        } catch (error) {
         console.log(error)
        }

        
    };

    const handleBack = async (e) => {
        e.preventDefault();
        let formData;  

        if(webType === 'link'){
            profileInfo.profilePicture = profileInfo.profilePicture ? await uploadImage(profileInfo.profilePicture,Date.now()) : null;
            profileInfo.backgroundImage = profileInfo.backgroundImage ? await uploadImage(profileInfo.backgroundImage, Date.now()) : null;
            formData = {...profileInfo,links}
        }else if(webType === 'shop'){
            shopInfo.logo = shopInfo.logo ? await uploadImage(shopInfo.logo, Date.now()) : null;


        shopInfo.otherPictures = shopInfo.otherPictures
            ? await Promise.all(
                shopInfo.otherPictures.map(async (picture) => 
                    await uploadImage(picture, Date.now())
                )
                )
            : [];

        shopInfo.productCategories = shopInfo.productCategories
            ? await Promise.all(
                shopInfo.productCategories.map(async (category) => ({
                    name: category.name,
                    image: await uploadImage(category.image, Date.now())
                }))
                )
            : [];
            formData = shopInfo
        }else if(webType === 'student'){
            studentInfo.profilePicture = studentInfo.profilePicture ? await uploadImage(studentInfo.profilePicture,Date.now()) : null;
            formData = studentInfo
        }else {
            formData = {externalLink}
        }

        try {
            const response = await axios.post("http://localhost:8000/api/web", {formData,id,webType:""},{withCredentials:true});
            navigate(`/client/step2/${id}`);
        } catch (error) {
         console.log(error)
        }

        
    };

    const handleSkip = async (e) => {
        e.preventDefault();
        
        navigate(`/client/pay/${id}`);
    };

    useEffect(() => {
        console.log(studentInfo)
    }, [studentInfo])
    
    

    return (
        <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Create Response Website</h1>
        <div className="mb-6">
            <div className="flex justify-between items-center">
            {[1, 2, 3, 4].map((step) => (
                <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === 3 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
                >
                {step}
                </div>
            ))}
            </div>
            <div className="mt-2 bg-gray-200 h-1 rounded">
            <div className="bg-blue-500 h-1 rounded" style={{ width: "80%" }}></div>
            </div>
        </div>

        <div className="flex justify-between mt-6 mb-4">
            <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleBack}
            >
                Back
            </button>
            <div>
            <button
            className="bg-red-500 text-white mx-2 px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            onClick={handleSkip}
            >
                Skip
            </button>
            <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleNext}
            >
                Next
            </button>
            </div>
           
        </div>

        <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
            {/* Left side */}
            <h3 className="text-lg font-semibold mb-4">Select Website Type</h3>
            <div className="flex gap-4 mb-6 overflow-x-auto">
               
                <button
                onClick={() => handleWebTypeChange("link")}
                className={`flex-1 p-2 rounded-lg transition-colors ${
                    webType === "link" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
                >
                Links
                </button>
                <button
                onClick={() => handleWebTypeChange("shop")}
                className={`flex-1 p-2 rounded-lg transition-colors ${
                    webType === "shop" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
                >
                Shop
                </button>
                <button
                onClick={() => handleWebTypeChange("student")}
                className={`flex-1 p-2 rounded-lg transition-colors ${
                    webType === "student" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
                >
                Student
                </button>
                <button
                onClick={() => handleWebTypeChange("external")}
                className={`flex-1 p-2 rounded-lg transition-colors ${
                    webType === "external" ? "bg-blue-500 text-white" : "bg-gray-200 hover:bg-gray-300"
                }`}
                >
                External 
                </button>
            </div>
          
            {webType === "link" && (
                <div className="w-full">
                    <Links profileInfo={profileInfo} setProfileInfo={setProfileInfo} links={links} setLinks={setLinks} Landing={false} />
                </div>

            )}
            {webType === "shop" && (
                <div className="w-full">
                    <ShopInfoForm shopInfo={shopInfo} setShopInfo={setShopInfo} />
                </div>

            )}
            {webType === "student" && (
                <div className="w-full">
                    <Portfolio studentInfo={studentInfo} setStudentInfo={setStudentInfo} />
                </div>

            )}
            {webType === "external" && (
                <div className="w-full">
                    <ExternalLink externalLink={externalLink} setExternalLink={setExternalLink} />
                </div>

            )}
            </div>

            <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
            
             {webType === "link" && (
                <ProfilePreview  profileInfo={profileInfo} links={links} />

            )}
             {webType === "shop" && (
                <ShopLanding  shopInfo={shopInfo} />
            )}
            {webType === "student" && (
                <div className="w-full">
                    <PortfolioLanding studentInfo={studentInfo}  />
                </div>

            )}
             {webType === "external" && (
                <div className="w-full">
                    <EmbedLink externalLink={externalLink} />
                </div>

            )}
            </div>
        </div>

        <div className="flex justify-between mt-6 mb-4">
            <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleBack}
            >
                Back
            </button>
            <div>
            <button
            className="bg-red-500 text-white mx-2 px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
            onClick={handleSkip}
            >
                Skip
            </button>
            <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleNext}
            >
                Next
            </button>
            </div>
           
        </div>

        </div>
    );
    };

    export default Step3;