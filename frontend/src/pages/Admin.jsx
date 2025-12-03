import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios'; 
import { 
  Lock, Box, Mail, Trash2, Plus, LogOut, 
  RefreshCcw, CheckCircle, MessageCircle, User, ExternalLink, 
  Send, HelpCircle, Briefcase, Edit, X 
} from 'lucide-react';

const Admin = () => {
  // --- STATE MANAGEMENT ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  // Tabs: ORDERS | INVENTORY | CAREERS | FAQS
  const [activeTab, setActiveTab] = useState('ORDERS'); 

  // Data States
  const [orders, setOrders] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [applications, setApplications] = useState([]); 
  const [jobs, setJobs] = useState([]); 
  const [faqs, setFaqs] = useState([]); 

  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // --- INVENTORY FORM STATE (For Add & Edit) ---
  const [editId, setEditId] = useState(null); // If null, we are adding. If set, we are editing.
  const [invForm, setInvForm] = useState({
    title: '',
    description: '',
    category: 'stickers',
    subcategory: 'general',
    materials: '', // New Optional Field
    idealFor: ''   // New Optional Field
  });

  // Hardcoded API URL to fix build error
  const API_URL = 'http://localhost:5001';

  // --- 1. LOGIN ---
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'abcustomlabels@5000') {
      setIsAuthenticated(true);
      sessionStorage.setItem('adminAuth', 'true'); 
      fetchAllData();
    } else {
      alert('Access Denied: Incorrect Passkey');
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem('adminAuth') === 'true') {
      setIsAuthenticated(true);
      fetchAllData();
    }
  }, []);

  // --- 2. FETCH ALL DATA ---
  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [orderRes, productRes, appRes, jobRes, faqRes] = await Promise.all([
        axios.get(`${API_URL}/api/orders`),
        axios.get(`${API_URL}/api/products`),
        axios.get(`${API_URL}/api/applications`),
        axios.get(`${API_URL}/api/careers`),
        axios.get(`${API_URL}/api/faqs`)
      ]);
      
      setOrders(orderRes.data);
      setGallery(productRes.data);
      setApplications(appRes.data);
      setJobs(jobRes.data);
      setFaqs(faqRes.data);
    } catch (err) {
      console.error("Error connecting to backend:", err);
    }
    setLoading(false);
  };

  // --- 3. GENERIC DELETE ACTION ---
  const deleteItem = async (endpoint, id) => {
    if(!window.confirm("Are you sure you want to delete this permanently?")) return;
    try {
      await axios.delete(`${API_URL}/api/${endpoint}/${id}`);
      fetchAllData(); 
    } catch (err) {
      alert("Failed to delete item.");
    }
  };

  // --- 4. INVENTORY: HANDLE SUBMIT (ADD or EDIT) ---
  const handleInventorySubmit = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    const form = e.target;
    const formData = new FormData();
    
    formData.append('title', invForm.title);
    formData.append('category', invForm.category);
    formData.append('subcategory', invForm.subcategory);
    formData.append('description', invForm.description);
    
    // Add Optional Fields
    formData.append('materials', invForm.materials);
    formData.append('idealFor', invForm.idealFor);
    
    // Only append image if a new one is selected
    if (form.image.files[0]) {
      formData.append('image', form.image.files[0]);
    } else if (!editId) {
      // If adding new item, image is mandatory
      alert("Please select an image!");
      setIsUploading(false);
      return;
    }

    try {
      if (editId) {
        // --- EDIT MODE (PUT) ---
        await axios.put(`${API_URL}/api/products/${editId}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert("Item Updated Successfully!");
      } else {
        // --- ADD MODE (POST) ---
        await axios.post(`${API_URL}/api/products`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        alert("Item Uploaded Successfully!");
      }
      
      resetInventoryForm();
      fetchAllData(); 
    } catch (err) {
      alert("Operation failed. Ensure Backend has PUT route enabled.");
      console.error(err);
    }
    setIsUploading(false);
  };

  // Pre-fill form for editing
  const startEdit = (item) => {
    setEditId(item._id);
    setInvForm({
      title: item.title,
      description: item.description || '',
      category: item.category,
      subcategory: item.subcategory || 'general',
      materials: item.materials || '',
      idealFor: item.idealFor || ''
    });
    // Scroll to top of form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetInventoryForm = () => {
    setEditId(null);
    setInvForm({
      title: '',
      description: '',
      category: 'stickers',
      subcategory: 'general',
      materials: '',
      idealFor: ''
    });
    // Reset file input manually
    const fileInput = document.getElementById('fileInput');
    if(fileInput) fileInput.value = "";
  };

  // --- 5. CAREER & FAQ ACTIONS ---
  const addJob = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      await axios.post(`${API_URL}/api/careers`, {
        title: form.title.value,
        location: form.location.value,
        description: form.description.value
      });
      alert("Job Posted!");
      fetchAllData();
      form.reset();
    } catch (err) { alert("Error posting job"); }
  };

  const addFaq = async (e) => {
    e.preventDefault();
    const form = e.target;
    try {
      await axios.post(`${API_URL}/api/faqs`, {
        question: form.question.value,
        answer: form.answer.value
      });
      alert("FAQ Added!");
      fetchAllData();
      form.reset();
    } catch (err) { alert("Error adding FAQ"); }
  };


  // --- LOGIN UI ---
  if (!isAuthenticated) {
    return (
      <div style={styles.loginContainer}>
        <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={styles.loginBox}>
          <div style={styles.lockIcon}><Lock size={30} color="#333" /></div>
          <h2 style={{ marginBottom: '10px', fontSize: '1.8rem' }}>Admin Portal</h2>
          <p style={{color:'#666', marginBottom:'30px'}}>AB Custom Labels Command Center</p>
          <form onSubmit={handleLogin}>
            <input type="password" placeholder="Enter Security Passkey" value={password} onChange={(e) => setPassword(e.target.value)} style={styles.loginInput} autoFocus />
            <button type="submit" style={styles.loginBtn}>Access Dashboard</button>
          </form>
        </motion.div>
      </div>
    );
  }

  // --- DASHBOARD UI ---
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily:'Inter, sans-serif' }}>
      
      {/* HEADER */}
      <nav style={styles.nav}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={styles.statusDot}></div>
          <span style={{ fontWeight: '800', fontSize: '1.2rem', letterSpacing: '-0.5px' }}>AB COMMAND CENTER</span>
        </div>
        <button onClick={() => { setIsAuthenticated(false); sessionStorage.removeItem('adminAuth'); }} style={styles.logoutBtn}>
          <LogOut size={16} /> Logout
        </button>
      </nav>

      <div style={styles.mainContainer}>
        
        {/* TABS */}
        <div style={styles.headerRow}>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button onClick={() => setActiveTab('ORDERS')} style={activeTab === 'ORDERS' ? styles.activeTab : styles.tab}>
              <Mail size={16} /> Orders <span style={styles.badge}>{orders.length}</span>
            </button>
            <button onClick={() => setActiveTab('INVENTORY')} style={activeTab === 'INVENTORY' ? styles.activeTab : styles.tab}>
              <Box size={16} /> Inventory
            </button>
            <button onClick={() => setActiveTab('CAREERS')} style={activeTab === 'CAREERS' ? styles.activeTab : styles.tab}>
              <User size={16} /> Careers <span style={styles.badge}>{applications.length}</span>
            </button>
            <button onClick={() => setActiveTab('FAQS')} style={activeTab === 'FAQS' ? styles.activeTab : styles.tab}>
              <HelpCircle size={16} /> FAQs
            </button>
          </div>
          <button onClick={fetchAllData} style={styles.refreshBtn}><RefreshCcw size={16} /> Refresh Data</button>
        </div>

        {/* --- TAB 1: ORDERS --- */}
        {activeTab === 'ORDERS' && (
          <div style={styles.listContainer}>
             {orders.length === 0 && <div style={styles.emptyState}><CheckCircle size={40} color="#ddd"/><p>No pending orders.</p></div>}
             {orders.map(order => (
               <div key={order._id} style={styles.card}>
                 <div style={{marginBottom:'15px'}}>
                   <div style={{display:'flex', justifyContent:'space-between'}}>
                     <h3>{order.name}</h3>
                     <span style={styles.dateTag}>{new Date(order.date).toLocaleDateString()}</span>
                   </div>
                   <p style={{color:'#666', fontSize:'0.9rem'}}>📞 {order.contact}</p>
                   <div style={styles.sourceTag}>Source: {order.type}</div>
                 </div>
                 <div style={styles.detailBox}><strong>Request:</strong> {order.details}</div>
                 <div style={styles.actionRow}>
                    <button onClick={() => window.open(`https://wa.me/919243858944?text=Hello ${order.name}, regarding your order...`, '_blank')} style={styles.whatsappBtn}><MessageCircle size={16}/> Reply</button>
                    <button onClick={() => deleteItem('orders', order._id)} style={styles.deleteBtn}><Trash2 size={16}/></button>
                 </div>
               </div>
             ))}
          </div>
        )}

        {/* --- TAB 2: INVENTORY (ADD / EDIT) --- */}
        {activeTab === 'INVENTORY' && (
          <div style={styles.inventoryGrid}>
            {/* ADD/EDIT FORM */}
            <div style={styles.formCard}>
               <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'20px'}}>
                 <h3 style={{ fontSize:'1.4rem', margin:0 }}>{editId ? 'Edit Item' : 'Add to Gallery'}</h3>
                 {editId && <button onClick={resetInventoryForm} style={{background:'none', border:'none', color:'#666', cursor:'pointer', display:'flex', alignItems:'center', gap:'5px'}}><X size={16}/> Cancel Edit</button>}
               </div>
               
               <form onSubmit={handleInventorySubmit}>
                 
                 <label style={styles.label}>1. Category</label>
                 <select 
                    name="category" 
                    style={styles.input} 
                    value={invForm.category}
                    onChange={(e) => setInvForm({...invForm, category: e.target.value, subcategory: 'general'})}
                 >
                   <option value="stickers">Stickers</option>
                   <option value="logos">Logos</option>
                   <option value="labels">Labels</option>
                   <option value="cards">Cards</option>
                   <option value="posters">Posters</option>
                   <option value="banners">Banners</option>
                 </select>

                 {/* DYNAMIC SUBCATEGORY SELECTION */}
                 {invForm.category === 'labels' && (
                   <div style={styles.subCatBox}>
                      <label style={styles.label}>2. Shape Type</label>
                      <select name="subcategory" style={styles.input} value={invForm.subcategory} onChange={(e) => setInvForm({...invForm, subcategory: e.target.value})}>
                        <option value="general">General</option>
                        <option value="circle">Circle</option>
                        <option value="oval">Oval</option>
                        <option value="bottle">Bottle</option>
                        <option value="rounded">Rounded</option>
                        <option value="jar">Jar</option>
                      </select>
                   </div>
                 )}
                 {invForm.category === 'posters' && (
                   <div style={styles.subCatBox}>
                      <label style={styles.label}>2. Poster Type</label>
                      <select name="subcategory" style={styles.input} value={invForm.subcategory} onChange={(e) => setInvForm({...invForm, subcategory: e.target.value})}>
                        <option value="general">General</option>
                        <option value="event">Event</option>
                        <option value="art">Art / Decor</option>
                        <option value="promo">Promotional</option>
                      </select>
                   </div>
                 )}
                 {invForm.category === 'banners' && (
                   <div style={styles.subCatBox}>
                      <label style={styles.label}>2. Banner Type</label>
                      <select name="subcategory" style={styles.input} value={invForm.subcategory} onChange={(e) => setInvForm({...invForm, subcategory: e.target.value})}>
                        <option value="general">General</option>
                        <option value="outdoor">Outdoor</option>
                        <option value="standee">Standee</option>
                        <option value="vinyl">Vinyl</option>
                      </select>
                   </div>
                 )}

                 <label style={styles.label}>Title</label>
                 <input 
                    name="title" 
                    placeholder="Ex: Gold Foil Logo" 
                    style={styles.input} 
                    value={invForm.title}
                    onChange={(e) => setInvForm({...invForm, title: e.target.value})}
                    required 
                 />
                 
                 <label style={styles.label}>Description</label>
                 <textarea 
                    name="description" 
                    placeholder="Describe material, finish..." 
                    style={{...styles.input, height:'80px'}} 
                    value={invForm.description}
                    onChange={(e) => setInvForm({...invForm, description: e.target.value})}
                    required 
                 />

                 {/* NEW OPTIONAL FIELDS */}
                 <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px'}}>
                   <div>
                     <label style={styles.label}>Materials (Optional)</label>
                     <input 
                        name="materials" 
                        placeholder="Ex: Vinyl, Gloss" 
                        style={styles.input} 
                        value={invForm.materials}
                        onChange={(e) => setInvForm({...invForm, materials: e.target.value})}
                     />
                   </div>
                   <div>
                     <label style={styles.label}>Ideal For (Optional)</label>
                     <input 
                        name="idealFor" 
                        placeholder="Ex: Bottles, Laptops" 
                        style={styles.input} 
                        value={invForm.idealFor}
                        onChange={(e) => setInvForm({...invForm, idealFor: e.target.value})}
                     />
                   </div>
                 </div>

                 <label style={styles.label}>{editId ? 'Replace Photo (Optional)' : 'Upload Photo'}</label>
                 <input type="file" id="fileInput" name="image" accept="image/*" style={{marginBottom:'20px'}} />

                 <button type="submit" style={styles.primaryBtn} disabled={isUploading}>
                   {isUploading ? 'Processing...' : (editId ? 'Update Item' : '+ Add Item')}
                 </button>
               </form>
            </div>

            {/* GALLERY LIST */}
            <div>
              <h3 style={{ fontSize:'1.4rem', marginBottom: '20px' }}>Current Items ({gallery.length})</h3>
              <div style={styles.galleryGrid}>
                {gallery.map((item) => (
                  <div key={item._id} style={styles.galleryCard}>
                    <div style={{position:'relative'}}>
                       <img src={item.imageUrl} style={styles.galleryImg} alt={item.title} />
                       {/* Category Badge */}
                       <span style={{position:'absolute', bottom:'10px', left:'10px', background:'rgba(0,0,0,0.6)', color:'white', fontSize:'0.7rem', padding:'2px 6px', borderRadius:'4px', textTransform:'uppercase'}}>
                         {item.category}
                       </span>
                    </div>
                    
                    <div style={{padding:'15px'}}>
                      <strong>{item.title}</strong><br/>
                      <span style={{fontSize:'0.75rem', color:'#888', textTransform:'uppercase'}}>{item.subcategory || ''}</span>
                      
                      {/* Optional fields display if present */}
                      {item.materials && <p style={{fontSize:'0.8rem', color:'#666', marginTop:'5px'}}><strong>Mat:</strong> {item.materials}</p>}
                      
                      <div style={{display:'flex', gap:'10px', marginTop:'15px'}}>
                        <button onClick={() => startEdit(item)} style={styles.editBtn}><Edit size={16}/> Edit</button>
                        <button onClick={() => deleteItem('products', item._id)} style={styles.deleteBtn}><Trash2 size={16}/></button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* --- TAB 3: CAREERS --- */}
        {activeTab === 'CAREERS' && (
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px'}}>
            <div style={styles.formCard}>
              <h3>Post New Job</h3>
              <form onSubmit={addJob}>
                <input name="title" placeholder="Job Title" style={styles.input} required />
                <input name="location" placeholder="Location" style={styles.input} required />
                <textarea name="description" placeholder="Job Description..." style={{...styles.input, height:'100px'}} required />
                <button type="submit" style={styles.primaryBtn}>Post Job</button>
              </form>
              <h4 style={{marginTop:'30px'}}>Active Listings</h4>
              {jobs.map(job => (
                <div key={job._id} style={{padding:'10px', borderBottom:'1px solid #eee', display:'flex', justifyContent:'space-between', alignItems:'center'}}>
                  <span>{job.title}</span>
                  <button onClick={() => deleteItem('careers', job._id)} style={styles.deleteBtn}><Trash2 size={16}/></button>
                </div>
              ))}
            </div>
            <div>
               <h3>Received Applications ({applications.length})</h3>
               {applications.map(app => (
                 <div key={app._id} style={styles.card}>
                   <h4>{app.role} - {app.name}</h4>
                   <p style={{fontSize:'0.9rem', color:'#666'}}>Email: {app.email}</p>
                   <p style={{fontStyle:'italic', margin:'10px 0'}}>"{app.whyJoin}"</p>
                   <div style={{display:'flex', gap:'10px'}}>
                     <a href={app.cvLink} target="_blank" rel="noreferrer" style={styles.linkBtn}><ExternalLink size={16}/> View CV</a>
                     <button onClick={() => deleteItem('applications', app._id)} style={styles.deleteBtn}><Trash2 size={16}/></button>
                   </div>
                 </div>
               ))}
            </div>
          </div>
        )}

        {/* --- TAB 4: FAQS --- */}
        {activeTab === 'FAQS' && (
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'40px'}}>
            <div style={styles.formCard}>
              <h3>Add FAQ</h3>
              <form onSubmit={addFaq}>
                <input name="question" placeholder="Question" style={styles.input} required />
                <textarea name="answer" placeholder="Answer..." style={{...styles.input, height:'100px'}} required />
                <button type="submit" style={styles.primaryBtn}>Add FAQ</button>
              </form>
            </div>
            <div>
              <h3>Existing FAQs</h3>
              {faqs.map(faq => (
                <div key={faq._id} style={styles.card}>
                  <strong>Q: {faq.question}</strong>
                  <p style={{color:'#666', marginTop:'5px'}}>A: {faq.answer}</p>
                  <button onClick={() => deleteItem('faqs', faq._id)} style={{...styles.deleteBtn, marginTop:'10px'}}><Trash2 size={16}/> Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

// --- STYLES ---
const styles = {
  loginContainer: { height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#111' },
  loginBox: { background: 'white', padding: '3rem', borderRadius: '16px', width: '100%', maxWidth: '450px', textAlign: 'center' },
  lockIcon: { background:'#f3f4f6', width:'70px', height:'70px', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 20px' },
  loginInput: { width: '100%', padding: '15px', fontSize: '1rem', marginBottom: '20px', borderRadius: '10px', border: '1px solid #ddd', outline: 'none' },
  loginBtn: { width: '100%', padding: '15px', background: 'black', color: 'white', fontWeight: 'bold', borderRadius: '10px', border: 'none', cursor: 'pointer' },

  nav: { background: '#fff', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #e5e7eb', position:'sticky', top:0, zIndex:50 },
  statusDot: { width: '10px', height: '10px', background: '#10b981', borderRadius: '50%', boxShadow: '0 0 0 3px rgba(16, 185, 129, 0.2)' },
  logoutBtn: { background: '#f3f4f6', color: '#374151', border: '1px solid #e5e7eb', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', display:'flex', alignItems:'center', gap:'8px', fontWeight:'600' },

  mainContainer: { maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' },
  headerRow: { display: 'flex', justifyContent: 'space-between', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' },
  
  tab: { padding: '10px 20px', background: 'white', color: '#666', border: '1px solid #ddd', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '500' },
  activeTab: { padding: '10px 20px', background: 'black', color: 'white', border: '1px solid black', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' },
  badge: { background: '#ef4444', color: 'white', padding: '2px 6px', borderRadius: '10px', fontSize: '0.7rem', marginLeft: '5px' },
  refreshBtn: { background: 'transparent', border: 'none', cursor: 'pointer', color: '#666', display: 'flex', alignItems: 'center', gap: '5px' },
  
  listContainer: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' },
  card: { background: 'white', padding: '20px', borderRadius: '12px', border: '1px solid #e5e7eb', display: 'flex', flexDirection: 'column', marginBottom:'15px' },
  dateTag: { fontSize: '0.85rem', color: '#666', background: '#f3f4f6', padding: '4px 10px', borderRadius: '6px' },
  sourceTag: { fontSize: '0.8rem', color: '#3b82f6', background: '#eff6ff', padding: '4px 10px', borderRadius: '6px', display:'inline-block', marginTop:'5px', fontWeight:'bold' },
  detailBox: { background: '#f8fafc', padding: '15px', borderRadius: '10px', fontSize: '0.95rem', color: '#333', border: '1px solid #f1f5f9', lineHeight: '1.5' },
  
  actionRow: { display: 'flex', gap: '10px', marginTop: '20px', alignItems: 'center' },
  whatsappBtn: { flex: 1, background: '#25D366', color: 'white', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', display:'flex', alignItems:'center', justifyContent:'center', gap:'8px' },
  deleteBtn: { background: '#fee2e2', color: '#ef4444', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', flex: 1, display:'flex', alignItems:'center', justifyContent:'center', gap:'5px', fontWeight:'600' },
  editBtn: { background: '#dbeafe', color: '#2563eb', border: 'none', padding: '10px', borderRadius: '8px', cursor: 'pointer', flex: 1, display:'flex', alignItems:'center', justifyContent:'center', gap:'5px', fontWeight:'600' },
  linkBtn: { textDecoration: 'none', background: 'black', color: 'white', padding: '10px', borderRadius: '8px', display:'flex', alignItems:'center', gap:'5px', fontSize:'0.9rem', fontWeight:'bold' },
  
  inventoryGrid: { display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', alignItems: 'start' },
  formCard: { background: 'white', padding: '30px', borderRadius: '20px', border: '1px solid #e5e7eb', position: 'sticky', top: '20px' },
  subCatBox: { marginBottom:'15px', background:'#fefce8', padding:'15px', borderRadius:'8px', border:'1px solid #fde047' },
  label: { display: 'block', marginBottom: '5px', fontWeight: '600', fontSize: '0.9rem', color: '#374151' },
  input: { width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid #d1d5db', borderRadius: '8px', outline: 'none' },
  primaryBtn: { width: '100%', padding: '14px', background: 'black', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: 'bold' },
  
  galleryGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '15px' },
  galleryCard: { background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' },
  galleryImg: { width: '100%', height: '150px', objectFit: 'cover' },
};

export default Admin;