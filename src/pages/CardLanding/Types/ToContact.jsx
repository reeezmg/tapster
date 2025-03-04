import React, { useState, useEffect } from "react";
import { ClipboardCopy, ClipboardCheck } from "lucide-react";

function ContactInput({ contact, setContact }) {
  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-4">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={contact.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            name="company"
            value={contact.company}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter company name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Contact</label>
          <input
            type="tel"
            name="phone"
            value={contact.phone}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter phone number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={contact.email}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter email"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">GSTN</label>
          <input
            type="text"
            name="gstn"
            value={contact.gstn}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter GSTN"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Address</label>
          <textarea
            name="address"
            value={contact.address}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Enter address"
            rows="3"
          ></textarea>
        </div>
      </div>
    </div>
  );
}

function ContactPreview({ contact, landing }) {
  const [copiedField, setCopiedField] = useState(null);

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 1000);
  };

  const copyAllInfo = () => {
    const info = `Name: ${contact.name || "N/A"}\nCompany: ${contact.company || "N/A"}\nContact: ${contact.phone || "N/A"}\nEmail: ${contact.email || "N/A"}\nAddress: ${contact.address || "N/A"}\nGSTN: ${contact.gstn || "N/A"}`;
    copyToClipboard(info, "all");
  };
  
  useEffect(() => {
    console.log(contact)
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

      setTimeout(() => {
        URL.revokeObjectURL(vcfUrl);
      }, 1000);
    }
  }, [landing, contact]);
 

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white max-w-md mx-auto">
    <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Contact Info</h2>
    <div className="space-y-3">
      {["name", "company", "phone", "email", "address", "gstn"].map((key) => (
        <div key={key} className="flex justify-between items-center border p-2 rounded-md">
          <p>
            <span className="font-medium capitalize">{key}:</span> {contact[key] || "N/A"}
          </p>
          <button
            onClick={() => copyToClipboard(contact[key] || "N/A", key)}
            className="text-gray-600 hover:text-blue-600"
          >
            {copiedField === key ? <ClipboardCheck size={18} /> : <ClipboardCopy size={18} />}
          </button>
        </div>
      ))}
    </div>
    <button
      onClick={copyAllInfo}
      className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 flex items-center justify-center gap-2"
    >
      {copiedField === "all" ? <ClipboardCheck size={18} /> : <ClipboardCopy size={18} />} Copy All
    </button>
  </div>
  );
}

export { ContactInput, ContactPreview };
