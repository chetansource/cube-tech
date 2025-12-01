"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import LocationIcon from "./icons/location";
import MailIcon from "./icons/mail";
import RightArrowIcon from "./icons/right-arrow";
import UpArrowIcon from "./icons/up-arrow";
import DownArrow from "./icons/mobile-icons/DownArrow";
import Image from "next/image";
import { getSiteSettings, type SiteSettings } from "@/utils/routes/SiteSettings";

export default function Footer() {
  const [isCompanyOpen, setCompanyOpen] = useState(false);
  const [isQuickLinksOpen, setQuickLinksOpen] = useState(false);
  const [isContactOpen, setContactOpen] = useState(false);
  const [isNewsLetterOpen, setNewsLetterOpen] = useState(false);
  const [footerData, setFooterData] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFooterData = async () => {
      try {
        const data = await getSiteSettings();
        setFooterData(data);
      } catch (error) {
        console.error("Error loading footer data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFooterData();
  }, []);
  return (
    <footer className="w-full bg-footer text-white">
      <div className=" flex flex-col md:flex-row  justify-between pt-12 pr-8 pl-2 md:p-12 md:gap-y-12">
        {/* Left Section - Company, Quick Links, Contact */}
        <div className="flex flex-col sm:flex-row gap-x-[87px] gap-8">
          <div>
            <div
              className="flex justify-between border-b-2 md:border-none"
              onClick={() => setCompanyOpen(!isCompanyOpen)}
            >
              <h3 className="text-lg not-italic font-semibold md:font-bold mb-4 leading-[27px] md:tracking-normal tracking-[3.6px] capitalize">
                Company
              </h3>
              <span
                className={`md:hidden inline-flex items-center transition-transform duration-300 origin-center`}
                style={{
                  transform: isCompanyOpen ? "scaleY(-1)" : "scaleY(1)",
                }}
              >
                <DownArrow />
              </span>
            </div>
            <ul
              className={`text-base space-y-2 transition-all duration-500 ease-in-out transform py-3 ${
                isCompanyOpen
                  ? "opacity-100 translate-y-0 max-h-[500px]"
                  : "opacity-0 -translate-y-2 max-h-0 overflow-hidden"
              } md:opacity-100 md:translate-y-0 md:max-h-full md:overflow-visible md:block`}
            >
              {loading ? (
                <li className="text-gray-400">Loading...</li>
              ) : footerData?.footer?.companyLinks && footerData.footer.companyLinks.length > 0 ? (
                footerData.footer.companyLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.url}
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <Link
                      href="/"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/about-us"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      Careers
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact-us"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      Contact
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div>
            <div
              className="flex justify-between border-b-2 md:border-none"
              onClick={() => setQuickLinksOpen(!isQuickLinksOpen)}
            >
              <h3 className="text-lg not-italic font-semibold md:font-bold mb-4 leading-[27px] md:tracking-normal tracking-[3.6px] capitalize">
                Quick Links
              </h3>
              <span
                className={`md:hidden inline-flex items-center transition-transform duration-300 origin-center`}
                style={{
                  transform: isQuickLinksOpen ? "scaleY(-1)" : "scaleY(1)",
                }}
              >
                <DownArrow />
              </span>
            </div>
            <ul
              className={`text-base space-y-2 transition-all duration-500 ease-in-out transform py-3 ${
                isQuickLinksOpen
                  ? "opacity-100 translate-y-0 max-h-[500px]"
                  : "opacity-0 -translate-y-2 max-h-0 overflow-hidden"
              } md:opacity-100 md:translate-y-0 md:max-h-full md:overflow-visible md:block`}
            >
              {loading ? (
                <li className="text-gray-400">Loading...</li>
              ) : footerData?.footer?.quickLinks && footerData.footer.quickLinks.length > 0 ? (
                footerData.footer.quickLinks.map((link, index) => (
                  <li key={index}>
                    <Link
                      href={link.url}
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))
              ) : (
                <>
                  <li>
                    <Link
                      href="/services"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/projects"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      Projects
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/resources"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      Resources
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/#faq"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      FAQ
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>

          <div>
            <div
              className="flex justify-between border-b-2 md:border-none"
              onClick={() => setContactOpen(!isContactOpen)}
            >
              <h3 className="text-lg not-italic font-semibold md:font-bold mb-4 leading-[27px] md:tracking-normal tracking-[3.6px] capitalize">
                Contact Us
              </h3>
              <span
                className={`md:hidden inline-flex items-center transition-transform duration-300 origin-center`}
                style={{
                  transform: isContactOpen ? "scaleY(-1)" : "scaleY(1)",
                }}
              >
                <DownArrow />
              </span>
            </div>
            <ul
              className={`text-base space-y-2 transition-all duration-500 ease-in-out transform py-3 ${
                isContactOpen
                  ? "opacity-100 translate-y-0 max-h-[500px]"
                  : "opacity-0 -translate-y-2 max-h-0 overflow-hidden"
              } md:opacity-100 md:translate-y-0 md:max-h-full md:overflow-visible md:block`}
            >
              {loading ? (
                <li className="text-gray-400">Loading...</li>
              ) : footerData?.footer?.contact ? (
                <>
                  {footerData.footer.contact.address && (
                    <li className="flex items-center gap-3 py-4">
                      <LocationIcon />
                      <span className="text-gray-400">
                        {footerData.footer.contact.address}
                      </span>
                    </li>
                  )}
                  {footerData.footer.contact.email && (
                    <li className="flex items-center gap-3">
                      <MailIcon />
                      <span className="text-gray-400">
                        {footerData.footer.contact.email}
                      </span>
                    </li>
                  )}
                </>
              ) : (
                <>
                  <li className="flex items-center gap-3 py-4">
                    <LocationIcon />
                    <span className="text-gray-400">
                      123 Green Highway, Eco City, EC 12345
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <MailIcon />
                    <span className="text-gray-400">support@cube-highways.com</span>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="md:hidden">
            <div
              className="flex justify-between border-b-2 md:border-none"
              onClick={() => setNewsLetterOpen(!isNewsLetterOpen)}
            >
              <h3 className="text-lg not-italic font-semibold md:font-bold mb-4 leading-[27px] md:tracking-normal tracking-[3.6px] capitalize">
                {" "}
                Sign up to our Newsletter
              </h3>
              <span
                className={`md:hidden inline-flex items-center transition-transform duration-300 origin-center`}
                style={{
                  transform: isNewsLetterOpen ? "scaleY(-1)" : "scaleY(1)",
                }}
              >
                <DownArrow />
              </span>
            </div>
            <form
              className={`text-base space-y-2 transition-all duration-500 ease-in-out transform py-3 ${
                isNewsLetterOpen
                  ? "flex  opacity-100 translate-y-0 max-h-[500px]"
                  : "opacity-0 -translate-y-2 max-h-0 overflow-hidden"
              }`}
            >
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-2 border-b-1 border-white  focus:outline-none text-white  w-full"
              />
              <button
                type="submit"
                className=" hover:bg-green-600 px-4 py-2 rounded-r-md transition-colors duration-300 hover:cursor-pointer"
              >
                <RightArrowIcon color="white" />
              </button>
            </form>
          </div>
        </div>
        {/* Right Section - Newsletter + Socials */}
        <div className="flex flex-col gap-y-8 md:gap-y-12 md:w-sm  w-full">
          <div className="hidden md:block">
            <h4 className="text-lg font-medium mb-2">
              Sign up to our Newsletter{" "}
            </h4>
            <form className="flex ">
              <input
                type="email"
                placeholder="Email"
                className="px-4 py-2 border-b-1 border-white  focus:outline-none text-white  w-full"
              />
              <button
                type="submit"
                className=" hover:bg-green-600 px-4 py-2 rounded-r-md transition-colors duration-300 hover:cursor-pointer"
              >
                <RightArrowIcon color="white" />
              </button>
            </form>
          </div>
          <div>
            <h3 className="md:text-xl md:font-bold mb-8 text-lg not-italic font-semibold leading-[27px] md:tracking-normal tracking-[3.6px] capitalize">
              Follow Us
            </h3>
            <div className="flex gap-5 md:gap-0 md:space-x-full mb-6 md:justify-between">
              {loading ? (
                <span className="text-gray-400">Loading...</span>
              ) : footerData?.footer?.socials && footerData.footer.socials.length > 0 ? (
                footerData.footer.socials.map((social, index) => {
                  const getSocialIcon = (platform: string) => {
                    const lowerPlatform = platform.toLowerCase();
                    if (lowerPlatform.includes('facebook')) return <Facebook className="h-6 w-6" />;
                    if (lowerPlatform.includes('twitter')) return <Twitter className="h-6 w-6" />;
                    if (lowerPlatform.includes('instagram')) return <Instagram className="h-6 w-6" />;
                    if (lowerPlatform.includes('linkedin')) return <Linkedin className="h-6 w-6" />;
                    return <Facebook className="h-6 w-6" />;
                  };

                  return (
                    <a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                    >
                      {social.icon?.url ? (
                        <Image
                          src={social.icon.url}
                          alt={social.icon.alt || social.platform}
                          width={24}
                          height={24}
                          className="h-6 w-6"
                        />
                      ) : (
                        getSocialIcon(social.platform)
                      )}
                    </a>
                  );
                })
              ) : (
                <>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors duration-300"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Footer SVG */}
      <div className="relative">
        <div className=" px-1 py-8 md:p-12">
          <Image
            src="/Group-Footer.svg"
            alt="Footer Icon1"
            width={347}
            height={181}
            className="w-full h-full object-contain"
          />
        </div>
        <div className="px-1 py-8 md:p-4 md:px-12">
          <div className="relative w-[90%] aspect-42/6">
            <Image
              src="/Group-Footer2.svg"
              alt="Footer Icon2"
              fill
              className="object-contain"
            />
          </div>
        </div>
        <div className="relative flex flex-col md:absolute md:bottom-[68px] md:right-[68px]  md:flex-row  md:gap-6 md:text-right  text-base font-normal leading-[67px]">
          <span
            className="flex px-4 md:px-0 items-center gap-2 hover:cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Back to top <UpArrowIcon />
          </span>
          <span className="px-4 md:px-0">
            {footerData?.footer?.copyrightText || 'copyrights©cubehighways 2025'}
          </span>
        </div>
      </div>
    </footer>
  );
}
