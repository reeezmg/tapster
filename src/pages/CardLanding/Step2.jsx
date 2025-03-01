import React, { useEffect, useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import {ContactInput, ContactPreview} from "./Types/ToContact";
import axios from "axios";

const Step2 = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [contact, setContact] = useState({
        name: "",
        company: "",
        phone: "",
        email: "",
        address: "",
        gstn: "",
      });



      useEffect(() => {
        const fetchWebData = async () => {
            try {
                const { data } = await axios.get(`https://server.tapster.shop/api/web/getWebDataById/${id}`);
                
                if (!data || !data.responseData) {
                    console.error("No responseData received");
                    return;
                }
 
          
                setContact({
                            name: data.responseData.name || "",
                            company: data.responseData.company || "",
                            phone: data.responseData.phone || "",
                            email: data.responseData.email || "",
                            address: data.responseData.address || "",
                            gstn: data.responseData.gstn || "",
                        });
                       
            } catch (error) {
                console.error("Error fetching data:", error.response?.data || error.message);
            }
        };
    
        fetchWebData();
    }, []); 

   

    const handleNext = async (e) => {
        e.preventDefault();
       
        try {
            const response = await axios.post("https://server.tapster.shop/api/web/contact", {contact,id},{withCredentials:true});
            console.log(response)
            navigate(`/client/step3/${id}`);
        } catch (error) {
         console.log(error)
        }

    };

    const handleBack = async (e) => {
        e.preventDefault();
       
        try {
            const response = await axios.post("https://server.tapster.shop/api/web/contact", {contact,id},{withCredentials:true});
            console.log(response)
            navigate(`/client/step1/${id}`);
        } catch (error) {
         console.log(error)
        }

    };

    

   
    

    return (
        <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Add VCard details</h1>
        <div className="mb-6">
            <div className="flex justify-between items-center">
            {[1, 2, 3, 4].map((step) => (
                <div
                key={step}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    step === 2 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"
                }`}
                >
                {step}
                </div>
            ))}
            </div>
            <div className="mt-2 bg-gray-200 h-1 rounded">
            <div className="bg-blue-500 h-1 rounded" style={{ width: "50%" }}></div>
            </div>
        </div>
        <div className="flex justify-between mt-6 mb-4">
            <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleBack}
            >
                Back
            </button>
            <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleNext}
            >
                Next
            </button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
            {/* Left side */}
   
                <div className="w-full">
                    <ContactInput contact={contact} setContact={setContact} />
                </div>

          
            </div>

            <div className="w-full md:w-1/2 p-4 bg-white rounded-lg shadow-md">
           
            <div className="w-full">
                    <ContactPreview contact={contact} />
                </div>
            
            </div>
        </div>

        <div className="flex justify-between mt-6 mb-4">
            <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleBack}
            >
                Back
            </button>
            <button
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            onClick={handleNext}
            >
                Next
            </button>
        </div>
        </div>
    );
    };

    export default Step2;