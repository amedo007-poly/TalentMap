import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';

// Sample data - in production this would come from a backend
const SAMPLE_TALENTS = [
  {
    id: 1,
    name: 'Marie Dupont',
    title: 'Développeuse Full Stack',
    bio: 'Passionnée par le web et l\'open source',
    skills: ['React', 'Node.js', 'Python', 'Docker'],
    languages: ['Français', 'Anglais', 'Espagnol'],
    passions: ['Intelligence Artificielle', 'Green IT', 'UX Design'],
    projects: ['EduQuest', 'Portfolio Open Source', 'Bot Discord'],
    verified: true,
    lookingFor: 'Projet IA collaboratif'
  },
  {
    id: 2,
    name: 'Ahmed Ben Ali',
    title: 'Data Scientist',
    bio: 'Transformer les données en insights',
    skills: ['Python', 'TensorFlow', 'SQL', 'Tableau'],
    languages: ['Français', 'Arabe', 'Anglais'],
    passions: ['Machine Learning', 'Visualisation', 'Éducation'],
    projects: ['Modèle prédictif climat', 'Dashboard COVID'],
    verified: true,
    lookingFor: 'Mentor en deep learning'
  },
  {
    id: 3,
    name: 'Sophie Martin',
    title: 'Designer UX/UI',
    bio: 'Créer des expériences mémorables',
    skills: ['Figma', 'Adobe XD', 'CSS', 'Prototypage'],
    languages: ['Français', 'Anglais'],
    passions: ['Accessibilité', 'Motion Design', 'Typographie'],
    projects: ['Refonte app mobile', 'Design System'],
    verified: false,
    lookingFor: 'Développeur front-end'
  },
  {
    id: 4,
    name: 'Lucas Bernard',
    title: 'DevOps Engineer',
    bio: 'Automatiser, déployer, surveiller',
    skills: ['Kubernetes', 'Docker', 'CI/CD', 'AWS', 'Terraform'],
    languages: ['Français', 'Anglais', 'Allemand'],
    passions: ['Cloud Native', 'Security', 'Open Source'],
    projects: ['Pipeline CI/CD complet', 'Monitoring stack'],
    verified: true,
    lookingFor: null
  },
  {
    id: 5,
    name: 'Emma Leroy',
    title: 'Étudiante Ingénieure',
    bio: 'Curieuse et passionnée par l\'innovation',
    skills: ['Java', 'Python', 'Git', 'Agile'],
    languages: ['Français', 'Anglais', 'Japonais'],
    passions: ['Robotique', 'IoT', 'Développement durable'],
    projects: ['Robot suiveur de ligne', 'App météo'],
    verified: false,
    lookingFor: 'Stage développement'
  },
  {
    id: 6,
    name: 'Thomas Petit',
    title: 'Chef de Projet',
    bio: 'Coordonner les équipes, livrer les projets',
    skills: ['Scrum', 'Jira', 'Communication', 'Leadership'],
    languages: ['Français', 'Anglais'],
    passions: ['Gestion d\'équipe', 'Innovation', 'EdTech'],
    projects: ['Migration cloud entreprise', 'Lancement produit SaaS'],
    verified: true,
    lookingFor: 'Bénévoles pour projet associatif'
  }
];

// Navbar Component
function Navbar() {
  const location = useLocation();
  
  return (
    <>
      <div className="opensource-banner">
        🌍 Village Numérique Résistant - 100% Open Source | 
        <a href="https://github.com/amedo007-poly"> GitHub</a>
      </div>
      <nav className="navbar">
        <Link to="/" className="nav-logo">
          🗺️ <span>TalentMap</span>
        </Link>
        <div className="nav-links">
          <Link to="/" className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}>
            🏠 Accueil
          </Link>
          <Link to="/explore" className={`nav-link ${location.pathname === '/explore' ? 'active' : ''}`}>
            🔍 Explorer
          </Link>
          <Link to="/add" className={`nav-link ${location.pathname === '/add' ? 'active' : ''}`}>
            ➕ Mon Profil
          </Link>
          <Link to="/cloud" className={`nav-link ${location.pathname === '/cloud' ? 'active' : ''}`}>
            ☁️ Nuage
          </Link>
        </div>
      </nav>
    </>
  );
}

