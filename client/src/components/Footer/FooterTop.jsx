import React from "react";

// Reusable SocialIcon component with hover effect

// Footer component
const FooterTop = () => {
  // Array defining the content and structure of the footer
  const items = [
    // Social media icons

    // Footer sections
    {
      type: "section",
      title: "Solutions",
      items: ["Analytics", "Marketing", "Commerce", "Insights"],
    },
    {
      type: "section",
      title: "Support",
      items: ["Pricing", "Documentation", "Guides", "API Status"],
    },
    {
      type: "section",
      title: "Company",
      items: ["About", "Blog", "Jobs", "Press", "Careers"],
    },
    { type: "section", title: "Legal", items: ["Claim", "Policy", "Terms"] },
  ];
  // JSX structure of the footer
  return (
    <div className=" bg-gray-600 mx-auto p-16 grid lg:grid-cols-3 gap-8 text-gray-300">
      {/* Left section with brand and social icons */}
      <div>
        <h1 className="w-full text-3xl lg:text-4xl xl:text-5xl font-bold text-[#00df9a]">
          ANTRORSE.
        </h1>
        <p className="py-4">
          Registered in the year 2012 as a private limited company Antrorse
          Technosoft Private Limited is a CMMI Maturity Level 5 company and also
          certified as ISO/IEC 20000-1:2011 and ISO/IEC 27001:2013 having more
          then 28 software products.
        </p>
        <div className="flex justify-between md:w-[75%] my-6">
          {/* Mapping over social icons and rendering the SocialIcon component */}
          {items.map((item, index) =>
            item.type === "icon" ? (
              <SocialIcon key={index} icon={item.icon} />
            ) : null
          )}
        </div>
      </div>
      {/* Right section with footer content organized in sections */}
      <div className="lg:col-span-2 flex justify-between mt-6">
        {/* Mapping over sections and rendering content */}
        {items.map((item, index) =>
          item.type === "section" ? (
            <div key={index}>
              <h6 className="font-medium text-gray-100 text-xl">
                {item.title}
              </h6>
              <ul>
                {/* Mapping over items in each section */}
                {item.items.map((subItem, subIndex) => (
                  <li key={subIndex} className="py-2 text-sm">
                    {subItem}
                  </li>
                ))}
              </ul>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
};
export default FooterTop;
