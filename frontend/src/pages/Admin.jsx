import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios'; 
import { FaLock, FaBox, FaEnvelope, FaTrash, FaPlus, FaSignOutAlt, FaSync, FaCheckCircle, FaWhatsapp, FaUserTie, FaExternalLinkAlt, FaPaperPlane } from 'react-icons/fa';

const Admin = () => {
  // --- STATE MANAGEMENT ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('ORDERS'); // ORDERS | CAREERS | INVENTORY
  const [orders, setOrders] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(false);

  // --- API CONNECTION (Vercel/Render) ---
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  // --- 1. LOGIN LOGIC ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'abcustomlabels@5000') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true'); 
      fetchData();
    } else {
      alert('Access Denied: Incorrect Passkey');
    }
  };

  // Check session on load
  useEffect(() => {
    if (sessionStorage.getItem('adminAuth') === 'true') {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  // --- 2. DATA FETCHING ---
  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Orders, Products, and Job Applications in parallel
      const [orderRes, productRes, appRes] = await Promise.all([
        axios.get(`${API_URL}/api/orders`),
        axios.get(`${API_URL}/api/products`),
        axios.get(`${API_URL}/api/applications`)
      ]);
      
      setOrders(orderRes.data);
      setGallery(productRes.data);
      setApplications(appRes.data);
    } catch (err) {
      console.error("Error connecting to backend:", err);
    }
    setLoading(false);
  };

  // --- 3. ACTIONS ---
  const deleteItem = async (endpoint, id) => {
    if(!window.confirm("Are you sure you want to delete this permanently?")) return;
    try {
      await axios.delete(`${API_URL}/api/${endpoint}/${id}`);
      fetchData(); // Refresh data
    } catch (err) {
      alert("Failed to delete item.");
    }
  };

  const addToGallery = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProduct = {
      title: formData.get('title'),
      category: formData.get('category'),
      image: 'https://via.placeholder.com/300' // Placeholder until Cloudinary is set up
    };

    try {
      await axios.post(`${API_URL}/api/products`, newProduct);
      alert("Item Added Successfully");
      fetchData(); 
      e.target.reset();
    } catch (err) {
      alert("Error adding product.");
    }
  };

  // --- 4. LOGIN SCREEN UI ---
  if (!isAuthenticated) {
    return (
      <div style={styles.loginContainer}>
        <motion.div 
          initial={{ scale: 0.95, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }} 
          style={styles.loginBox}
        >
          <div style={styles.lockIcon}><FaLock size={30} color="#333" /></div>
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
            <button type="submit" style={styles.loginBtn}>Access Dashboard</button>
          </form>
        </motion.div>
      </div>
    );
  }

  // --- 5. DASHBOARD UI ---
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily:'Inter, sans-serif' }}>
      
      {/* HEADER */}
      <nav style={styles.nav}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={styles.statusDot}></div>
          <span style={{ fontWeight: '800', fontSize: '1.2rem', letterSpacing: '-0.5px' }}>AB COMMAND CENTER</span>
        </div>
        <button onClick={() => { setIsAuthenticated(false); sessionStorage.removeItem('adminAuth'); }} style={styles.logoutBtn}>
          <FaSignOutAlt /> Logout
        </button>
      </nav>

      <div style={styles.mainContainer}>
        
        {/* TABS & REFRESH */}
        <div style={styles.headerRow}>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <button onClick={() => setActiveTab('ORDERS')} style={activeTab === 'ORDERS' ? styles.activeTab : styles.tab}>
              <FaEnvelope /> Orders <span style={styles.badge}>{orders.length}</span>
            </button>
            <button onClick={() => setActiveTab('CAREERS')} style={activeTab === 'CAREERS' ? styles.activeTab : styles.tab}>
              <FaUserTie /> Careers <span style={styles.badge}>{applications.length}</span>
            </button>
            <button onClick={() => setActiveTab('INVENTORY')} style={activeTab === 'INVENTORY' ? styles.activeTab : styles.tab}>
              <FaBox /> Inventory
            </button>
          </div>
          <button onClick={fetchData} style={styles.refreshBtn}><FaSync /> Refresh Data</button>
        </div>

        {/* --- TAB 1: ORDERS --- */}
        {activeTab === 'ORDERS' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {orders.length === 0 ? (
              <div style={styles.emptyState}>
                <FaCheckCircle size={60} color="#e5e7eb" style={{marginBottom:'20px'}}/>
                <h3>All caught up!</h3><p style={{color:'#888'}}>No pending orders.</p>
              </div>
            ) : (
              <div style={styles.gridList}>
                {orders.map((order) => (
                  <div key={order._id} style={styles.card}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
                        <h3 style={{ fontSize: '1.3rem', margin: 0 }}>{order.name}</h3>
                        <span style={styles.dateTag}>{new Date(order.date).toLocaleDateString()}</span>
                      </div>
                      <p style={{ color: '#555', fontWeight: '500', marginBottom:'15px' }}>📞 {order.contact}</p>
                      <div style={styles.detailBox}>
                        <strong>Source:</strong> {order.type} <br />
                        <strong>Request:</strong> {order.details}
                      </div>
                    </div>
                    <div style={styles.actionRow}>
                       <button onClick={() => window.open(`https://wa.me/919243858944?text=Hello ${order.name}...`, '_blank')} style={styles.whatsappBtn}>
                         <FaWhatsapp /> Reply
                       </button>
                       <button onClick={() => deleteItem('orders', order._id)} style={styles.deleteBtn}><FaTrash /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* --- TAB 2: CAREERS --- */}
        {activeTab === 'CAREERS' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            {applications.length === 0 ? (
              <div style={styles.emptyState}>
                <h3>No Applications Yet</h3><p style={{color:'#888'}}>Waiting for talent...</p>
              </div>
            ) : (
              <div style={styles.gridList}>
                {applications.map((app) => (
                  <div key={app._id} style={styles.card}>
                    <div style={{borderBottom:'1px solid #eee', paddingBottom:'15px', marginBottom:'15px'}}>
                      <h3 style={{fontSize:'1.2rem', margin:0}}>{app.role}</h3>
                      <div style={{display:'flex', justifyContent:'space-between', marginTop:'5px'}}>
                        <span style={styles.highlightTag}>{app.name}</span>
                        <span style={{fontSize:'0.8rem', color:'#999'}}>{new Date(app.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div style={{marginBottom:'20px'}}>
                      <p style={{color:'#666', fontSize:'0.9rem', margin:'0 0 5px 0'}}><strong>Why Join:</strong></p>
                      <p style={{fontSize:'0.95rem'}}>{app.whyJoin}</p>
                    </div>

                    <div style={styles.actionRow}>
                      <a href={app.cvLink} target="_blank" rel="noreferrer" style={styles.linkBtn}>
                        <FaExternalLinkAlt /> View CV
                      </a>
                      <div style={{display:'flex', gap:'10px'}}>
                        <button onClick={() => window.open(`mailto:${app.email}`)} style={styles.secondaryBtn}><FaPaperPlane/> Email</button>
                        <button onClick={() => deleteItem('applications', app._id)} style={styles.deleteBtn}><FaTrash/></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {/* --- TAB 3: INVENTORY --- */}
        {activeTab === 'INVENTORY' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} style={styles.inventoryGrid}>
            <div style={styles.formCard}>
               <h3 style={{ fontSize:'1.4rem', marginBottom: '25px' }}>Add Item</h3>
               <form onSubmit={addToGallery}>
                 <label style={styles.label}>Item Title</label>
                 <input name="title" placeholder="Ex: Neon Skull" style={styles.input} required />
                 <label style={styles.label}>Category</label>
                 <select name="category" style={styles.input}>
                   <option value="stickers">Stickers</option>
                   <option value="logos">Logos</option>
                   <option value="labels">Labels</option>
                 </select>
                 <button type="submit" style={styles.primaryBtn}>+ Add to Website</button>
               </form>
            </div>

            <div>
              <h3 style={{ fontSize:'1.4rem', marginBottom: '25px' }}>Gallery ({gallery.length})</h3>
              <div style={styles.galleryGrid}>
                {gallery.map((item) => (
                  <div key={item._id} style={styles.galleryCard}>
                    <div style={styles.imgPlaceholder}>IMG</div>
                    <div style={{padding:'15px'}}>
                      <strong>{item.title}</strong><br/>
                      <span style={{fontSize:'0.8rem', color:'#888'}}>{item.category}</span>
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

// --- STYLES ---
const styles = {
  loginContainer: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#111' },
  loginBox: { background: 'white', padding: '3.5rem', borderRadius: '24px', width: '100%', maxWidth: '450px', textAlign: 'center' },
  lockIcon: { background:'#f3f4f6', width:'70px', height:'70px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' },
  loginInput: { width: '100%', padding: '15px', fontSize: '1rem', marginBottom: '20px', borderRadius: '10px', border: '1px solid #ddd', outline: 'none' },
  loginBtn: { width: '100%', padding: '15px', background: 'black', color: 'white', fontWeight: 'bold', borderRadius: '10px', border: 'none', cursor: 'pointer' },

  nav: { background: '#fff', padding: '20px 5%', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', position:'sticky', top:0, zIndex:50 },
  statusDot: { width: '10px', height: '10px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.2)' },
  logoutBtn: { background: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display:'flex', alignItems:'center', gap:'8px', fontWeight:'600' },

  mainContainer: { maxWidth: '1400px', margin: '0 auto', padding: '40px 5%' },
  headerRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' },
  
  tab: { padding: '12px 24px', background: 'white', color: '#666', border: '1px solid #e5e7eb', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '500' },
  activeTab: { padding: '12px 24px', background: 'black', color: 'white', border: '1px solid black', borderRadius: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: '600' },
  badge: { background: '#ef4444', color: 'white', padding: '2px 8px', borderRadius: '20px', fontSize: '0.7rem' },
  refreshBtn: { background: 'transparent', border: 'none', color: '#4b5563', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight:'600' },

  emptyState: { background: 'white', padding: '60px', borderRadius: '20px', textAlign: 'center', border: '1px dashed #e5e7eb' },
  gridList: { display: 'grid', gap: '20px', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))' },
  card: { background: 'white', padding: '25px', borderRadius: '16px', border: '1px solid #e5e7eb', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.02)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  dateTag: { fontSize: '0.85rem', color: '#666', background: '#f3f4f6', padding: '4px 10px', borderRadius: '6px' },
  detailBox: { background: '#f8fafc', padding: '15px', borderRadius: '10px', fontSize: '0.95rem', color: '#333', border: '1px solid #f1f5f9', lineHeight: '1.5' },
  
  actionRow: { display: 'flex', gap: '10px', marginTop: '20px', alignItems: 'center' },
  whatsappBtn: { flex: 1, background: '#25D366', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' },
  deleteBtn: { background: 'white', color: '#ef4444', border: '1px solid #fee2e2', padding: '10px', borderRadius: '8px', cursor: 'pointer' },
  linkBtn: { flex: 1, textDecoration: 'none', background: 'black', color: 'white', padding: '10px', borderRadius: '8px', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px', fontSize:'0.9rem', fontWeight:'bold' },
  secondaryBtn: { background: '#f3f4f6', color: 'black', border: 'none', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', display:'flex', alignItems:'center', gap:'5px' },
  highlightTag: { background:'#eef2ff', color:'#4f46e5', padding:'4px 10px', borderRadius:'20px', fontSize:'0.85rem', fontWeight:'bold' },

  inventoryGrid: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', alignItems: 'start' },
  formCard: { background: 'white', padding: '30px', borderRadius: '20px', border: '1px solid #e5e7eb', position: 'sticky', top: '100px' },
  label: { display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.9rem', color: '#374151' },
  input: { width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none' },
  primaryBtn: { width: '100%', padding: '14px', background: 'black', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' },
  
  galleryGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' },
  galleryCard: { background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' },
  imgPlaceholder: { height: '100px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', fontWeight: 'bold' }
};

export default Admin;