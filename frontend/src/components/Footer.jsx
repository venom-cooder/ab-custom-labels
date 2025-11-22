import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaWhatsapp, FaFacebook, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-col">
          <h3>Products</h3>
          <span className="footer-link" onClick={()=>navigate('/gallery/labels')}>Labels</span>
          <span className="footer-link" onClick={()=>navigate('/gallery/stickers')}>Stickers</span>
          <span className="footer-link" onClick={()=>navigate('/gallery/logos')}>Logo</span>
        </div>
        <div className="footer-col">
          <h3>Company</h3>
          <span className="footer-link" onClick={()=>navigate('/about')}>About Us</span>
          <span className="footer-link" onClick={()=>navigate('/career')}>Career</span>
          {/* Replaced Social News with FAQs as requested */}
          <span className="footer-link" onClick={()=>navigate('/faq')}>FAQs</span>
        </div>
        <div className="footer-col">
          <h3>Support</h3>
          <span className="footer-link" onClick={()=>navigate('/help')}>Help</span>
          <span className="footer-link" onClick={()=>window.open('https://wa.me/919243858944', '_blank')}>Contact Us</span>
          <span className="footer-link" onClick={()=>navigate('/feedback')}>Feedback</span>
        </div>
        <div className="footer-col">
          <h3>Important</h3>
          <span className="footer-link" onClick={()=>navigate('/privacy')}>Privacy Policy</span>
          <span className="footer-link" onClick={()=>navigate('/privacy')}>Terms & Condition</span>
        </div>
        <div className="footer-col contact-col">
          <div className="contact-row"><FaMapMarkerAlt color="var(--accent)"/> Katni, MP</div>
          <div className="contact-row"><FaPhoneAlt/> +91-9243858944</div>
          <div className="contact-row"><FaEnvelope/> ab.customlabels@gmail.com</div>
          <div className="social-icons">
            <FaInstagram size={28} cursor="pointer" onClick={()=>window.open('https://www.instagram.com/abcustomlables','_blank')} />
            <FaWhatsapp size={28} cursor="pointer" onClick={()=>window.open('https://wa.me/919243858944','_blank')} />
            <FaFacebook size={28} cursor="pointer" onClick={()=>window.open('https://www.facebook.com/profile.php?id=61563586884230','_blank')} />
          </div>
        </div>
      </div>
      <div className="footer-bottom">© 2025 AB Custom Labels. All rights reserved. | Designed with ❤️ in India</div>
    </footer>
  );
};

export default Footer;