// Home Page
function HomePage({ talents }) {
  const stats = {
    talents: talents.length,
    skills: [...new Set(talents.flatMap(t => t.skills))].length,
    languages: [...new Set(talents.flatMap(t => t.languages))].length,
    verified: talents.filter(t => t.verified).length
  };

  return (
    <div className="container fade-in">
      <div className="hero">
        <h1>🗺️ Carte des Talents</h1>
        <p>
          Découvrez les compétences de notre communauté, trouvez des collaborateurs
          et partagez vos talents. Une plateforme open source pour l'éducation !
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/add" className="btn btn-primary">
            ✨ Ajouter mon profil
          </Link>
          <Link to="/explore" className="btn btn-outline" style={{ background: 'white' }}>
            🔍 Explorer les talents
          </Link>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-number">{stats.talents}</div>
          <div className="stat-label">Talents</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: '#4A7C59' }}>{stats.skills}</div>
          <div className="stat-label">Compétences</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: '#7B6B8D' }}>{stats.languages}</div>
          <div className="stat-label">Langues</div>
        </div>
        <div className="stat-card">
          <div className="stat-number" style={{ color: '#C4956A' }}>{stats.verified}</div>
          <div className="stat-label">Vérifiés ✓</div>
        </div>
      </div>

      <CollabSection />

      <h2 style={{ marginBottom: '1.5rem' }}>🌟 Talents Récents</h2>
      <div className="talent-grid">
        {talents.slice(0, 3).map(talent => (
          <TalentCard key={talent.id} talent={talent} />
        ))}
      </div>
    </div>
  );
}

// Talent Card Component
function TalentCard({ talent }) {
  const initials = talent.name.split(' ').map(n => n[0]).join('');
  
  return (
    <div className="card talent-card fade-in">
      {talent.verified && (
        <div className="verified-badge">
          ✓ Vérifié
        </div>
      )}
      <div className="talent-header">
        <div className="talent-avatar">{initials}</div>
        <div>
          <div className="talent-name">{talent.name}</div>
          <div className="talent-title">{talent.title}</div>
        </div>
      </div>
      
      <p style={{ color: '#666', marginBottom: '1rem', fontSize: '0.9rem' }}>
        {talent.bio}
      </p>

      <div className="talent-section">
        <div className="talent-section-title">💻 Compétences</div>
        <div className="tags-container">
          {talent.skills.slice(0, 4).map((skill, i) => (
            <span key={i} className="tag tech">{skill}</span>
          ))}
          {talent.skills.length > 4 && (
            <span className="tag" style={{ background: '#888' }}>+{talent.skills.length - 4}</span>
          )}
        </div>
      </div>

      <div className="talent-section">
        <div className="talent-section-title">🌍 Langues</div>
        <div className="tags-container">
          {talent.languages.map((lang, i) => (
            <span key={i} className="tag language">{lang}</span>
          ))}
        </div>
      </div>

      {talent.lookingFor && (
        <div style={{ 
          marginTop: '1rem', 
          padding: '0.75rem', 
          background: '#FFF3E0', 
          borderRadius: '8px',
          borderLeft: '4px solid #FF9600'
        }}>
          <strong style={{ color: '#FF9600' }}>🤝 Recherche:</strong>{' '}
          <span style={{ fontSize: '0.9rem' }}>{talent.lookingFor}</span>
        </div>
      )}
    </div>
  );
}

