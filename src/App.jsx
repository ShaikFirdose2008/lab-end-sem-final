import { useState } from "react";

const icons = {
  overview: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /></>,
  profile: <><circle cx="12" cy="8" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></>,
  security: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
  notifications: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>,
  help: <><circle cx="12" cy="12" r="10" /><path d="M9.1 9a3 3 0 0 1 5.8 1c0 2-3 3-3 3" /><path d="M12 17h.01" /></>,
  search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></>,
  arrow: <><path d="M7 17 17 7M7 7h10v10" /></>,
  chevron: <path d="m9 18 6-6-6-6" />,
  clock: <><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>,
  check: <path d="m5 12 4 4L19 6" />,
};

function Icon({ name, size = 20 }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">{icons[name]}</svg>;
}

const navigation = [
  { label: "Overview", icon: "overview" },
  { label: "My profile", icon: "profile" },
  { label: "Security", icon: "security" },
  { label: "Notifications", icon: "notifications", badge: "2" },
];

const activity = [
  { icon: "security", title: "Password updated", detail: "Your account password was changed", time: "2 hours ago", color: "lavender" },
  { icon: "profile", title: "Profile information added", detail: "You added your job title", time: "Yesterday", color: "peach" },
  { icon: "notifications", title: "Email preferences updated", detail: "Weekly digest is turned on", time: "Mon, Oct 21", color: "mint" },
];

