import React, { useState } from "react";
import { useNavigate,useParams } from "react-router-dom";
import {ContactInput, ContactPreview} from "./Types/ToContact";
import axios from "axios";

const Edit2 = () => {
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
   

    const handleNext = async (e) => {
        e.preventDefault();
       
        try {
            const response = await axios.post("http://localhost:8000/api/web/contact", {contact,id},{withCredentials:true});
            console.log(response)
            navigate(`/client/step3/${id}`);
        } catch (error) {
         console.log(error)
        }

    };

    const handleBack = async (e) => {
        e.preventDefault();
       
        try {
            const response = await axios.post("http://localhost:8000/api/web/contact", {contact,id},{withCredentials:true});
            console.log(response)
            navigate(`/client`);
        } catch (error) {
         console.log(error)
        }

    };

   
    

    return (
        <div className="p-4 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-center">Edit VCard details</h1>
        
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

    export default Edit2;