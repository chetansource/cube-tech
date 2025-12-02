"use client";
import React, { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { submitResume } from "@/utils/routes/SubmitResume";

export default function ResumeUpload() {
  const [fullName, setFullName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "",
    contactNo: "",
    file: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  const pathname = usePathname();
  const isDetailsPage = pathname.includes("/careers/details");

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  // Validation functions
  const validateFullName = (name: string) => {
    if (!name.trim()) return "Full name is required";
    if (name.trim().length < 2) return "Name must be at least 2 characters";
    if (!/^[a-zA-Z\s]+$/.test(name))
      return "Name can only contain letters and spaces";
    return "";
  };

  const validatePhone = (phone: string) => {
    if (!phone.trim()) return "Contact number is required";
    const phoneDigits = phone.replace(/[\s+\-]/g, "");
    if (!/^(\+?91)?[6-9]\d{9}$/.test(phoneDigits)) {
      return "Please enter a valid 10-digit phone number";
    }
    return "";
  };

  const validateFile = (file: File | null) => {
    if (!file) return "Please upload a resume file";
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      return "Resume must be a PDF, DOC, or DOCX file";
    }
    return "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const fullNameError = validateFullName(fullName);
    const contactNoError = validatePhone(contactNo);
    const fileError = validateFile(file);

    setErrors({
      fullName: fullNameError,
      contactNo: contactNoError,
      file: fileError,
    });

    // Stop if there are errors
    if (fullNameError || contactNoError || fileError) {
      return;
    }

    try {
      await submitResume({
        fullName,
        number: contactNo,
        file,
        jobId: isDetailsPage ? pathname.split("/").pop() : undefined,
      });

      alert("Resume submitted successfully!");
      // Clear form
      setFullName("");
      setContactNo("");
      setFile(null);
      setErrors({ fullName: "", contactNo: "", file: "" });
    } catch (err) {
      console.error("Error submitting resume:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <section className="py-16 px-4 bg-gray-50 mb-19">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-center text-3xl md:text-[40px] font-medium mb-12 md:leading-[83px] md:tracking-[3.75px] uppercase">
          {isDetailsPage ? (
            <>
              <div className="hidden md:block">
                <span className="text-black font-light"> APPLY </span>
                <span className="text-accent font-semibold italic">NOW!</span>
              </div>
              <div className="block md:hidden">
                <span className="text-black font-light">LEAVE YOUR </span>
                <span className="text-accent font-semibold italic">
                  RESUME WITH US!
                </span>
              </div>
            </>
          ) : (
            <>
              <span className="text-black font-light">LEAVE YOUR </span>
              <span className="text-accent font-semibold italic">
                RESUME WITH US!
              </span>
            </>
          )}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="w-[80%] mx-auto">
            <div className="mb-6 ">
              <input
                type="text"
                placeholder="Full Name"
                className={`w-full p-4 border bg-white focus:bg-white
             focus:outline-none placeholder:text-[#1C1B1F] placeholder:text-lg
             focus:placeholder-transparent ${
               errors.fullName ? "border-red-500" : "border-[#EAEAEA]"
             }`}
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                onBlur={() =>
                  setErrors({ ...errors, fullName: validateFullName(fullName) })
                }
                required
              />
              {errors.fullName && (
                <p className="text-red-500 text-sm mt-2">{errors.fullName}</p>
              )}
            </div>

            <div className="mb-6">
              <input
                type="tel"
                placeholder="Contact No."
                className={`w-full p-4 border bg-white focus:bg-white
             focus:outline-none placeholder:text-[#1C1B1F] placeholder:text-lg
             focus:placeholder-transparent ${
               errors.contactNo ? "border-red-500" : "border-[#EAEAEA]"
             }`}
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                onBlur={() =>
                  setErrors({ ...errors, contactNo: validatePhone(contactNo) })
                }
                required
              />
              {errors.contactNo && (
                <p className="text-red-500 text-sm mt-2">{errors.contactNo}</p>
              )}
            </div>

            <div
              className={`mb-6 border p-8 text-center cursor-pointer ${
                errors.file
                  ? "border-red-500"
                  : isDragging
                  ? "border-[#EAEAEA]"
                  : "border-gray-200 bg-white"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={handleBrowseClick}
            >
              <div className="py-8">
                <p className="text-lg font-medium mb-2 text-[#1C1B1F] ">
                  Upload Resume
                </p>
                <p className="text-xs text-[#1C1B1F] md:leading-[26px]">
                  Drag And Drop File Here Or{" "}
                  <span className="font-bold opacity-[0.8]">Browse File</span>
                </p>
                {file && (
                  <p className="mt-4 text-accent font-medium">{file.name}</p>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
            </div>
            {errors.file && (
              <p className="text-red-500 text-sm mt-2 -mt-4 mb-4">
                {errors.file}
              </p>
            )}

            <button
              type="submit"
              className="w-full py-4 bg-accent text-white font-medium uppercase tracking-wide  transition-colors cursor-pointer"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