// Explore Page
function ExplorePage({ talents }) {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedSkill, setSelectedSkill] = useState('');

  const allSkills = [...new Set(talents.flatMap(t => t.skills))];
  const allLanguages = [...new Set(talents.flatMap(t => t.languages))];

  const filteredTalents = talents.filter(talent => {
    const searchLower = search.toLowerCase();
    const matchesSearch = 
      talent.name.toLowerCase().includes(searchLower) ||
      talent.skills.some(s => s.toLowerCase().includes(searchLower)) ||
      talent.languages.some(l => l.toLowerCase().includes(searchLower)) ||
      talent.passions.some(p => p.toLowerCase().includes(searchLower));

    const matchesFilter = 
      filterType === 'all' ||
      (filterType === 'verified' && talent.verified) ||
      (filterType === 'looking' && talent.lookingFor);

    const matchesSkill = !selectedSkill || talent.skills.includes(selectedSkill);

    return matchesSearch && matchesFilter && matchesSkill;
  });

  return (
    <div className="container fade-in">
      <h1 style={{ marginBottom: '1.5rem' }}>🔍 Explorer les Talents</h1>

      <div className="search-container">
        <div className="search-row">
          <input
            type="text"
            className="form-input search-input"
            placeholder="🔎 Rechercher par nom, compétence, langue..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="form-select"
            style={{ width: 'auto', minWidth: '180px' }}
            value={selectedSkill}
            onChange={(e) => setSelectedSkill(e.target.value)}
          >
            <option value="">Toutes les compétences</option>
            {allSkills.map(skill => (
              <option key={skill} value={skill}>{skill}</option>
            ))}
          </select>
        </div>
        <div className="filter-chips">
          <button 
            className={`filter-chip ${filterType === 'all' ? 'active' : ''}`}
            onClick={() => setFilterType('all')}
          >
            Tous
          </button>
          <button 
            className={`filter-chip ${filterType === 'verified' ? 'active' : ''}`}
            onClick={() => setFilterType('verified')}
          >
            ✓ Vérifiés
          </button>
          <button 
            className={`filter-chip ${filterType === 'looking' ? 'active' : ''}`}
            onClick={() => setFilterType('looking')}
          >
            🤝 Cherche collaborateur
          </button>
        </div>
      </div>

      <p style={{ marginBottom: '1rem', color: '#666' }}>
        {filteredTalents.length} talent{filteredTalents.length !== 1 ? 's' : ''} trouvé{filteredTalents.length !== 1 ? 's' : ''}
      </p>

      <div className="talent-grid">
        {filteredTalents.map(talent => (
          <TalentCard key={talent.id} talent={talent} />
        ))}
      </div>

      {filteredTalents.length === 0 && (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <p style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</p>
          <p>Aucun talent trouvé pour cette recherche</p>
        </div>
      )}
    </div>
  );
}

