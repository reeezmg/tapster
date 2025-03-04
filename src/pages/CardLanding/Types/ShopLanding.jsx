import React, { useEffect, useState } from "react";
import testImage from "../../../Images/abstract1b.png";

const ShopLandingPage = ({ shopInfo, landing }) => {
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const getImageSrc = (image) => {
    if (!image) return "";
    const url = landing
      ? `https://unifeed.s3.ap-south-1.amazonaws.com/${image}`
      : image instanceof File
      ? URL.createObjectURL(image)
      : `https://unifeed.s3.ap-south-1.amazonaws.com/${image}`;
    console.log("Generated Image URL:", url); // Debugging
    return url;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Subject:", subject);
    console.log("Message:", message);
    alert("Your message has been sent!");
    setSubject("");
    setMessage("");
  };

  const contact = {
    name:shopInfo.name,
    company:shopInfo.company,
    phone:shopInfo.phone,
    email:shopInfo.email,
    address:shopInfo.address,
    gstn:shopInfo.gstn,  
  }

  useEffect(() => {
    console.log(contact)
    console.log(shopInfo)
    if (landing && contact.name) {
      // Split full name properly
      const nameParts = contact.name.trim().split(" ");
      const lastName = nameParts.length > 1 ? nameParts.pop() : ""; // Last word as last name
      const firstName = nameParts.join(" "); // Everything else as first name

      const vCardData = `
BEGIN:VCARD
VERSION:3.0
N:${lastName};${firstName};;;
FN:${contact.name}
ORG:${contact.company || "N/A"}
TEL:${contact.phone || ""}
EMAIL:${contact.email || ""}
ADR:${contact.address || ""}
NOTE:GSTN: ${contact.gstn || "N/A"}
END:VCARD
      `.trim();

      const blob = new Blob([vCardData], { type: "text/vcard" });
      const vcfUrl = URL.createObjectURL(blob);

      window.location.href = vcfUrl;

   
    }
  }, [landing, contact]);

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <header className="text-center mb-12">
        {shopInfo.logo && (
          <img
            src={getImageSrc(shopInfo.logo)}
            alt="Shop Logo"
            className="mx-auto h-32 w-32 rounded-full object-cover shadow-lg"
          />
        )}
        <h1 className="mt-4 text-4xl font-bold text-gray-900">{shopInfo.shopName}</h1>
        <p className="mt-2 text-lg text-gray-600">{shopInfo.shopDescription}</p>
      </header>

      {/* Product Categories Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Product Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {shopInfo.productCategories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              {category.image && (
                <img
                  src={getImageSrc(category.image)}
                  alt={category.name}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      <img
  src="https://images.unsplash.com/photo-1633114128174-2f8aa49759b0"
  alt="Test Image"
  className="w-full h-48 object-cover"
/>

<img
  src="https://unifeed.s3.ap-south-1.amazonaws.com/1741055894473"
  alt="Test Image"
  className="w-full h-48 object-cover"
/>

<img
  src={testImage}
  alt="Local Test Image"
  className="w-full h-48 object-cover"
/>

      {/* Business Hours Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Business Hours</h2>
        <div className="bg-white rounded-lg shadow-md p-6 w-full">
          {Object.keys(shopInfo.businessHours).map((day) => (
            <div key={day} className="flex justify-between items-center border-b border-gray-200 py-2">
              <span className="font-medium text-gray-700">{day}</span>
              {shopInfo.businessHours[day].open ? (
                <span className="text-gray-600">
                  {shopInfo.businessHours[day].openingTime} - {shopInfo.businessHours[day].closingTime}
                </span>
              ) : (
                <span className="text-gray-600">Closed</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Other Pictures Section */}
      {shopInfo.otherPictures.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Gallery</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {shopInfo.otherPictures.map((picture, index) => (
              picture && (
                <img
                  key={index}
                  src={getImageSrc(picture)}
                  alt={`Gallery Image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                  onError={(e) => {
                    console.error("Image failed to load:", e.target.src); // Debugging
                  }}
                />
              )
            ))}
          </div>
        </section>
      )}

      {/* Contact Us Section */}
      <section className="text-center bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 text-left">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter your subject"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 text-left">
              Message
            </label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              rows="4"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
};

export default ShopLandingPage;


