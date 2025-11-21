"use client";
import React, { useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { submitResume } from "@/utils/routes/SubmitResume";

export default function ResumeUpload() {
  const [fullName, setFullName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a resume file.");
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
                className="w-full p-4 border border-[#EAEAEA] focus:outline-none placeholder:text-[#1C1B1F] placeholder:text-lg"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <input
                type="tel"
                placeholder="Contact No."
                className="w-full p-4 border border-[#EAEAEA] focus:outline-none placeholder:text-[#1C1B1F] placeholder:text-lg"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                required
              />
            </div>

            <div
              className={`mb-6 border border-gray-200 p-8 text-center cursor-pointer ${
                isDragging ? "border-[#EAEAEA]" : "bg-white"
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
