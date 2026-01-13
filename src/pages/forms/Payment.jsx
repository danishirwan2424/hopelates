import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navigator from "../../LandingPage_cmp/Navigator";
import { Upload, CheckCircle } from "lucide-react";

function Payment() {
  const navigate = useNavigate();
  const location = useLocation();

  // 🚨 SAFETY CHECK: prevent direct access / refresh
  if (!location.state) {
    navigate("/donation");
    return null;
  }

  // ✅ Data from previous page
  const { packages, totalAmount, totalItems, userDetails } = location.state;

  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
      setFileName(file.name);
    }
  };

  const handlePayment = () => {
    if (!uploadedFile) {
      alert("Please upload proof of payment before proceeding");
      return;
    }

    // ✅ Pass REAL data to confirmation page
    navigate("/donation-confirmation", {
      state: {
        packages,
        totalAmount,
        donorName: userDetails.fullName,
        paymentMethod: "Online Transfer",
        transactionDate: new Date().toLocaleString(),
      },
    });
  };

  return (
    <>
      <Navigator />

      <div className="min-h-screen bg-[#EDEDED] pt-[120px] py-12 px-6">
        <div className="max-w-2xl mx-auto bg-white rounded-[12px] shadow-sm p-10">
          <h1 className="text-[32px] font-bold text-gray-900 mb-8">
            Payment Details
          </h1>

          {/* Order Summary */}
          <div className="bg-[#E8F5F1] p-6 rounded-[8px] mb-8">
            <h2 className="text-[18px] font-semibold text-gray-900 mb-4">
              Order Summary
            </h2>

            {/* Package List */}
            <div className="space-y-3 mb-4">
              {packages.map((pkg, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center text-[14px]"
                >
                  <div>
                    <p className="text-gray-900 font-medium">{pkg.name}</p>
                    <p className="text-gray-600 text-[13px]">
                      RM {pkg.price} × {pkg.quantity}
                    </p>
                  </div>
                  <p className="text-gray-900 font-semibold">
                    RM {pkg.subtotal}
                  </p>
                </div>
              ))}
            </div>

            {/* Donor Info */}
            <div className="flex justify-between items-center pb-3 mb-3 border-b border-gray-300 text-[14px]">
              <span className="text-gray-600">Donor:</span>
              <span className="font-semibold text-gray-900">
                {userDetails.fullName}
              </span>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center pt-2">
              <div>
                <p className="text-[#019461] text-[16px] font-semibold">
                  Total Amount
                </p>
                <p className="text-gray-600 text-[13px]">
                  {totalItems} package{totalItems > 1 ? "s" : ""}
                </p>
              </div>
              <p className="text-[#019461] text-[24px] font-bold">
                RM {totalAmount}
              </p>
            </div>
          </div>

          {/* Upload Proof of Payment */}
          <div className="mb-8">
            <h2 className="text-[18px] font-semibold text-gray-900 mb-4">
              Upload Proof of Payment
            </h2>

            <div className="border-2 border-dashed border-gray-300 rounded-[8px] p-6 text-center">
              <input
                type="file"
                id="file-upload"
                accept="image/*,.pdf"
                onChange={handleFileUpload}
                className="hidden"
              />

              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                {uploadedFile ? (
                  <div className="flex flex-col items-center">
                    <CheckCircle className="w-16 h-16 text-[#019461] mb-3" />
                    <p className="text-[#019461] font-semibold text-[14px] mb-1">
                      File Uploaded Successfully!
                    </p>
                    <p className="text-gray-600 text-[13px] mb-3">
                      {fileName}
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-12 h-12 text-gray-400 mb-3" />
                    <p className="text-gray-700 font-medium text-[14px] mb-1">
                      Click to upload payment receipt
                    </p>
                    <p className="text-gray-500 text-[13px]">
                      PNG, JPG, PDF up to 10MB
                    </p>
                  </div>
                )}
              </label>
            </div>

            {!uploadedFile && (
              <p className="text-red-500 text-[13px] mt-2 text-center">
                * Payment receipt is required to complete the transaction
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => navigate("/check-details")}
              className="flex-1 bg-[#E5E7EB] text-gray-700 font-semibold text-[14px] py-2.5 rounded-[6px]"
            >
              Back
            </button>

            <button
              onClick={handlePayment}
              disabled={!uploadedFile}
              className={`flex-1 font-semibold text-[14px] py-2.5 rounded-[6px] ${
                uploadedFile
                  ? "bg-[#019461] text-white hover:bg-[#017a54]"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Complete Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
