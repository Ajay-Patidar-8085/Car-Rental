import React from 'react';
import Container from './Container';
import { Link } from 'react-router-dom';
import { footerData } from '../data/footerData';


export default function Footer() {
  const { company, sections, bottom } = footerData;

  // Helper function to render links with consistent styling
  const renderLink = (item) => {
    const linkProps = {
      className: "text-[#131313] text-base font-medium hover:text-[#3563E9] transition-colors duration-200",
      style: { opacity: "60%" }
    };

    if (item.external) {
      return (
        <a
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          {...linkProps}
        >
          {item.text}
        </a>
      );
    } else {
      return (
        <Link to={item.href} {...linkProps}>
          {item.text}
        </Link>
      );
    }
  };

  return (
    <footer className="bg-white w-full">
      <Container className="py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Information */}
          <div className="lg:col-span-1">
            <Link to="/">
              <h2
                className="mb-4 cursor-pointer"
                style={{
                  fontSize: company.fontSize,
                  fontWeight: company.fontWeight,
                  color: company.logoColor,

                }}
              >
                {company.name}
              </h2></Link>
            <p
              className="text-[#131313] text-base font-medium leading-6"
              style={{ opacity: "60%" }}
            >
              {company.description}
            </p>
          </div>

          {/* Dynamic Sections */}
          {sections.map((section, index) => (
            <div key={section.title} className="lg:col-span-1">
              <h3 className="text-[#1A202C] text-xl font-semibold mb-6">
                {section.title}
              </h3>
              <ul className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    {renderLink(item)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            {/* Copyright */}
            <div className="text-[#131313] text-base font-medium" style={{ opacity: "60%" }}>
              {bottom.copyright}
            </div>

            {/* Legal Links */}
            <div className="flex space-x-6">
              {bottom.legalLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className="text-[#131313] text-base font-medium hover:text-[#3563E9] transition-colors duration-200"
                  style={{ opacity: "60%" }}
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