function App() {
  const [active, setActive] = useState("Overview");
  const [notice, setNotice] = useState("");

  function choosePage(label) {
    setActive(label);
    if (label !== "Overview") setNotice(`${label} settings are ready to explore.`);
    else setNotice("");
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <a className="brand" href="#" aria-label="Orbit home" onClick={(event) => event.preventDefault()}>
          <span className="brand-mark"><span /></span><span>orbit<span className="brand-dot">.</span></span>
        </a>
        <div className="workspace-label">WORKSPACE</div>
        <div className="workspace-switcher">
          <span className="workspace-avatar">S</span>
          <span className="workspace-copy"><strong>Studio North</strong><small>Personal workspace</small></span>
          <span className="switcher-caret">⌄</span>
        </div>
        <div className="nav-label">MENU</div>
        <nav className="navigation" aria-label="Main navigation">
          {navigation.map((item) => (
            <button key={item.label} className={`nav-item ${active === item.label ? "selected" : ""}`} onClick={() => choosePage(item.label)}>
              <Icon name={item.icon} size={19} /><span>{item.label}</span>{item.badge && <span className="nav-badge">{item.badge}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <div className="help-card">
            <span className="help-icon"><Icon name="help" size={18} /></span>
            <strong>Need a hand?</strong>
            <p>Our support team is always happy to help.</p>
            <button onClick={() => setNotice("Support is here for you — hello@orbit.example")}>Visit help center <Icon name="arrow" size={14} /></button>
          </div>
          <button className="mini-profile" onClick={() => choosePage("My profile")}>
            <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&q=80" alt="" />
            <span><strong>Sophia Chen</strong><small>Free plan</small></span>
            <span className="mini-menu">···</span>
          </button>
        </div>
      </aside>

      <main className="main-panel">
        <header className="topbar">
          <div className="breadcrumb"><span>Workspace</span><Icon name="chevron" size={14} /><strong>{active}</strong></div>
          <div className="topbar-actions">
            <label className="search-box"><Icon name="search" size={17} /><input type="search" placeholder="Search anything..." aria-label="Search anything" /><kbd>⌘ K</kbd></label>
            <button className="icon-button notification-button" aria-label="Notifications" onClick={() => choosePage("Notifications")}><Icon name="notifications" size={19} /><i /></button>
            <button className="top-avatar" aria-label="Open my profile" onClick={() => choosePage("My profile")}><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&q=80" alt="" /></button>
          </div>
        </header>

        <div className="content">
          <section className="welcome-row">
            <div>
              <div className="eyebrow"><span className="eyebrow-line" /> TUESDAY, OCTOBER 24, 2024</div>
              <h1>Good morning, Sophia <span className="wave">✳</span></h1>
              <p className="welcome-subtitle">Here’s what’s happening with your account today.</p>
            </div>
            <button className="edit-button" onClick={() => choosePage("My profile")}><Icon name="profile" size={17} /> Edit profile</button>
          </section>

          {notice && <div className="notice" role="status">{notice}<button onClick={() => setNotice("")} aria-label="Dismiss">×</button></div>}

          <section className="profile-banner">
            <div className="banner-art art-one" /><div className="banner-art art-two" /><div className="banner-art art-three" />
            <div className="profile-identity">
              <div className="profile-photo-wrap"><img className="profile-photo" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=85" alt="Sophia Chen" /><span className="online-dot" /></div>
              <div className="identity-copy"><div className="name-line"><h2>Sophia Chen</h2><span className="verified"><Icon name="check" size={12} /></span></div><p>Product Designer <span>·</span> San Francisco, CA</p><a href="mailto:sophia.chen@example.com">sophia.chen@example.com</a></div>
            </div>
            <div className="member-since"><span>MEMBER SINCE</span><strong>January 2023</strong></div>
            <button className="banner-edit" onClick={() => choosePage("My profile")} aria-label="Edit profile"><Icon name="arrow" size={17} /></button>
          </section>

          <section className="stats-grid" aria-label="Account overview">
            <article className="stat-card">
              <div className="stat-top"><span className="stat-label">PROFILE COMPLETION</span><span className="stat-icon purple"><Icon name="profile" size={17} /></span></div>
              <div className="stat-value"> <strong>80</strong><span>%</span><span className="stat-trend">+20%</span></div>
              <div className="progress-track"><span style={{ width: "80%" }} /></div>
              <div className="stat-foot"><span>Almost there!</span><button onClick={() => choosePage("My profile")}>Complete profile <Icon name="chevron" size={13} /></button></div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span className="stat-label">ACCOUNT SECURITY</span><span className="stat-icon green"><Icon name="security" size={17} /></span></div>
              <div className="security-value"><strong>Strong</strong><span className="secure-dot" /> <span className="secure-caption">All good</span></div>
              <p className="stat-description">Your account is well protected.</p>
              <div className="stat-foot"><span>Last checked today</span><button onClick={() => choosePage("Security")}>View security <Icon name="chevron" size={13} /></button></div>
            </article>
            <article className="stat-card">
              <div className="stat-top"><span className="stat-label">ACTIVE SESSIONS</span><span className="stat-icon orange"><Icon name="clock" size={17} /></span></div>
              <div className="session-value"><strong>2</strong><span>devices</span></div>
              <p className="stat-description">MacBook Pro <span className="session-separator">·</span> iPhone 15</p>
              <div className="stat-foot"><span>Both active recently</span><button onClick={() => choosePage("Security")}>Manage sessions <Icon name="chevron" size={13} /></button></div>
            </article>
          </section>

          <section className="lower-grid">
            <article className="panel activity-panel">
              <div className="panel-heading"><div><h3>Recent activity</h3><p>A little history of your account</p></div><button className="text-button" onClick={() => setNotice("You’re all caught up on recent account activity.")}>View all <Icon name="chevron" size={14} /></button></div>
              <div className="activity-list">
                {activity.map((item) => <div className="activity-item" key={item.title}><span className={`activity-icon ${item.color}`}><Icon name={item.icon} size={17} /></span><div className="activity-copy"><strong>{item.title}</strong><span>{item.detail}</span></div><time>{item.time}</time></div>)}
              </div>
              <div className="activity-footer"><span className="tiny-check"><Icon name="check" size={12} /></span> You’re all caught up</div>
            </article>
            <article className="panel checklist-panel">
              <div className="panel-heading"><div><h3>Finish setting up</h3><p>Get the most out of your account</p></div><span className="remaining-pill">2 left</span></div>
              <button className="checklist-item" onClick={() => setNotice("Add a short bio to tell people a little about yourself.")}><span className="empty-check" /><span><strong>Add a short bio</strong><small>Let people know what you do</small></span><Icon name="chevron" size={16} /></button>
              <button className="checklist-item" onClick={() => setNotice("Connect your calendar to keep everything in sync.")}><span className="empty-check" /><span><strong>Connect your calendar</strong><small>Keep everything in sync</small></span><Icon name="chevron" size={16} /></button>
              <button className="checklist-item completed" onClick={() => choosePage("Security")}><span className="filled-check"><Icon name="check" size={12} /></span><span><strong>Secure your account</strong><small>Two-factor authentication enabled</small></span><span className="done-tag">DONE</span></button>
            </article>
          </section>
          <footer className="page-footer"><span>© 2024 Orbit, Inc.</span><span><a href="#privacy" onClick={(event) => event.preventDefault()}>Privacy</a><a href="#terms" onClick={(event) => event.preventDefault()}>Terms</a><a href="#status" onClick={(event) => event.preventDefault()}>Status <i className="status-dot" /></a></span></footer>
        </div>
      </main>
    </div>
  );
}

export default App;
