import React from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';

const FAQ = () => {
  const navigate = useNavigate();
  return (
    <div className="app-container">
      <nav><div className="logo" onClick={()=>navigate('/')}>AB CUSTOM.</div></nav>
      <div className="content-page">
        <h1>Frequently Asked Questions</h1>
        
        <div className="faq-list" style={{display:'flex', flexDirection:'column', gap:'20px'}}>
          {[
            {q: "How do I place a custom label order?", a: "You can reach out to us via WhatsApp or our contact form with your label needs. Once confirmed, we begin designing."},
            {q: "Can I get a preview of the label before final printing?", a: "Yes! We always share a digital proof before printing. Only after your approval do we start production."},
            {q: "What is the delivery time?", a: "Orders are typically delivered within 2–5 business days after design approval."},
            {q: "Do you offer bulk discounts?", a: "Yes, we provide special rates for bulk or repeat orders. Contact us for a custom quote."},
            {q: "Can I cancel or return my order?", a: "Since every order is custom-made, we do not accept cancellations or returns once printing has started."},
            {q: "What payment methods do you accept?", a: "UPI, Google Pay, and bank transfers."}
          ].map((item, i) => (
            <div key={i} style={{background:'#111', padding:'20px', borderRadius:'10px', border:'1px solid #333'}}>
              <h3 style={{color:'var(--accent)', marginTop:0}}>🔸 {item.q}</h3>
              <p style={{marginBottom:0}}>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default FAQ;