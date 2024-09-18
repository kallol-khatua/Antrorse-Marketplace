import React from 'react';
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';
// Reusable SocialIcon component with hover effect
const SocialIcon = ({ icon: Icon }) => (
  <Icon className="social-icon hover:text-[#00df9a]" size={30} />
);
// Footer component
const FooterMid = () => {
  // Array defining the content and structure of the footer
  const items = [
    // Social media icons
    { type: 'icon', icon: FaFacebookSquare },
    { type: 'icon', icon: FaInstagram },
    { type: 'icon', icon: FaTwitterSquare },
   
    { type: 'icon', icon: FaDribbbleSquare },
    // Footer sections
    { type: 'section', title: 'Solutions', items: ['FREE SHIPPING'] },
    { type: 'section', title: 'Support', items: ['EASY RETURNS'] },
    { type: 'section', title: 'Company', items: ['100% AUTHENTIC']},
    { type: 'section', title: 'Legal', items: ['BRANDS']},
  ];
  // JSX structure of the footer
  return (
    <div className='bg-gray-600 mx-auto py-16 px-4 grid lg:grid-cols-3 gap-10 text-gray-300 '>
      {/* Left section with brand and social icons */}
     
      {/* ==================== */}
      {/* Right section with footer content organized in sections */}
      <div className='lg:col-span-2 flex justify-evenly '>
        {/* Mapping over sections and rendering content */}
        {items.map((item, index) => (
          item.type === 'section' ? (
            <div key={index}>
              <h6 className="font-medium text-gray-100 text-xl">{item.title}</h6>
              
              <ul>
             
                {/* Mapping over items in each section */}
                {item.items.map((subItem, subIndex) => (
                  <li key={subIndex} className='py-2 text-sm'>{subItem}</li>
                ))}
              </ul>
            </div>
          ) : null
        ))}
        
      </div>
       {/* ============== */}
       <div className='flex justify-items-center flex-col justify-center '>
        
        <p className='py-4'>
        Show us some love ❤ on social media
        </p>
        <div className='flex justify-evenly md:w-[60%] '>
          
          <FaDribbbleSquare/>
          <FaFacebookSquare/>
          <FaInstagram/>
          <FaTwitterSquare/>
          

        </div>
      </div>
    </div>
  );
};
export default FooterMid;