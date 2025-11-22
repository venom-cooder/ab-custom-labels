import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaWhatsapp, FaFacebook, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  const navigate = useNavigate();
  const openLink = (url) => window.open(url, '_blank');

  return (
    <footer>
      <div className="footer-grid">
        {/* Products */}
        <div className="footer-col">
          <h3>Products</h3>
          <span className="footer-link" onClick={()=>navigate('/gallery/labels')}>Labels</span>
          <span className="footer-link" onClick={()=>navigate('/gallery/stickers')}>Stickers</span>
          <span className="footer-link" onClick={()=>navigate('/gallery/logos')}>Logos</span>
        </div>
        
        {/* Company */}
        <div className="footer-col">
          <h3>Company</h3>
          <span className="footer-link" onClick={()=>navigate('/about')}>About Us</span>
          <span className="footer-link" onClick={()=>navigate('/career')}>Career</span>
          <span className="footer-link" onClick={()=>navigate('/faq')}>FAQs</span>
        </div>

        {/* Support */}
        <div className="footer-col">
          <h3>Support</h3>
          <span className="footer-link" onClick={()=>navigate('/help')}>Help</span>
          <span className="footer-link" onClick={()=>navigate('/feedback')}>Feedback</span>
          <span className="footer-link" onClick={()=>openLink('https://wa.me/919243858944')}>Contact</span>
        </div>

        {/* Important */}
        <div className="footer-col">
          <h3>Legal</h3>
          <span className="footer-link" onClick={()=>navigate('/privacy')}>Privacy</span>
          <span className="footer-link" onClick={()=>navigate('/privacy')}>Terms</span>
        </div>

        {/* Contact (Fixed Layout) */}
        <div className="footer-col contact-col">
          <div className="contact-row">
            <FaMapMarkerAlt color="#E5C76B"/> Katni, MP
          </div>
          <div className="contact-row">
            +91-9243858944 <FaPhoneAlt size={14} color="#888"/>
          </div>
          <div className="contact-row">
            ab.customlabels@gmail.com <FaEnvelope size={14} color="#888"/>
          </div>
          
          {/* Social Icons Row */}
          <div className="social-row">
            <FaInstagram size={24} cursor="pointer" color="#E1306C" onClick={()=>openLink('https://www.instagram.com/abcustomlables')} />
            <FaWhatsapp size={24} cursor="pointer" color="#25D366" onClick={()=>openLink('https://wa.me/919243858944')} />
            <FaFacebook size={24} cursor="pointer" color="#1877F2" onClick={()=>openLink('https://www.facebook.com/profile.php?id=61563586884230&rdid=GllYRaArSfdJjcxH&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DU7qtJUbN%2F')} />
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 AB Custom Labels. All rights reserved. | Designed with ❤️ in India
      </div>
    </footer>
  );
};

export default Footer;