// Add Profile Page
function AddProfilePage({ onAddTalent }) {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    skills: [],
    languages: [],
    passions: [],
    projects: [],
    lookingFor: ''
  });
  const [currentInput, setCurrentInput] = useState({ skills: '', languages: '', passions: '', projects: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleAddTag = (field) => {
    if (currentInput[field].trim()) {
      setFormData(prev => ({
        ...prev,
        [field]: [...prev[field], currentInput[field].trim()]
      }));
      setCurrentInput(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleRemoveTag = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.title && formData.skills.length > 0) {
      onAddTalent({
        ...formData,
        id: Date.now(),
        verified: false
      });
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="container fade-in">
        <div className="card" style={{ textAlign: 'center', padding: '3rem', maxWidth: '500px', margin: '0 auto' }}>
          <p style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</p>
          <h2>Profil créé avec succès !</h2>
          <p style={{ color: '#666', margin: '1rem 0' }}>
            Votre profil est maintenant visible. Un responsable pourra le valider 
            pour obtenir le badge "Talent Vérifié".
          </p>
          <Link to="/explore" className="btn btn-primary">
            Voir tous les talents
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container fade-in">
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h1 style={{ marginBottom: '0.5rem' }}>✨ Créer mon Profil Talent</h1>
        <p style={{ color: '#666', marginBottom: '2rem' }}>
          Partagez vos compétences avec la communauté !
        </p>

        <form onSubmit={handleSubmit} className="card">
          <div className="form-group">
            <label className="form-label">👤 Nom complet *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Marie Dupont"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">💼 Titre / Rôle *</label>
            <input
              type="text"
              className="form-input"
              placeholder="Développeuse Full Stack, Étudiant Ingénieur..."
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">📝 Bio courte</label>
            <textarea
              className="form-textarea"
              placeholder="Décrivez-vous en quelques mots..."
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            />
          </div>

          {/* Skills */}
          <div className="form-group">
            <label className="form-label">💻 Compétences techniques *</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="React, Python, Docker..."
                value={currentInput.skills}
                onChange={(e) => setCurrentInput({ ...currentInput, skills: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag('skills'))}
              />
              <button type="button" className="btn btn-secondary" onClick={() => handleAddTag('skills')}>+</button>
            </div>
            <div className="tags-container">
              {formData.skills.map((skill, i) => (
                <span key={i} className="tag tech">
                  {skill}
                  <button type="button" className="tag-remove" onClick={() => handleRemoveTag('skills', i)}>×</button>
                </span>
              ))}
            </div>
          </div>

          {/* Languages */}
          <div className="form-group">
            <label className="form-label">🌍 Langues parlées</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Français, Anglais..."
                value={currentInput.languages}
                onChange={(e) => setCurrentInput({ ...currentInput, languages: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag('languages'))}
              />
              <button type="button" className="btn btn-secondary" onClick={() => handleAddTag('languages')}>+</button>
            </div>
            <div className="tags-container">
              {formData.languages.map((lang, i) => (
                <span key={i} className="tag language">
                  {lang}
                  <button type="button" className="tag-remove" onClick={() => handleRemoveTag('languages', i)}>×</button>
                </span>
              ))}
            </div>
          </div>

          {/* Passions */}
          <div className="form-group">
            <label className="form-label">❤️ Passions & Intérêts</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="IA, Green IT, Design..."
                value={currentInput.passions}
                onChange={(e) => setCurrentInput({ ...currentInput, passions: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag('passions'))}
              />
              <button type="button" className="btn btn-secondary" onClick={() => handleAddTag('passions')}>+</button>
            </div>
            <div className="tags-container">
              {formData.passions.map((passion, i) => (
                <span key={i} className="tag passion">
                  {passion}
                  <button type="button" className="tag-remove" onClick={() => handleRemoveTag('passions', i)}>×</button>
                </span>
              ))}
            </div>
          </div>

          {/* Projects */}
          <div className="form-group">
            <label className="form-label">🚀 Projets réalisés</label>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                className="form-input"
                placeholder="Nom de votre projet..."
                value={currentInput.projects}
                onChange={(e) => setCurrentInput({ ...currentInput, projects: e.target.value })}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag('projects'))}
              />
              <button type="button" className="btn btn-secondary" onClick={() => handleAddTag('projects')}>+</button>
            </div>
            <div className="tags-container">
              {formData.projects.map((project, i) => (
                <span key={i} className="tag project">
                  {project}
                  <button type="button" className="tag-remove" onClick={() => handleRemoveTag('projects', i)}>×</button>
                </span>
              ))}
            </div>
          </div>

          {/* Looking For */}
          <div className="form-group">
            <label className="form-label">🤝 Recherche (optionnel)</label>
            <input
              type="text"
              className="form-input"
              placeholder="Collaborateur pour projet X, Mentor en Y..."
              value={formData.lookingFor}
              onChange={(e) => setFormData({ ...formData, lookingFor: e.target.value })}
            />
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
            ✨ Créer mon profil
          </button>
        </form>
      </div>
    </div>
  );
}

// Cloud Page - Word Cloud Visualization
function CloudPage({ talents }) {
  const allSkills = talents.flatMap(t => t.skills);
  const skillCounts = allSkills.reduce((acc, skill) => {
    acc[skill] = (acc[skill] || 0) + 1;
    return acc;
  }, {});

  const sortedSkills = Object.entries(skillCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 30);

  const maxCount = Math.max(...sortedSkills.map(s => s[1]));

  const getSize = (count) => {
    const minSize = 1;
    const maxSize = 3;
    return minSize + (count / maxCount) * (maxSize - minSize);
  };

  const colors = ['#2D5A7B', '#4A7C59', '#C4956A', '#7B6B8D', '#5D8AA8'];

  return (
    <div className="container fade-in">
      <h1 style={{ marginBottom: '0.5rem' }}>☁️ Nuage de Compétences</h1>
      <p style={{ color: '#666', marginBottom: '2rem' }}>
        Visualisation interactive des talents de notre communauté
      </p>

      <div className="wordcloud-container" style={{ flexWrap: 'wrap', gap: '1rem', padding: '3rem' }}>
        {sortedSkills.map(([skill, count], index) => (
          <span
            key={skill}
            style={{
              fontSize: `${getSize(count)}rem`,
              fontWeight: 700,
              color: colors[index % colors.length],
              padding: '0.5rem',
              cursor: 'pointer',
              transition: 'all 0.2s',
              display: 'inline-block'
            }}
            title={`${count} personne${count > 1 ? 's' : ''}`}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            {skill}
          </span>
        ))}
      </div>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>📊 Top Compétences</h2>
      <div className="card">
        {sortedSkills.slice(0, 10).map(([skill, count], index) => (
          <div key={skill} style={{ 
            display: 'flex', 
            alignItems: 'center', 
            padding: '0.75rem 0',
            borderBottom: index < 9 ? '1px solid #eee' : 'none'
          }}>
            <span style={{ 
              width: '30px', 
              fontWeight: 700, 
              color: index < 3 ? colors[index] : '#888'
            }}>
              #{index + 1}
            </span>
            <span style={{ flex: 1, fontWeight: 600 }}>{skill}</span>
            <div style={{ 
              width: '200px', 
              height: '20px', 
              background: '#eee', 
              borderRadius: '10px',
              overflow: 'hidden',
              marginRight: '1rem'
            }}>
              <div style={{
                width: `${(count / maxCount) * 100}%`,
                height: '100%',
                background: colors[index % colors.length],
                borderRadius: '10px',
                transition: 'width 0.5s'
              }} />
            </div>
            <span style={{ fontWeight: 700, color: '#666' }}>{count}</span>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: '2rem', marginBottom: '1rem' }}>🌍 Langues Parlées</h2>
      <div className="stats-row" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))' }}>
        {[...new Set(talents.flatMap(t => t.languages))].map((lang, i) => {
          const count = talents.filter(t => t.languages.includes(lang)).length;
          return (
            <div key={lang} className="stat-card">
              <div className="stat-number" style={{ color: colors[i % colors.length], fontSize: '1.5rem' }}>
                {count}
              </div>
              <div className="stat-label">{lang}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Collab Section Component
function CollabSection() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="collab-section">
      <h2>🤝 Trouver un Collaborateur</h2>
      <p style={{ opacity: 0.9, marginBottom: '1rem' }}>
        Vous avez un projet ? Trouvez les talents qu'il vous faut !
      </p>
      <div className="collab-form">
        <input
          type="text"
          className="form-input collab-input"
          placeholder="De quelles compétences avez-vous besoin ? (React, Python, Design...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Link 
          to={`/explore?q=${encodeURIComponent(searchQuery)}`} 
          className="btn btn-primary"
        >
          🔍 Rechercher
        </Link>
      </div>
    </div>
  );
}

// Main App
function App() {
  const [talents, setTalents] = useState(SAMPLE_TALENTS);

  const handleAddTalent = (newTalent) => {
    setTalents(prev => [newTalent, ...prev]);
  };

  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage talents={talents} />} />
          <Route path="/explore" element={<ExplorePage talents={talents} />} />
          <Route path="/add" element={<AddProfilePage onAddTalent={handleAddTalent} />} />
          <Route path="/cloud" element={<CloudPage talents={talents} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
