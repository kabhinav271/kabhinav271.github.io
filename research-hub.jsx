import { useState } from "react";

const PAPERS = [
  { id: 1, title: "Transformer Architecture in NLP: A Comprehensive Survey", author: "Dr. Aisha Patel", institution: "MIT", field: "AI / NLP", year: 2024, citations: 412, abstract: "We survey recent advances in transformer-based models for natural language processing, covering attention mechanisms, scaling laws, and emergent capabilities.", tags: ["NLP", "Transformers", "Deep Learning"], likes: 87, saved: false },
  { id: 2, title: "CRISPR-Cas9 Gene Editing in Mammalian Cells: Off-Target Effects", author: "Prof. James Okonkwo", institution: "Stanford", field: "Genomics", year: 2024, citations: 289, abstract: "This paper evaluates the off-target effects of CRISPR-Cas9 in mammalian cell lines and proposes novel guide RNA design strategies to improve precision.", tags: ["CRISPR", "Genomics", "Gene Editing"], likes: 64, saved: false },
  { id: 3, title: "Quantum Entanglement for Secure Communication Protocols", author: "Dr. Yuki Tanaka", institution: "Caltech", field: "Quantum Physics", year: 2023, citations: 553, abstract: "We demonstrate a quantum key distribution protocol using entangled photon pairs, achieving secure communication over 150km fiber optic links.", tags: ["Quantum", "Cryptography", "Photonics"], likes: 120, saved: false },
  { id: 4, title: "Climate Model Uncertainty Quantification Using Bayesian Methods", author: "Dr. Sofía Reyes", institution: "Oxford", field: "Climate Science", year: 2024, citations: 178, abstract: "A Bayesian framework is proposed for quantifying uncertainty in global climate models, with applications to decadal temperature projections.", tags: ["Climate", "Bayesian", "Statistics"], likes: 43, saved: false },
  { id: 5, title: "Novel Perovskite Solar Cell Architectures for 30%+ Efficiency", author: "Prof. Raj Sharma", institution: "ETH Zurich", field: "Materials Science", year: 2024, citations: 334, abstract: "We report tandem perovskite-silicon solar cells with certified 31.2% efficiency, enabled by novel interlayer passivation techniques.", tags: ["Solar Energy", "Perovskite", "Materials"], likes: 98, saved: false },
  { id: 6, title: "Microbiome Diversity and Mental Health: A Gut-Brain Axis Review", author: "Dr. Amara Diallo", institution: "Harvard Med", field: "Neuroscience", year: 2023, citations: 267, abstract: "This review synthesizes evidence linking gut microbiome composition to mental health outcomes, proposing probiotic intervention pathways.", tags: ["Microbiome", "Neuroscience", "Mental Health"], likes: 76, saved: false },
];

const FUNDINGS = [
  { id: 1, org: "National Science Foundation", amount: "$250,000", deadline: "Apr 30, 2025", type: "Research Grant", fields: ["STEM", "CS", "Biology"], logo: "🏛️", desc: "Graduate Research Fellowship Program for early-career researchers." },
  { id: 2, org: "Gates Foundation", amount: "$500,000", deadline: "May 15, 2025", type: "Fellowship", fields: ["Health", "Education", "Global Dev"], logo: "🌍", desc: "Grand Challenges Explorations for bold ideas in global health & development." },
  { id: 3, org: "DARPA", amount: "$1,200,000", deadline: "Jun 1, 2025", type: "Defense Research", fields: ["AI", "Robotics", "Materials"], logo: "🔬", desc: "Young Faculty Award for transformative research in national security technologies." },
  { id: 4, org: "Wellcome Trust", amount: "£180,000", deadline: "Mar 20, 2025", type: "Health Research", fields: ["Medicine", "Genomics", "Public Health"], logo: "💊", desc: "Early Career Awards for biomedical scientists pursuing research independence." },
  { id: 5, org: "European Research Council", amount: "€150,000", deadline: "Jul 10, 2025", type: "Starting Grant", fields: ["Physics", "Chemistry", "Social Sciences"], logo: "🇪🇺", desc: "ERC Starting Grants for researchers 2–7 years post-PhD." },
];

