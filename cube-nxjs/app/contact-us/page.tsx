"use client";
import Header from "@/components/header";
import type React from "react";
import { useEffect, useState } from "react";
import PhoneIcon from "@/components/icons/Phone";
import ContactMailicon from "@/components/icons/ContactMail";
import ContactLocation from "@/components/icons/ContactLocation";
import ContactFollowIcon from "@/components/icons/ContactFollowIcon";
import { ContactInfo } from "@/utils/routes/ContactInfo";
import { ContactSection } from "@/utils/types";
import LinkedinIcon from "@/components/icons/Linkedin";
import TwitterIcon from "@/components/icons/Twitter";
import { submitContactForm } from "@/utils/routes/SubmitContactForm";

const ContactUsPage = () => {
  const [interestedField, setInterestedField] = useState("");
  const [contactInfo, setContactInfo] = useState<ContactSection | null>(
    null
  );
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const getContactData = await ContactInfo("contactus"); // assuming slug is 'contact'
        if (getContactData) {
          setContactInfo(getContactData);
        }
      } catch (error) {
        console.error("Error fetching Contact Info:", error);
      }
    };

    fetchData();
  }, []);


  const handleSelectChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInterestedField(event.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await submitContactForm({
        name,
        email,
        phone,
        interestedField,
        message,
      });
      alert("Submitted successfully!");
      setName("");
      setEmail("");
      setPhone("");
      setInterestedField("");
      setMessage("");
    } catch (error) {
      console.error("Form submission error:", error);
      alert("Failed to submit. Please try again later.");
    }
  };
  

  if (!contactInfo) return <p>Loading...</p>;

  return (
    <section className="min-h-screen">
      <div
        className="relative flex justify-start items-center w-full min-h-screen bg-cover bg-center"
        style={{ backgroundImage: "url('/contact-us-banner.webp')" }}
      >
        <Header />

        {/* Contact Form Container */}
        <div className="container mx-auto flex-1 flex items-center mt-40 lg:mt-80 px-4 lg:px-0">
          <div className="bg-white w-full mx-auto p-6 lg:p-12 flex flex-col-reverse lg:flex-row">
            {/* Left side - Contact Info (Hidden on mobile, shown first on desktop) */}
            <div className="w-full lg:pr-[100px] ">
              <div className="hidden md:block">
                <h1 className="text-4xl sm:text-5xl lg:text-[75px] font-light leading-tight lg:leading-[112px]">
                  LET&apos;S GET IN
                </h1>
                <h1 className="text-4xl sm:text-5xl lg:text-[66px] font-bold italic leading-tight lg:leading-[99px] mb-8 lg:mb-[71px]">
                  TOUCH
                </h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-[36px] pt-6 lg:pt-12">
                {/* Phone */}
                <div className="flex items-center">
                  <div className="mr-3 lg:mr-2 text-center">
                    <PhoneIcon />
                  </div>
                  <div>
                    <h3 className="text-xs md:text-sm font-semibold leading-[20px] tracking-[0.28px]">
                      PHONE
                    </h3>
                    <p className="text-xs md:text-[13px] font-normal leading-[20px] tracking-[0.26px]">
                      {contactInfo.phone}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-center">
                  <div className="mr-3 lg:mr-2">
                    <ContactMailicon />
                  </div>
                  <div>
                    <h3 className="text-xs md:text-sm font-semibold leading-[20px] tracking-[0.28px]">
                      EMAIL
                    </h3>
                    <p className="text-xs md:text-[13px] font-normal leading-[20px] tracking-[0.26px]">
                      {contactInfo.email}
                    </p>
                  </div>
                </div>

                {contactInfo.locations.map((location, index) => (
                  <div
                    key={index}
                    className={`${
                      index === 1 ? "hidden md:flex" : "flex"
                    } items-start`}
                  >
                    <div className="mr-3 lg:mr-2">
                      <ContactLocation />
                    </div>
                    <div>
                      <h3 className="text-xs md:text-sm font-semibold leading-[20px] tracking-[0.28px]">
                        {location.label.toUpperCase()}
                      </h3>
                      <p className="text-xs md:text-sm font-normal leading-[18px] tracking-[0.5px] text-black/60">
                        {location.address}
                      </p>
                    </div>
                  </div>
                ))}

                {/* Follow Us */}
                <div className="flex items-start">
                  <div className="mr-3 lg:mr-2">
                    <ContactFollowIcon />
                  </div>
                  <div>
                    <h3 className="text-xs md:text-sm font-semibold leading-[20px] tracking-[0.28px]">
                      FOLLOW US:
                    </h3>
                    <div className="flex space-x-2 mt-2">
                      {contactInfo.socials.map((social, index) => {
                        const getIcon = (platform: string) => {
                          switch (platform.toLowerCase()) {
                            case "linkedin":
                              return <LinkedinIcon />;
                            case "twitter":
                              return <TwitterIcon />;
                            // Add more platforms as needed
                            default:
                              return platform[0].toUpperCase();
                          }
                        };

                        return (
                          <a
                            key={index}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="  p-1 flex flex-wrap space-x-2 mt-2 md:items-center md:justify-center"
                          >
                            {getIcon(social.platform)}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side - Form (Shown first on mobile, second on desktop) */}

            <div className="w-full mt-8  lg:mt-[80px] lg:mr-[49px] order-1 lg:order-2">
              <div className="block md:hidden">
                <h1 className="text-[40px] sm:text-5xl lg:text-[75px] font-light leading-tight lg:leading-[112px]">
                  LET&apos;S GET IN
                </h1>
                <h1 className="text-[40px] sm:text-5xl lg:text-[66px] font-bold italic leading-tight lg:leading-[99px] mb-8 lg:mb-[71px]">
                  TOUCH
                </h1>
              </div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="text-xs md:text-sm font-normal uppercase pb-4">
                  <label htmlFor="name" className="block mb-1 md:font-bold">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full border-b border-black pb-2 focus:outline-none bg-transparent"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="text-xs md:text-sm font-normal uppercase pb-4">
                  <label htmlFor="email" className="block mb-1 md:font-bold">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full border-b border-black pb-2 focus:outline-none bg-transparent"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="text-xs md:text-sm font-normal uppercase pb-4">
                  <label htmlFor="phone" className="block mb-1 md:font-bold">
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full border-b border-black pb-2 focus:outline-none bg-transparent"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="text-xs md:text-sm font-normal uppercase pb-4">
                  {/* <label htmlFor="field" className="block mb-1 font-bold">
                    Interested Field <span className="text-red-500">*</span>
                  </label> */}
                  <div className="relative  w-full mt-4">
                    <select
                      id="field"
                      value={interestedField}
                      onChange={(e) => {
                        handleSelectChange(e);
                        setIsSelectOpen(false); // dropdown selected, close icon
                      }}
                      onMouseDown={() => setIsSelectOpen((prev) => !prev)}
                      onBlur={() => setIsSelectOpen(false)} // when user clicks elsewhere
                      className="min-w-0 w-full border-b border-black pb-6 pr-8 bg-transparent focus:outline-none cursor-pointer appearance-none mb-2 md:font-bold "
                    >
                      <option value="" disabled hidden>
                        Interested Field *
                      </option>
                      <option value="Option 1">Option 1</option>
                      <option value="Option 2">Option 2</option>
                    </select>
                    <div
                      className={`absolute right-0 top-0 pointer-events-none transition-transform duration-200 mt-2 ${
                        isSelectOpen ? "rotate-180" : "rotate-0"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="8"
                        viewBox="0 0 13 8"
                        fill="none"
                      >
                        <path
                          d="M11.9393 0.433005L12.9993 1.49401L7.2223 7.27301C7.12973 7.36616 7.01965 7.44009 6.8984 7.49054C6.77715 7.54098 6.64712 7.56696 6.5158 7.56696C6.38447 7.56696 6.25444 7.54098 6.13319 7.49054C6.01194 7.44009 5.90187 7.36616 5.8093 7.27301L0.0292969 1.49401L1.0893 0.434005L6.5143 5.85801L11.9393 0.433005Z"
                          fill="black"
                        />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="text-xs md:text-sm">
                  <label htmlFor="message" className="block mb-1 md:font-bold">
                    Leave us Message
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    className="w-full border-b border-black pb-2 focus:outline-none resize-none bg-transparent"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent text-white py-2 md:py-4 font-medium hover:bg-green-600 transition-colors cursor-pointer"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;
