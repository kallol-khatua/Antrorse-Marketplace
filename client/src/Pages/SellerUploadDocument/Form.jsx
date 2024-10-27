import React, { useState } from "react";
import axios from "axios";

const DocumentUploadForm = () => {
  const [formData, setFormData] = useState({
    aadhaarNumber: "",
    aadhaarFile: null,
    panNumber: "",
    panFile: null,
    gstNumber: "",
    gstFile: null,
    fssaiFile: null,
    trademarkFile: null,
    trademarkBrandName: "",
    gstRequired: false,
    fssaiRequired: false,
    trademarkRequired: false,
    additionalBrands: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const addBrand = () => {
    setFormData((prev) => ({
      ...prev,
      additionalBrands: [
        ...prev.additionalBrands,
        { brandName: "", nocFile: null },
      ],
    }));
  };

  const updateBrand = (index, field, value) => {
    const updatedBrands = [...formData.additionalBrands];
    updatedBrands[index][field] = value;
    setFormData((prev) => ({ ...prev, additionalBrands: updatedBrands }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("aadhaarNumber", formData.aadhaarNumber);
    data.append("aadhaarFile", formData.aadhaarFile);
    data.append("panNumber", formData.panNumber);
    data.append("panFile", formData.panFile);

    if (formData.gstRequired) {
      data.append("gstNumber", formData.gstNumber);
      data.append("gstFile", formData.gstFile);
    }

    if (formData.fssaiRequired) {
      data.append("fssaiFile", formData.fssaiFile);
    }

    if (formData.trademarkRequired) {
      data.append("trademarkBrandName", formData.trademarkBrandName);
      data.append("trademarkFile", formData.trademarkFile);
    }

    formData.additionalBrands.forEach((brand, index) => {
      data.append(`brandName_${index}`, brand.brandName);
      data.append(`nocFile_${index}`, brand.nocFile);
    });

    // console.log(formData);

    // try {
    //   const response = await axios.post(
    //     `${import.meta.env.VITE_BACKEND_URL}/upload-documents`,
    //     data,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }
    //   );
    //   console.log("Files uploaded successfully!");
    //   console.log(response.data);
    // } catch (error) {
    //   console.error("Error uploading files:", error);
    //   console.log("Failed to upload files.");
    // }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4"
    >
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Upload Documents
      </h2>

      {/* Aadhaar Card */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-700">
          Aadhaar Number
        </label>
        <input
          type="text"
          name="aadhaarNumber"
          required
          value={formData.aadhaarNumber}
          onChange={handleChange}
          className="mt-2 block w-full px-4 py-2 border rounded-lg text-gray-700"
          placeholder="Enter aadhar card number"
        />
        <label className="block font-semibold text-gray-700 mt-2">
          Aadhaar Card (PDF)
        </label>
        <input
          type="file"
          name="aadhaarFile"
          accept=".pdf"
          required
          onChange={handleFileChange}
          className="mt-2 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {/* PAN Card */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-700">PAN Number</label>
        <input
          type="text"
          name="panNumber"
          required
          value={formData.panNumber}
          onChange={handleChange}
          placeholder="Enter pan card number"
          className="mt-2 block w-full px-4 py-2 border rounded-lg text-gray-700"
        />
        <label className="block font-semibold text-gray-700 mt-2">
          PAN Card (PDF)
        </label>
        <input
          type="file"
          name="panFile"
          accept=".pdf"
          required
          onChange={handleFileChange}
          className="mt-2 block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>

      {/* GST */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-700">
          <input
            type="checkbox"
            checked={formData.gstRequired}
            onChange={() =>
              setFormData((prev) => ({
                ...prev,
                gstRequired: !prev.gstRequired,
              }))
            }
            className="mr-2"
          />
          Do you want to upload GST?
        </label>
      </div>
      {formData.gstRequired && (
        <div className="space-y-2 mb-4">
          <label className="block font-semibold text-gray-700">
            GST Number
          </label>
          <input
            type="text"
            name="gstNumber"
            required
            value={formData.gstNumber}
            onChange={handleChange}
            placeholder="Enter gst number"
            className="block w-full px-4 py-2 border rounded-lg text-gray-700"
          />
          <label className="block font-semibold text-gray-700">
            GST File (PDF)
          </label>
          <input
            type="file"
            name="gstFile"
            accept=".pdf"
            required
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      )}

      {/* FSSAI */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-700">
          <input
            type="checkbox"
            checked={formData.fssaiRequired}
            onChange={() =>
              setFormData((prev) => ({
                ...prev,
                fssaiRequired: !prev.fssaiRequired,
              }))
            }
            className="mr-2"
          />
          Do you want to upload FSSAI?
        </label>
      </div>
      {formData.fssaiRequired && (
        <div className="mb-4">
          <label className="block font-semibold text-gray-700">
            FSSAI License (PDF)
          </label>
          <input
            type="file"
            name="fssaiFile"
            accept=".pdf"
            required
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      )}

      {/* Trademark */}
      <div className="mb-4">
        <label className="block font-semibold text-gray-700">
          <input
            type="checkbox"
            checked={formData.trademarkRequired}
            onChange={() =>
              setFormData((prev) => ({
                ...prev,
                trademarkRequired: !prev.trademarkRequired,
              }))
            }
            className="mr-2"
          />
          Do you want to upload Trademark License?
        </label>
      </div>
      {formData.trademarkRequired && (
        <div className="space-y-2 mb-4">
          <label className="block font-semibold text-gray-700">
            Trademark Brand Name
          </label>
          <input
            type="text"
            name="trademarkBrandName"
            required
            placeholder="Enter brand name"
            value={formData.trademarkBrandName}
            onChange={handleChange}
            className="block w-full px-4 py-2 border rounded-lg text-gray-700"
          />
          <label className="block font-semibold text-gray-700">
            Trademark File (PDF)
          </label>
          <input
            type="file"
            name="trademarkFile"
            accept=".pdf"
            required
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      )}

      {/* Additional Brand */}
      {formData.additionalBrands.map((brand, index) => (
        <div key={index} className="mb-4">
          <label className="block font-semibold text-gray-700">
            Brand Name
          </label>
          <input
            type="text"
            required
            value={brand.brandName}
            placeholder="Enter brand name"
            onChange={(e) => updateBrand(index, "brandName", e.target.value)}
            className="block w-full px-4 py-2 border rounded-lg text-gray-700"
          />
          <label className="block font-semibold text-gray-700 mt-2">
            NOC File (PDF)
          </label>
          <input
            type="file"
            accept=".pdf"
            required
            onChange={(e) => updateBrand(index, "nocFile", e.target.files[0])}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>
      ))}

      <button
        type="button"
        onClick={addBrand}
        className="px-4 py-2 bg-green-500 text-white rounded-lg"
      >
        Add Brand
      </button>

      <button
        type="submit"
        className="w-full mt-6 py-2 bg-blue-600 text-white rounded-lg font-semibold"
      >
        Submit
      </button>
    </form>
  );
};

export default DocumentUploadForm;