const fieldColors = {
  "AI / NLP": "#6ee7b7", "Genomics": "#f9a8d4", "Quantum Physics": "#a5b4fc",
  "Climate Science": "#6ee7b7", "Materials Science": "#fde68a", "Neuroscience": "#f9a8d4",
  "STEM": "#6ee7b7", "CS": "#a5b4fc", "Biology": "#f9a8d4", "Health": "#fda4af",
  "AI": "#a5b4fc", "Physics": "#a5b4fc", "Medicine": "#fda4af", "Education": "#fde68a",
};

export default function ResearchHub() {
  const [tab, setTab] = useState("search");
  const [query, setQuery] = useState("");
  const [papers, setPapers] = useState(PAPERS);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [fundingFilter, setFundingFilter] = useState("All");
  const [publishStep, setPublishStep] = useState(1);
  const [publishData, setPublishData] = useState({ title: "", abstract: "", field: "", authors: "", keywords: "", file: null });
  const [submitted, setSubmitted] = useState(false);
  const [appliedFunding, setAppliedFunding] = useState(null);
  const [notification, setNotification] = useState("");

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3000);
  };

  const filtered = papers.filter(p =>
    query === "" ||
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.author.toLowerCase().includes(query.toLowerCase()) ||
    p.field.toLowerCase().includes(query.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  const toggleSave = (id) => {
    setPapers(ps => ps.map(p => p.id === id ? { ...p, saved: !p.saved } : p));
    showNotification(papers.find(p => p.id === id)?.saved ? "Removed from saved" : "Paper saved!");
  };

  const toggleLike = (id) => {
    setPapers(ps => ps.map(p => p.id === id ? { ...p, likes: p.liked ? p.likes - 1 : p.likes + 1, liked: !p.liked } : p));
  };

  const fundingCategories = ["All", "Research Grant", "Fellowship", "Defense Research", "Health Research", "Starting Grant"];
  const filteredFunding = fundingFilter === "All" ? FUNDINGS : FUNDINGS.filter(f => f.type === fundingFilter);

  const handlePublish = () => {
    if (publishStep < 3) setPublishStep(s => s + 1);
    else { setSubmitted(true); showNotification("🎉 Paper submitted for review!"); }
  };

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#0a0f1e", minHeight: "100vh", color: "#e8eaf6" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Sora:wght@400;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #0a0f1e; } ::-webkit-scrollbar-thumb { background: #2d3a5e; border-radius: 3px; }
        .card { background: linear-gradient(135deg, #111827 0%, #1a2236 100%); border: 1px solid #1e2d4a; border-radius: 16px; transition: all 0.3s ease; }
        .card:hover { border-color: #3b5bdb; box-shadow: 0 8px 32px rgba(59,91,219,0.15); transform: translateY(-2px); }
        .tag { padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; letter-spacing: 0.5px; }
        .btn-primary { background: linear-gradient(135deg, #3b5bdb, #6366f1); color: white; border: none; padding: 10px 22px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 14px; }
        .btn-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 20px rgba(99,102,241,0.4); }
        .btn-outline { background: transparent; color: #6366f1; border: 1px solid #3b5bdb; padding: 9px 20px; border-radius: 10px; font-weight: 600; cursor: pointer; transition: all 0.2s; font-size: 14px; }
        .btn-outline:hover { background: rgba(59,91,219,0.1); }
        .input { background: #111827; border: 1px solid #1e2d4a; border-radius: 10px; padding: 11px 16px; color: #e8eaf6; font-size: 14px; width: 100%; outline: none; font-family: inherit; transition: border 0.2s; }
        .input:focus { border-color: #3b5bdb; }
        .tab-btn { background: none; border: none; color: #6b7fa3; font-size: 14px; font-weight: 600; padding: 12px 20px; cursor: pointer; transition: all 0.2s; border-bottom: 2px solid transparent; letter-spacing: 0.3px; }
        .tab-btn.active { color: #6366f1; border-bottom-color: #6366f1; }
        .tab-btn:hover { color: #a5b4fc; }
        .notif { position: fixed; top: 24px; right: 24px; background: linear-gradient(135deg, #1e3a5f, #1a2a4a); border: 1px solid #3b5bdb; padding: 14px 20px; border-radius: 12px; font-size: 13px; font-weight: 500; z-index: 999; box-shadow: 0 8px 30px rgba(0,0,0,0.4); animation: slideIn 0.3s ease; }
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        .step-dot { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: 700; transition: all 0.3s; }
        textarea.input { resize: vertical; min-height: 80px; }
        select.input { cursor: pointer; }
        .avatar { width: 38px; height: 38px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 700; flex-shrink: 0; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; z-index: 100; padding: 20px; }
        .modal { background: #111827; border: 1px solid #1e2d4a; border-radius: 20px; max-width: 640px; width: 100%; max-height: 85vh; overflow-y: auto; padding: 32px; }
      `}</style>

      {notification && <div className="notif">{notification}</div>}

      {/* Header */}
      <div style={{ background: "linear-gradient(90deg, #0d1424 0%, #111827 100%)", borderBottom: "1px solid #1e2d4a", padding: "0 24px", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #3b5bdb, #6366f1)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>⚗️</div>
            <span style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 18, letterSpacing: "-0.5px" }}>
              Research<span style={{ color: "#6366f1" }}>Hub</span>
            </span>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {[
              { key: "search", icon: "🔍", label: "Discover" },
              { key: "funding", icon: "💰", label: "Funding" },
              { key: "publish", icon: "📄", label: "Publish" },
              { key: "profile", icon: "👤", label: "Profile" },
            ].map(t => (
              <button key={t.key} className={`tab-btn ${tab === t.key ? "active" : ""}`} onClick={() => setTab(t.key)}>
                <span style={{ marginRight: 6 }}>{t.icon}</span>{t.label}
              </button>
            ))}
          </div>
          <div className="avatar" style={{ background: "linear-gradient(135deg, #3b5bdb, #6366f1)", color: "white" }}>RS</div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 24px" }}>

        {/* ===== SEARCH / DISCOVER ===== */}
        {tab === "search" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 28, letterSpacing: "-0.5px", marginBottom: 6 }}>
                Discover Research <span style={{ color: "#6366f1" }}>Papers</span>
              </h1>
              <p style={{ color: "#6b7fa3", fontSize: 14 }}>Search millions of papers, connect with authors, save for later.</p>
            </div>

            {/* Search Bar */}
            <div style={{ position: "relative", marginBottom: 12 }}>
              <span style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", fontSize: 16, color: "#6b7fa3" }}>🔍</span>
              <input className="input" style={{ paddingLeft: 44, fontSize: 15, height: 52, borderRadius: 14 }}
                placeholder="Search by title, author, field, or keyword..."
                value={query} onChange={e => setQuery(e.target.value)} />
            </div>

            {/* Quick filters */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
              {["AI / NLP", "Genomics", "Quantum Physics", "Climate Science", "Materials Science"].map(f => (
                <button key={f} onClick={() => setQuery(query === f ? "" : f)}
                  style={{ padding: "6px 14px", borderRadius: 20, border: `1px solid ${query === f ? "#6366f1" : "#1e2d4a"}`, background: query === f ? "rgba(99,102,241,0.15)" : "transparent", color: query === f ? "#a5b4fc" : "#6b7fa3", fontSize: 12, cursor: "pointer", fontWeight: 600, transition: "all 0.2s" }}>
                  {f}
                </button>
              ))}
            </div>

            <p style={{ color: "#6b7fa3", fontSize: 12, marginBottom: 16 }}>{filtered.length} papers found</p>

            {/* Papers Grid */}
            <div style={{ display: "grid", gap: 16 }}>
              {filtered.map(paper => (
                <div key={paper.id} className="card" style={{ padding: "22px 24px", cursor: "pointer" }} onClick={() => setSelectedPaper(paper)}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10, flexWrap: "wrap" }}>
                        <span className="tag" style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.3)" }}>{paper.field}</span>
                        <span style={{ color: "#6b7fa3", fontSize: 12 }}>{paper.year}</span>
                        <span style={{ color: "#6b7fa3", fontSize: 12 }}>• {paper.citations} citations</span>
                      </div>
                      <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 16, lineHeight: 1.4, marginBottom: 8, color: "#e8eaf6" }}>{paper.title}</h3>
                      <p style={{ color: "#6b7fa3", fontSize: 13, marginBottom: 10, lineHeight: 1.5 }}>{paper.abstract.slice(0, 160)}...</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div className="avatar" style={{ width: 28, height: 28, fontSize: 12, background: "linear-gradient(135deg, #1e3a5f, #2d4a7a)", color: "#a5b4fc" }}>
                          {paper.author.split(" ").map(w => w[0]).join("").slice(0, 2)}
                        </div>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "#c7d2fe" }}>{paper.author}</span>
                        <span style={{ color: "#6b7fa3", fontSize: 12 }}>• {paper.institution}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "flex-end" }}>
                      <button className="btn-outline" style={{ padding: "6px 14px", fontSize: 12 }} onClick={e => { e.stopPropagation(); toggleSave(paper.id); }}>
                        {paper.saved ? "✓ Saved" : "🔖 Save"}
                      </button>
                      <button onClick={e => { e.stopPropagation(); toggleLike(paper.id); }}
                        style={{ background: "none", border: "none", cursor: "pointer", color: paper.liked ? "#f472b6" : "#6b7fa3", fontSize: 13, fontWeight: 600 }}>
                        {paper.liked ? "♥" : "♡"} {paper.likes}
                      </button>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: 6, marginTop: 12, flexWrap: "wrap" }}>
                    {paper.tags.map(t => <span key={t} className="tag" style={{ background: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "1px solid #1e2d4a" }}>{t}</span>)}
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <div style={{ textAlign: "center", padding: "60px 20px", color: "#6b7fa3" }}>
                  <div style={{ fontSize: 48, marginBottom: 12 }}>🔬</div>
                  <p style={{ fontWeight: 600 }}>No papers found for "{query}"</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ===== FUNDING ===== */}
        {tab === "funding" && (
          <div>
            <div style={{ marginBottom: 28 }}>
              <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 28, letterSpacing: "-0.5px", marginBottom: 6 }}>
                Funding & <span style={{ color: "#6366f1" }}>Sponsorships</span>
              </h1>
              <p style={{ color: "#6b7fa3", fontSize: 14 }}>Find grants, fellowships, and research funding that match your work.</p>
            </div>

            {/* Stats Row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 28 }}>
              {[{ label: "Active Grants", value: "2,847", icon: "📋" }, { label: "Total Funding", value: "$4.2B", icon: "💵" }, { label: "New This Week", value: "142", icon: "🆕" }].map(s => (
                <div key={s.label} className="card" style={{ padding: "18px 20px", textAlign: "center" }}>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{s.icon}</div>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 22, color: "#6366f1" }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "#6b7fa3", marginTop: 2 }}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Category Filter */}
            <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
              {fundingCategories.map(c => (
                <button key={c} onClick={() => setFundingFilter(c)}
                  style={{ padding: "7px 16px", borderRadius: 20, border: `1px solid ${fundingFilter === c ? "#6366f1" : "#1e2d4a"}`, background: fundingFilter === c ? "rgba(99,102,241,0.15)" : "transparent", color: fundingFilter === c ? "#a5b4fc" : "#6b7fa3", fontSize: 12, cursor: "pointer", fontWeight: 600, transition: "all 0.2s" }}>
                  {c}
                </button>
              ))}
            </div>

            <div style={{ display: "grid", gap: 16 }}>
              {filteredFunding.map(f => (
                <div key={f.id} className="card" style={{ padding: "24px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                    <div style={{ display: "flex", gap: 14, flex: 1 }}>
                      <div style={{ width: 52, height: 52, background: "linear-gradient(135deg, #1e2d4a, #2d3a5e)", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, flexShrink: 0 }}>{f.logo}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6, flexWrap: "wrap" }}>
                          <h3 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 700, fontSize: 15, color: "#e8eaf6" }}>{f.org}</h3>
                          <span className="tag" style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.3)" }}>{f.type}</span>
                        </div>
                        <p style={{ color: "#94a3b8", fontSize: 13, lineHeight: 1.5, marginBottom: 10 }}>{f.desc}</p>
                        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                          {f.fields.map(field => <span key={field} className="tag" style={{ background: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "1px solid #1e2d4a" }}>{field}</span>)}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 18, color: "#6ee7b7", marginBottom: 4 }}>{f.amount}</div>
                      <div style={{ fontSize: 11, color: "#6b7fa3", marginBottom: 12 }}>Deadline: {f.deadline}</div>
                      {appliedFunding === f.id ? (
                        <span style={{ color: "#6ee7b7", fontSize: 13, fontWeight: 600 }}>✓ Applied!</span>
                      ) : (
                        <button className="btn-primary" style={{ fontSize: 13, padding: "8px 18px" }}
                          onClick={() => { setAppliedFunding(f.id); showNotification(`Application sent to ${f.org}!`); }}>
                          Apply Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== PUBLISH ===== */}
        {tab === "publish" && (
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <div style={{ marginBottom: 28 }}>
              <h1 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 28, letterSpacing: "-0.5px", marginBottom: 6 }}>
                Publish Your <span style={{ color: "#6366f1" }}>Research</span>
              </h1>
              <p style={{ color: "#6b7fa3", fontSize: 14 }}>Share your work with the global research community.</p>
            </div>

            {submitted ? (
              <div className="card" style={{ padding: "60px 40px", textAlign: "center" }}>
                <div style={{ fontSize: 64, marginBottom: 16 }}>🎉</div>
                <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 24, marginBottom: 8 }}>Submitted Successfully!</h2>
                <p style={{ color: "#6b7fa3", marginBottom: 24 }}>Your paper is under peer review. Expected 2–3 weeks.</p>
                <div style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)", borderRadius: 12, padding: "16px 20px", marginBottom: 24, textAlign: "left" }}>
                  <div style={{ fontWeight: 700, color: "#a5b4fc", marginBottom: 4 }}>{publishData.title || "Untitled Paper"}</div>
                  <div style={{ fontSize: 13, color: "#6b7fa3" }}>{publishData.authors} • {publishData.field}</div>
                </div>
                <button className="btn-primary" onClick={() => { setSubmitted(false); setPublishStep(1); setPublishData({ title: "", abstract: "", field: "", authors: "", keywords: "", file: null }); }}>
                  Submit Another Paper
                </button>
              </div>
            ) : (
              <div>
                {/* Step Indicator */}
                <div style={{ display: "flex", alignItems: "center", marginBottom: 32 }}>
                  {[1, 2, 3].map((step, i) => (
                    <div key={step} style={{ display: "flex", alignItems: "center", flex: i < 2 ? 1 : 0 }}>
                      <div className="step-dot" style={{ background: publishStep >= step ? "linear-gradient(135deg, #3b5bdb, #6366f1)" : "#1e2d4a", color: publishStep >= step ? "white" : "#6b7fa3" }}>{step}</div>
                      {i < 2 && <div style={{ flex: 1, height: 2, background: publishStep > step ? "#6366f1" : "#1e2d4a", transition: "background 0.3s" }} />}
                    </div>
                  ))}
                </div>
                <p style={{ textAlign: "center", color: "#6b7fa3", fontSize: 13, marginBottom: 24 }}>
                  {["Paper Details", "Abstract & Keywords", "Upload & Submit"][publishStep - 1]}
                </p>

                <div className="card" style={{ padding: "28px" }}>
                  {publishStep === 1 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <div>
                        <label style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: 6 }}>Paper Title *</label>
                        <input className="input" placeholder="e.g., Novel Approaches to Quantum Error Correction..." value={publishData.title} onChange={e => setPublishData(d => ({ ...d, title: e.target.value }))} />
                      </div>
                      <div>
                        <label style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: 6 }}>Author(s) *</label>
                        <input className="input" placeholder="Dr. Jane Smith, Prof. John Doe, ..." value={publishData.authors} onChange={e => setPublishData(d => ({ ...d, authors: e.target.value }))} />
                      </div>
                      <div>
                        <label style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: 6 }}>Research Field *</label>
                        <select className="input" value={publishData.field} onChange={e => setPublishData(d => ({ ...d, field: e.target.value }))}>
                          <option value="">Select a field...</option>
                          {["AI / Machine Learning", "Quantum Physics", "Genomics & Biology", "Climate Science", "Materials Science", "Neuroscience", "Mathematics", "Chemistry", "Social Sciences"].map(f => <option key={f}>{f}</option>)}
                        </select>
                      </div>
                    </div>
                  )}

                  {publishStep === 2 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <div>
                        <label style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: 6 }}>Abstract *</label>
                        <textarea className="input" placeholder="Provide a clear and concise summary of your research (150–300 words)..." style={{ minHeight: 140 }} value={publishData.abstract} onChange={e => setPublishData(d => ({ ...d, abstract: e.target.value }))} />
                      </div>
                      <div>
                        <label style={{ fontSize: 13, fontWeight: 600, color: "#94a3b8", display: "block", marginBottom: 6 }}>Keywords</label>
                        <input className="input" placeholder="e.g., machine learning, neural networks, optimization (comma separated)" value={publishData.keywords} onChange={e => setPublishData(d => ({ ...d, keywords: e.target.value }))} />
                      </div>
                    </div>
                  )}

                  {publishStep === 3 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                      <div style={{ border: "2px dashed #1e2d4a", borderRadius: 14, padding: "40px 20px", textAlign: "center", cursor: "pointer", transition: "border-color 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.borderColor = "#3b5bdb"}
                        onMouseLeave={e => e.currentTarget.style.borderColor = "#1e2d4a"}>
                        <div style={{ fontSize: 40, marginBottom: 10 }}>📁</div>
                        <p style={{ fontWeight: 600, color: "#c7d2fe", marginBottom: 4 }}>{publishData.file ? publishData.file : "Upload your paper (PDF)"}</p>
                        <p style={{ fontSize: 12, color: "#6b7fa3", marginBottom: 12 }}>Max 50MB · PDF preferred</p>
                        <button className="btn-outline" onClick={() => setPublishData(d => ({ ...d, file: "research_paper.pdf" }))}>Choose File</button>
                      </div>

                      <div style={{ background: "rgba(99,102,241,0.08)", border: "1px solid rgba(99,102,241,0.2)", borderRadius: 12, padding: 16 }}>
                        <h4 style={{ fontWeight: 700, color: "#a5b4fc", marginBottom: 10, fontSize: 13 }}>Review Summary</h4>
                        {[["Title", publishData.title || "—"], ["Authors", publishData.authors || "—"], ["Field", publishData.field || "—"]].map(([k, v]) => (
                          <div key={k} style={{ display: "flex", gap: 8, fontSize: 13, marginBottom: 6 }}>
                            <span style={{ color: "#6b7fa3", width: 60 }}>{k}:</span>
                            <span style={{ color: "#c7d2fe", flex: 1 }}>{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
                  {publishStep > 1 ? (
                    <button className="btn-outline" onClick={() => setPublishStep(s => s - 1)}>← Back</button>
                  ) : <div />}
                  <button className="btn-primary" onClick={handlePublish}>
                    {publishStep === 3 ? "🚀 Submit Paper" : "Continue →"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ===== PROFILE ===== */}
        {tab === "profile" && (
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <div className="card" style={{ padding: "32px", marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                <div className="avatar" style={{ width: 72, height: 72, fontSize: 28, background: "linear-gradient(135deg, #3b5bdb, #6366f1)", color: "white", flexShrink: 0 }}>RS</div>
                <div style={{ flex: 1 }}>
                  <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 22, marginBottom: 4 }}>Research Student</h2>
                  <p style={{ color: "#6b7fa3", fontSize: 13, marginBottom: 12 }}>PhD Candidate · Computer Science · University of Davangere</p>
                  <div style={{ display: "flex", gap: 16 }}>
                    {[["Papers", "3"], ["Citations", "47"], ["Saved", papers.filter(p => p.saved).length.toString()]].map(([label, val]) => (
                      <div key={label} style={{ textAlign: "center" }}>
                        <div style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 20, color: "#6366f1" }}>{val}</div>
                        <div style={{ fontSize: 11, color: "#6b7fa3" }}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <button className="btn-outline" style={{ fontSize: 13 }}>Edit Profile</button>
              </div>
            </div>

            <div className="card" style={{ padding: "24px", marginBottom: 16 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 16, color: "#a5b4fc", fontSize: 14 }}>SAVED PAPERS</h3>
              {papers.filter(p => p.saved).length === 0 ? (
                <p style={{ color: "#6b7fa3", fontSize: 13 }}>No saved papers yet. Go to Discover and save some!</p>
              ) : (
                papers.filter(p => p.saved).map(p => (
                  <div key={p.id} style={{ padding: "12px 0", borderBottom: "1px solid #1e2d4a" }}>
                    <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 2 }}>{p.title}</div>
                    <div style={{ fontSize: 12, color: "#6b7fa3" }}>{p.author} · {p.institution}</div>
                  </div>
                ))
              )}
            </div>

            <div className="card" style={{ padding: "24px" }}>
              <h3 style={{ fontWeight: 700, marginBottom: 16, color: "#a5b4fc", fontSize: 14 }}>RESEARCH INTERESTS</h3>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["Machine Learning", "Computer Vision", "NLP", "Robotics", "Data Science"].map(t => (
                  <span key={t} className="tag" style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.3)", padding: "6px 14px" }}>{t}</span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Paper Detail Modal */}
      {selectedPaper && (
        <div className="modal-overlay" onClick={() => setSelectedPaper(null)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <span className="tag" style={{ background: "rgba(99,102,241,0.15)", color: "#a5b4fc", border: "1px solid rgba(99,102,241,0.3)" }}>{selectedPaper.field}</span>
              <button onClick={() => setSelectedPaper(null)} style={{ background: "none", border: "none", color: "#6b7fa3", cursor: "pointer", fontSize: 20 }}>×</button>
            </div>
            <h2 style={{ fontFamily: "'Sora', sans-serif", fontWeight: 800, fontSize: 20, lineHeight: 1.4, marginBottom: 16 }}>{selectedPaper.title}</h2>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div className="avatar" style={{ width: 36, height: 36, fontSize: 13, background: "linear-gradient(135deg, #1e3a5f, #2d4a7a)", color: "#a5b4fc" }}>
                {selectedPaper.author.split(" ").map(w => w[0]).join("").slice(0, 2)}
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 14, color: "#c7d2fe" }}>{selectedPaper.author}</div>
                <div style={{ fontSize: 12, color: "#6b7fa3" }}>{selectedPaper.institution} · {selectedPaper.year}</div>
              </div>
            </div>
            <div style={{ background: "rgba(99,102,241,0.06)", borderRadius: 10, padding: 16, marginBottom: 16 }}>
              <h4 style={{ fontSize: 12, fontWeight: 700, color: "#6b7fa3", marginBottom: 8, letterSpacing: 1 }}>ABSTRACT</h4>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: "#c7d2fe" }}>{selectedPaper.abstract}</p>
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 20 }}>
              {selectedPaper.tags.map(t => <span key={t} className="tag" style={{ background: "rgba(255,255,255,0.05)", color: "#94a3b8", border: "1px solid #1e2d4a" }}>{t}</span>)}
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn-primary" style={{ flex: 1 }}>📥 Download PDF</button>
              <button className="btn-outline" onClick={() => { toggleSave(selectedPaper.id); showNotification("Paper saved!"); }}>🔖 Save</button>
              <button className="btn-outline">📤 Share</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
