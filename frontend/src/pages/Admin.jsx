import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios'; 
import { FaLock, FaBox, FaEnvelope, FaTrash, FaPlus, FaSignOutAlt, FaSync, FaCheckCircle, FaWhatsapp, FaUserTie, FaExternalLinkAlt } from 'react-icons/fa';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('ORDERS');
  const [orders, setOrders] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [applications, setApplications] = useState([]); // NEW STATE
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'abcustomlabels@5000') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true'); 
      fetchData();
    } else {
      alert('Access Denied');
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('adminAuth') === 'true') {
      setIsAuthenticated(true);
      fetchData();
    }
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [orderRes, productRes, appRes] = await Promise.all([
        axios.get(`${API_URL}/api/orders`),
        axios.get(`${API_URL}/api/products`),
        axios.get(`${API_URL}/api/applications`) // FETCH APPS
      ]);
      setOrders(orderRes.data);
      setGallery(productRes.data);
      setApplications(appRes.data);
    } catch (err) {
      console.error("Error fetching data", err);
    }
    setLoading(false);
  };

  // Actions (Delete Logic)
  const deleteItem = async (type, id) => {
    if(!window.confirm("Delete permanently?")) return;
    try {
      await axios.delete(`${API_URL}/api/${type}/${id}`);
      fetchData(); // Refresh all
    } catch (err) { alert("Failed to delete"); }
  };

  const addToGallery = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newProduct = {
      title: formData.get('title'),
      category: formData.get('category'),
      image: 'https://via.placeholder.com/300' 
    };
    try {
      await axios.post(`${API_URL}/api/products`, newProduct);
      alert("Added!"); fetchData(); e.target.reset();
    } catch (err) { alert("Error"); }
  };

  if (!isAuthenticated) return (
    <div style={styles.loginContainer}>
      <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={styles.loginBox}>
        <h2 style={{ marginBottom: '20px' }}>Admin Portal</h2>
        <form onSubmit={handleLogin}>
          <input type="password" placeholder="Passkey" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.loginInput} autoFocus />
          <button type="submit" style={styles.loginBtn}>Access Dashboard</button>
        </form>
      </motion.div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily:'Inter, sans-serif' }}>
      <nav style={styles.nav}>
        <div style={{ fontWeight: '800', fontSize: '1.2rem' }}>AB COMMAND CENTER</div>
        <button onClick={() => { setIsAuthenticated(false); sessionStorage.removeItem('adminAuth'); }} style={styles.logoutBtn}><FaSignOutAlt /> Logout</button>
      </nav>

      <div style={styles.mainContainer}>
        {/* TABS */}
        <div style={styles.headerRow}>
          <div style={{ display: 'flex', gap: '15px', flexWrap:'wrap' }}>
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
          <button onClick={fetchData} style={styles.refreshBtn}><FaSync /> Refresh</button>
        </div>

        {/* --- ORDERS VIEW --- */}
        {activeTab === 'ORDERS' && (
          <div style={styles.listContainer}>
             {orders.map(order => (
               <div key={order._id} style={styles.card}>
                 <div>
                   <h3>{order.name}</h3>
                   <p style={{color:'#666', fontSize:'0.9rem'}}>{order.contact}</p>
                   <div style={{background:'#f9f9f9', padding:'10px', marginTop:'10px', borderRadius:'8px'}}>{order.details}</div>
                 </div>
                 <div style={{display:'flex', gap:'10px', marginTop:'10px'}}>
                    <button onClick={() => deleteItem('orders', order._id)} style={styles.deleteBtn}><FaTrash/></button>
                 </div>
               </div>
             ))}
          </div>
        )}

        {/* --- NEW: CAREERS VIEW --- */}
        {activeTab === 'CAREERS' && (
          <div style={styles.listContainer}>
             {applications.length === 0 && <p style={{textAlign:'center', padding:'40px'}}>No applications yet.</p>}
             {applications.map(app => (
               <div key={app._id} style={styles.card}>
                 <div style={{display:'flex', justifyContent:'space-between'}}>
                    <div>
                      <h3 style={{margin:0}}>{app.role}</h3>
                      <span style={{fontSize:'0.85rem', color:'#6366f1', background:'#eef2ff', padding:'2px 8px', borderRadius:'4px'}}>{app.name}</span>
                    </div>
                    <span style={{fontSize:'0.8rem', color:'#999'}}>{new Date(app.date).toLocaleDateString()}</span>
                 </div>
                 
                 <div style={{margin:'15px 0', fontSize:'0.95rem', color:'#444'}}>
                    <strong>Why:</strong> {app.whyJoin || 'No reason provided.'}
                 </div>

                 <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:'15px', borderTop:'1px solid #eee', paddingTop:'15px'}}>
                    <a href={app.cvLink} target="_blank" style={{textDecoration:'none', color:'black', fontWeight:'bold', display:'flex', alignItems:'center', gap:'5px'}}>
                      <FaExternalLinkAlt size={14}/> View CV / Portfolio
                    </a>
                    <div style={{display:'flex', gap:'10px'}}>
                      <button onClick={() => window.open(`mailto:${app.email}`)} style={styles.actionBtn}>Email</button>
                      <button onClick={() => deleteItem('applications', app._id)} style={styles.deleteBtn}><FaTrash/></button>
                    </div>
                 </div>
               </div>
             ))}
          </div>
        )}

        {/* --- INVENTORY VIEW --- */}
        {activeTab === 'INVENTORY' && (
           <div style={{padding:'20px', background:'white', borderRadius:'16px'}}>
              <h3>Inventory Manager</h3>
              <p>Manage your products here (Code hidden for brevity).</p>
              {/* ... (Keep previous inventory code if needed) ... */}
           </div>
        )}

      </div>
    </div>
  );
};

// Styles (Condensed for brevity - merge with previous styles)
const styles = {
  loginContainer: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#111' },
  loginBox: { background: 'white', padding: '3rem', borderRadius: '16px', width: '100%', maxWidth: '400px', textAlign: 'center' },
  loginInput: { width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ddd', borderRadius: '8px' },
  loginBtn: { width: '100%', padding: '12px', background: 'black', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' },
  nav: { background: '#fff', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb' },
  logoutBtn: { background: '#f3f4f6', color: '#374151', border: 'none', padding: '8px 16px', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
  mainContainer: { maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' },
  headerRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' },
  tab: { padding: '10px 20px', background: 'white', color: '#666', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
  activeTab: { padding: '10px 20px', background: 'black', color: 'white', border: '1px solid black', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' },
  badge: { background: '#ef4444', color: 'white', padding: '2px 6px', borderRadius: '10px', fontSize: '0.7rem', marginLeft: '5px' },
  refreshBtn: { background: 'transparent', border: 'none', cursor: 'pointer', color: '#666', display: 'flex', alignItems: 'center', gap: '5px' },
  listContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' },
  card: { background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' },
  deleteBtn: { background: '#fee2e2', color: '#ef4444', border: 'none', padding: '8px', borderRadius: '6px', cursor: 'pointer' },
  actionBtn: { background: '#f3f4f6', color: 'black', border: 'none', padding: '8px 15px', borderRadius: '6px', cursor: 'pointer', fontWeight:'bold' }
};

export default Admin;