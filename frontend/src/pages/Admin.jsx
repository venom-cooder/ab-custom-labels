import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios'; 
import { FaLock, FaBox, FaEnvelope, FaTrash, FaPlus, FaSignOutAlt, FaSync, FaCheckCircle, FaWhatsapp } from 'react-icons/fa';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('ORDERS');
  const [orders, setOrders] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(false);

  // Vercel Env Variable
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  // --- AUTHENTICATION ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'abcustomlabels@5000') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true'); 
      fetchOrders();
      fetchProducts();
    } else {
      alert('Access Denied');
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('adminAuth') === 'true') {
      setIsAuthenticated(true);
      fetchOrders();
      fetchProducts();
    }
  }, []);

  // --- DATA FETCHING ---
  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/api/orders`);
      setOrders(res.data);
    } catch (err) {
      console.error("Error fetching orders", err);
    }
    setLoading(false);
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/products`);
      setGallery(res.data);
    } catch (err) {
      console.error("Error fetching products", err);
    }
  };

  // --- ACTIONS ---
  const deleteOrder = async (id) => {
    if(!window.confirm("Delete this order permanently?")) return;
    try {
      await axios.delete(`${API_URL}/api/orders/${id}`);
      setOrders(orders.filter(order => order._id !== id));
    } catch (err) {
      alert("Failed to delete");
    }
  };

  const addToGallery = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProduct = {
      title: formData.get('title'),
      category: formData.get('category'),
      image: 'https://via.placeholder.com/300' // Placeholder
    };

    try {
      await axios.post(`${API_URL}/api/products`, newProduct);
      alert("Item Added Successfully");
      fetchProducts(); 
      e.target.reset();
    } catch (err) {
      alert("Error adding product");
    }
  };

  // --- LOGIN SCREEN ---
  if (!isAuthenticated) {
    return (
      <div style={styles.loginContainer}>
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          style={styles.loginBox}
        >
          <div style={{background:'#f3f4f6', width:'80px', height:'80px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px auto'}}>
            <FaLock size={30} color="#333" />
          </div>
          <h2 style={{ marginBottom: '10px', fontSize: '1.8rem' }}>Admin Portal</h2>
          <p style={{color:'#666', marginBottom:'30px'}}>AB Custom Labels Command Center</p>
          
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              placeholder="Enter Security Passkey" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={styles.loginInput} 
              autoFocus
            />
            <button type="submit" style={styles.loginBtn}>
              Access Dashboard
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  // --- DASHBOARD UI ---
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily:'Inter, sans-serif' }}>
      {/* NAVBAR */}
      <nav style={styles.nav}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 0 4px rgba(16, 185, 129, 0.2)' }}></div>
          <span style={{ fontWeight: '800', fontSize: '1.2rem', letterSpacing: '-0.5px' }}>AB COMMAND CENTER</span>
        </div>
        <button onClick={() => { setIsAuthenticated(false); sessionStorage.removeItem('adminAuth'); }} style={styles.logoutBtn}>
          <FaSignOutAlt /> Logout
        </button>
      </nav>

      <div style={styles.mainContainer}>
        
        {/* HEADER & TABS */}
        <div style={styles.headerRow}>
          <div style={{ display: 'flex', gap: '15px' }}>
            <button onClick={() => setActiveTab('ORDERS')} style={activeTab === 'ORDERS' ? styles.activeTab : styles.tab}>
              <FaEnvelope /> Incoming Orders <span style={styles.badge}>{orders.length}</span>
            </button>
            <button onClick={() => setActiveTab('INVENTORY')} style={activeTab === 'INVENTORY' ? styles.activeTab : styles.tab}>
              <FaBox /> Inventory Manager
            </button>
          </div>
          <button onClick={() => { fetchOrders(); fetchProducts(); }} style={styles.refreshBtn}>
            <FaSync /> Refresh Data
          </button>
        </div>

        {/* --- ORDERS VIEW --- */}
        {activeTab === 'ORDERS' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {loading ? (
              <p style={{padding:'40px', textAlign:'center', color:'#666'}}>Syncing with cloud...</p>
            ) : orders.length === 0 ? (
              <div style={styles.emptyState}>
                <FaCheckCircle size={60} color="#e5e7eb" style={{marginBottom:'20px'}}/>
                <h3>All caught up!</h3>
                <p style={{color:'#888'}}>No pending orders to review.</p>
              </div>
            ) : (
              <div style={styles.orderList}>
                {orders.map((order) => (
                  <div key={order._id} style={styles.orderCard}>
                    {/* Order Info */}
                    <div style={{ flex: 1, paddingRight: '20px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <h3 style={{ fontSize: '1.3rem', margin: 0 }}>{order.name}</h3>
                        <span style={styles.dateTag}>{new Date(order.date).toLocaleDateString()}</span>
                      </div>
                      
                      <div style={{ display:'flex', alignItems:'center', gap:'10px', color: '#555', marginBottom: '15px', fontWeight:'500' }}>
                        📞 {order.contact}
                      </div>

                      <div style={styles.detailsBox}>
                        <div style={{marginBottom:'5px'}}><strong style={{color:'#000'}}>Source:</strong> {order.type}</div>
                        <div style={{lineHeight:'1.5'}}><strong style={{color:'#000'}}>Request:</strong> {order.details}</div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div style={styles.actionColumn}>
                       <button 
                         onClick={() => window.open(`https://wa.me/919243858944?text=Hello ${order.name}, I received your request regarding: ${order.details.substring(0, 30)}...`, '_blank')}
                         style={styles.whatsappBtn}
                       >
                         <FaWhatsapp size={18} /> Reply on WhatsApp
                       </button>
                       
                       <button onClick={() => deleteOrder(order._id)} style={styles.deleteBtn}>
                         <FaTrash /> Delete Request
                       </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* --- INVENTORY VIEW --- */}
        {activeTab === 'INVENTORY' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={styles.inventoryGrid}>
            
            {/* Add New Form */}
            <div style={styles.formCard}>
               <h3 style={{ fontSize:'1.4rem', marginBottom: '25px' }}>Add New Item</h3>
               <form onSubmit={addToGallery}>
                 <label style={styles.label}>Item Title</label>
                 <input name="title" placeholder="Ex: Neon Cyber Skull" style={styles.input} required />
                 
                 <label style={styles.label}>Category</label>
                 <select name="category" style={styles.input}>
                   <option value="stickers">Stickers</option>
                   <option value="logos">Logos</option>
                   <option value="labels">Labels</option>
                 </select>

                 <div style={styles.uploadBox}>
                    <FaPlus size={24} color="#cbd5e1" />
                    <span>Upload Image (Cloudinary Integration Ready)</span>
                 </div>

                 <button type="submit" style={styles.primaryBtn}>+ Add to Website</button>
               </form>
            </div>

            {/* Gallery Grid */}
            <div>
              <h3 style={{ fontSize:'1.4rem', marginBottom: '25px' }}>Live Gallery ({gallery.length})</h3>
              <div style={styles.galleryGrid}>
                {gallery.map((item) => (
                  <div key={item._id} style={styles.galleryCard}>
                    <div style={styles.galleryImagePlaceholder}>IMG</div>
                    <div style={{padding:'15px'}}>
                      <strong style={{display:'block', fontSize:'1.1rem'}}>{item.title}</strong>
                      <span style={styles.categoryTag}>{item.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}
      </div>
    </div>
  );
};

// --- EXPANDED STYLES ---
const styles = {
  // Login
  loginContainer: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#111' },
  loginBox: { background: 'white', padding: '3.5rem', borderRadius: '24px', width: '100%', maxWidth: '480px', textAlign: 'center', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' },
  loginInput: { width: '100%', padding: '16px', fontSize: '1.1rem', marginBottom: '20px', borderRadius: '12px', border: '2px solid #e5e7eb', outline: 'none', background:'#f9fafb' },
  loginBtn: { width: '100%', padding: '16px', background: 'black', color: 'white', fontSize: '1.1rem', fontWeight: 'bold', borderRadius: '12px', border: 'none', cursor: 'pointer', transition: '0.2s' },

  // Navigation
  nav: { background: '#fff', padding: '20px 5%', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', position:'sticky', top:0, zIndex:50 },
  logoutBtn: { background: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', display:'flex', alignItems:'center', gap:'8px', fontWeight:'600' },

  // Layout
  mainContainer: { maxWidth: '1600px', margin: '0 auto', padding: '40px 5%' }, // Wider container
  headerRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' },

  // Tabs
  tab: { padding: '12px 24px', background: 'white', color: '#6b7280', border: '1px solid #e5e7eb', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: '500', transition:'0.2s' },
  activeTab: { padding: '12px 24px', background: 'black', color: 'white', border: '1px solid black', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1rem', fontWeight: '600' },
  refreshBtn: { background: 'transparent', border: 'none', color: '#4b5563', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight:'600' },
  badge: { background: '#ef4444', color: 'white', padding: '2px 8px', borderRadius: '20px', fontSize: '0.8rem' },

  // Orders
  emptyState: { background: 'white', padding: '80px', borderRadius: '20px', textAlign: 'center', border: '1px dashed #e5e7eb' },
  orderList: { display: 'flex', flexDirection: 'column', gap: '20px' },
  orderCard: { background: 'white', padding: '30px', borderRadius: '16px', border: '1px solid #e5e7eb', display: 'flex', justifyContent: 'space-between', alignItems: 'center', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', flexWrap: 'wrap', gap:'20px' },
  dateTag: { fontSize: '0.85rem', color: '#6b7280', background: '#f3f4f6', padding: '4px 10px', borderRadius: '6px' },
  detailsBox: { background: '#f8fafc', padding: '20px', borderRadius: '12px', fontSize: '1rem', color: '#333', border: '1px solid #f1f5f9', lineHeight: '1.6' },
  
  // Order Actions
  actionColumn: { display: 'flex', flexDirection: 'column', gap: '12px', minWidth: '200px' },
  whatsappBtn: { background: '#25D366', color: 'white', border: 'none', padding: '12px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', fontSize:'0.95rem' },
  deleteBtn: { background: 'white', color: '#ef4444', border: '1px solid #fee2e2', padding: '12px 20px', borderRadius: '10px', cursor: 'pointer', fontWeight: '600', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' },

  // Inventory
  inventoryGrid: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', alignItems: 'start' },
  formCard: { background: 'white', padding: '35px', borderRadius: '20px', border: '1px solid #e5e7eb', position: 'sticky', top: '100px' },
  label: { display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.95rem', color: '#374151' },
  input: { width: '100%', padding: '14px', marginBottom: '20px', border: '1px solid #d1d5db', borderRadius: '10px', fontSize: '1rem', outline: 'none' },
  uploadBox: { border: '2px dashed #cbd5e1', padding: '40px', textAlign: 'center', borderRadius: '12px', marginBottom: '25px', cursor: 'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:'10px', color:'#94a3b8' },
  primaryBtn: { width: '100%', padding: '16px', background: 'black', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' },

  // Gallery
  galleryGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '25px' },
  galleryCard: { background: 'white', borderRadius: '16px', border: '1px solid #e5e7eb', overflow: 'hidden', transition: '0.2s' },
  galleryImagePlaceholder: { height: '180px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontWeight: 'bold', fontSize: '1.5rem' },
  categoryTag: { display:'inline-block', marginTop:'5px', fontSize:'0.8rem', color:'#6366f1', background:'#eef2ff', padding:'4px 10px', borderRadius:'20px', fontWeight:'600', textTransform:'capitalize' }
};

export default Admin;