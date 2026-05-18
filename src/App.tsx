import {
  ArrowRight,
  BarChart3,
  Bookmark,
  BookOpenText,
  BriefcaseBusiness,
  Building2,
  CalendarDays,
  Check,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  LineChart,
  LogOut,
  Mail,
  PieChart,
  Plus,
  ShieldCheck,
  Sparkles,
  UserRound,
} from 'lucide-react';
import { useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { Link, Navigate, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import './App.css';
import { allSectionBlocks, brief, company, earningsEvents, financialMetrics, sections, transcriptNotes } from './data/sampleBrief';
import { db, id, isInstantConfigured } from './lib/db';

type AuthUser = {
  id: string;
  email: string;
};

type ActionState = {
  watchlist: boolean;
  portfolio: boolean;
  saved: boolean;
};

const defaultActions: ActionState = {
  watchlist: false,
  portfolio: false,
  saved: false,
};

function App() {
  return (
    <AuthShell>
      {(auth) => (
        <Routes>
          <Route path="/" element={<MarketingPage auth={auth} />} />
          <Route path="/app" element={<Dashboard auth={auth} />} />
          <Route path="/briefs/:briefId" element={<BriefPage auth={auth} />} />
          <Route path="/briefs/:briefId/:sectionSlug" element={<SectionDetailPage auth={auth} />} />
          <Route path="/watchlist" element={<CollectionPage auth={auth} type="watchlist" />} />
          <Route path="/portfolio" element={<CollectionPage auth={auth} type="portfolio" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      )}
    </AuthShell>
  );
}

function AuthShell({ children }: { children: (auth: ReturnType<typeof useOwnerAuth>) => ReactNode }) {
  const auth = useOwnerAuth();
  return children(auth);
}

function useOwnerAuth() {
  const instantAuth = isInstantConfigured
    ? db.useAuth()
    : { isLoading: false, user: null, error: null };
  const [demoUser, setDemoUser] = useState<AuthUser | null>(null);
  const user = (instantAuth.user as AuthUser | null) || demoUser;

  const signOut = async () => {
    if (isInstantConfigured && instantAuth.user) {
      await db.auth.signOut();
    }
    setDemoUser(null);
  };

  return {
    isLoading: instantAuth.isLoading,
    error: instantAuth.error,
    user,
    isSignedIn: Boolean(user),
    isDemoMode: !isInstantConfigured,
    previewSignIn: () => setDemoUser({ id: 'demo-user', email: 'owner@example.com' }),
    signOut,
  };
}

function MarketingPage({ auth }: { auth: ReturnType<typeof useOwnerAuth> }) {
  return (
    <main className="site">
      <PublicHeader auth={auth} />
      <section className="hero-section">
        <div className="hero-copy">
          <h1>Own companies. Don’t trade tickers.</h1>
          <p>
            One growth company each day, studied like a business you might actually want to own.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#signup">
              Get the daily brief <ArrowRight size={18} />
            </a>
            <a className="button button-secondary" href="#philosophy">
              See the owner checklist
            </a>
          </div>
        </div>
        <div className="hero-panel" aria-label="Owner brief preview">
          <div className="panel-topline">
            <span>{brief.publishDate}</span>
            <span>{company.ticker}</span>
          </div>
          <h2>{brief.title}</h2>
          <p>{brief.summary}</p>
          <div className="signal-grid">
            <Signal icon={<Building2 />} label="Business model" value="Platform economics" />
            <Signal icon={<BarChart3 />} label="Fundamentals" value="Growth and margins" />
            <Signal icon={<BookOpenText />} label="Transcript notes" value="Owner tone check" />
            <Signal icon={<ShieldCheck />} label="Risks" value="What could break" />
          </div>
        </div>
      </section>

      <section id="signup" className="signup-band">
        <div>
          <h2>Start with one company worth understanding.</h2>
          <p>Signup uses a secure email magic code. No payments, no trading alerts, no noise.</p>
        </div>
        <AuthCard auth={auth} compact />
      </section>

      <section id="philosophy" className="section owner-checklist">
        <div className="section-heading">
          <p className="label">Owner checklist</p>
          <h2>Before you buy a stock, ask if you would want to run the business.</h2>
        </div>
        <div className="checklist-grid">
          {[
            'Would you want to run this company?',
            'Do you trust the people working for you?',
            'Do you understand how it makes money?',
            'Can you explain how it plans to grow?',
            'Do earnings transcripts make you more confident?',
            'Would you keep studying it when the market gets loud?',
          ].map((item) => (
            <article className="check-card" key={item}>
              <Check size={18} />
              <span>{item}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section inside-section">
        <div className="section-heading">
          <p className="label">What’s inside</p>
          <h2>A daily brief designed for business owners, not ticker watchers.</h2>
        </div>
        <div className="inside-list">
          {sections.slice(0, 8).map((section) => (
            <Link to={`/briefs/${brief.slug}/${section.slug}`} className="inside-row" key={section.id}>
              <span>{section.title}</span>
              <ChevronRight size={18} />
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function PublicHeader({ auth }: { auth: ReturnType<typeof useOwnerAuth> }) {
  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <span className="brand-mark">OB</span>
        Owner’s Brief
      </Link>
      <nav>
        <a href="/#philosophy">Philosophy</a>
        <Link to="/watchlist">Watchlist</Link>
        <Link to="/portfolio">Portfolio Tracker</Link>
        <a href="#disclaimer">Disclaimer</a>
      </nav>
      {auth.isSignedIn ? (
        <Link className="button button-primary button-small" to="/app">
          Open app
        </Link>
      ) : (
        <a className="button button-primary button-small" href="#signup">
          Get the daily brief
        </a>
      )}
    </header>
  );
}

function AppHeader({ auth }: { auth: ReturnType<typeof useOwnerAuth> }) {
  return (
    <header className="app-header">
      <Link to="/app" className="brand">
        <span className="brand-mark">OB</span>
        Owner’s Brief
      </Link>
      <nav>
        <Link to="/briefs/2026-05-18-nvda">Today’s Brief</Link>
        <Link to="/watchlist">Watchlist</Link>
        <Link to="/portfolio">Portfolio Tracker</Link>
        <span className="account-pill">
          <UserRound size={16} /> {auth.user?.email || 'Account'}
        </span>
        <button className="text-button" type="button" onClick={() => void auth.signOut()}>
          <LogOut size={16} /> Sign out
        </button>
      </nav>
    </header>
  );
}

function AuthCard({ auth, compact = false }: { auth: ReturnType<typeof useOwnerAuth>; compact?: boolean }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [sentEmail, setSentEmail] = useState('');
  const [status, setStatus] = useState('');

  if (auth.isSignedIn) {
    return (
      <div className={compact ? 'auth-card compact' : 'auth-card'}>
        <p className="label">Signed in</p>
        <h3>Welcome back.</h3>
        <p>{auth.user?.email}</p>
        <button className="button button-primary" type="button" onClick={() => navigate('/app')}>
          Go to dashboard
        </button>
      </div>
    );
  }

  const sendCode = async (event: FormEvent) => {
    event.preventDefault();
    if (!isInstantConfigured) {
      auth.previewSignIn();
      navigate('/app');
      return;
    }
    setStatus('Sending your code...');
    await db.auth.sendMagicCode({ email });
    setSentEmail(email);
    setStatus('Check your email for a six digit code.');
  };

  const verifyCode = async (event: FormEvent) => {
    event.preventDefault();
    if (!sentEmail) return;
    setStatus('Verifying...');
    const result = await db.auth.signInWithMagicCode({
      email: sentEmail,
      code,
      extraFields: { newsletterConsent: true, createdAt: new Date().toISOString() },
    });
    await ensureProfile(result.user.id, result.user.email || sentEmail);
    navigate('/app');
  };

  return (
    <div className={compact ? 'auth-card compact' : 'auth-card'}>
      <p className="label">Email magic code</p>
      <h3>Get the daily owner’s brief.</h3>
      <form onSubmit={sentEmail ? verifyCode : sendCode}>
        <label>
          <span>{sentEmail ? 'Verification code' : 'Email address'}</span>
          <input
            type={sentEmail ? 'text' : 'email'}
            value={sentEmail ? code : email}
            onChange={(event) => (sentEmail ? setCode(event.target.value) : setEmail(event.target.value))}
            placeholder={sentEmail ? '123456' : 'you@example.com'}
            required
          />
        </label>
        <button className="button button-primary" type="submit">
          {sentEmail ? 'Verify code' : auth.isDemoMode ? 'Preview the app' : 'Send my code'}
        </button>
      </form>
      <p className="microcopy">
        {status || (auth.isDemoMode ? 'Add VITE_INSTANT_APP_ID to enable live auth.' : 'No spam. No stock alerts. One company a day.')}
      </p>
    </div>
  );
}

async function ensureProfile(userId: string, email: string) {
  if (!isInstantConfigured) return;
  await db.transact(
    db.tx.userProfiles[userId].update({
      userId,
      email,
      createdAt: new Date().toISOString(),
      newsletterConsent: true,
    }),
  );
}

function Dashboard({ auth }: { auth: ReturnType<typeof useOwnerAuth> }) {
  if (auth.isLoading) return <LoadingScreen />;
  if (!auth.isSignedIn) return <SignedOutGate auth={auth} />;

  return (
    <main className="app-surface">
      <AppHeader auth={auth} />
      <section className="dashboard-hero">
        <div>
          <p className="label">Daily cadence</p>
          <h1>Your first Owner’s Brief is coming soon.</h1>
          <p>
            The product is ready for one focused company study per day: business model,
            leadership, fundamentals, earnings history, transcripts, and owner questions.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/briefs/2026-05-18-nvda">
              Open sample Nvidia brief <ArrowRight size={18} />
            </Link>
            <Link className="button button-secondary" to="/watchlist">
              View watchlist
            </Link>
          </div>
        </div>
        <div className="cadence-card">
          <CalendarDays size={22} />
          <span>Next brief</span>
          <strong>Every market morning</strong>
          <p>One company, one owner question, one structured research loop.</p>
        </div>
      </section>

      <section className="module-grid">
        {sections.map((section) => (
          <Link className="module-card" key={section.id} to={`/briefs/2026-05-18-nvda/${section.slug}`}>
            <span className="module-icon">{sectionIcon(section.sectionType)}</span>
            <h2>{section.title}</h2>
            <p>{section.summary}</p>
            <span className="card-link">Dig in <ChevronRight size={16} /></span>
          </Link>
        ))}
      </section>
    </main>
  );
}

function BriefPage({ auth }: { auth: ReturnType<typeof useOwnerAuth> }) {
  const { briefId } = useParams();
  const [actions, setActions] = useState(defaultActions);
  const selectedBrief = briefId === brief.id || briefId === brief.slug ? brief : brief;

  return (
    <main className="app-surface">
      <AppHeader auth={auth} />
      <section className="brief-layout">
        <aside className="brief-sidebar">
          <p className="label">{company.exchange}: {company.ticker}</p>
          <h1>{company.name}</h1>
          <p>{company.description}</p>
          <div className="side-stat">
            <span>Brief date</span>
            <strong>{selectedBrief.publishDate}</strong>
          </div>
          <div className="side-stat">
            <span>Sector</span>
            <strong>{company.sector}</strong>
          </div>
          <ActionPanel auth={auth} actions={actions} setActions={setActions} />
        </aside>

        <article className="brief-main">
          <div className="brief-title-row">
            <div>
              <p className="label">Today’s Owner Brief</p>
              <h2>{selectedBrief.title}</h2>
            </div>
            <span className="date-chip">{selectedBrief.publishDate}</span>
          </div>
          <p className="brief-summary">{selectedBrief.summary}</p>
          <div className="owner-question">
            <Sparkles size={20} />
            <span>{selectedBrief.ownerQuestion}</span>
          </div>

          <div className="brief-section-grid">
            {sections.map((section) => (
              <Link className="brief-section-card" key={section.id} to={`/briefs/${selectedBrief.slug}/${section.slug}`}>
                <div className="section-card-top">
                  <span className="module-icon">{sectionIcon(section.sectionType)}</span>
                  <ChevronRight size={18} />
                </div>
                <h3>{section.title}</h3>
                <p>{section.summary}</p>
              </Link>
            ))}
          </div>
        </article>
      </section>
      <Footer app />
    </main>
  );
}

function SectionDetailPage({ auth }: { auth: ReturnType<typeof useOwnerAuth> }) {
  const { sectionSlug } = useParams();
  const section = sections.find((item) => item.slug === sectionSlug) || sections[0];
  const relatedBlocks = allSectionBlocks.filter((block) => block.sectionId === section.id);

  return (
    <main className="app-surface">
      <AppHeader auth={auth} />
      <section className="detail-layout">
        <aside className="detail-nav">
          <Link className="back-link" to="/briefs/2026-05-18-nvda">
            Back to full brief
          </Link>
          {sections.map((item) => (
            <Link className={item.slug === section.slug ? 'active' : ''} key={item.id} to={`/briefs/2026-05-18-nvda/${item.slug}`}>
              {item.title}
            </Link>
          ))}
        </aside>
        <article className="detail-article">
          <p className="label">{company.ticker} owner deep dive</p>
          <h1>{section.title}</h1>
          <p className="detail-summary">{section.summary}</p>
          <p>{section.body}</p>
          {section.slug === 'fundamentals' && <FundamentalsPanel />}
          {section.slug === 'earnings-history' && <EarningsPanel />}
          {section.slug === 'financial-performance' && <PerformancePanel />}
          {section.slug === 'transcript-notes' && <TranscriptPanel />}
          {relatedBlocks.map((block) => (
            <BlockRenderer key={block.id} block={block} />
          ))}
          <div className="detail-footer-note">{brief.disclaimer}</div>
        </article>
      </section>
    </main>
  );
}

function BlockRenderer({ block }: { block: (typeof allSectionBlocks)[number] }) {
  if (block.blockType === 'bullets' && Array.isArray(block.content)) {
    return (
      <section className="detail-block">
        {block.title && <h2>{block.title}</h2>}
        <ul>
          {block.content.map((item) => (
            <li key={String(item)}>{String(item)}</li>
          ))}
        </ul>
      </section>
    );
  }

  if (block.blockType === 'checklist' && Array.isArray(block.content)) {
    return (
      <section className="detail-block">
        {block.title && <h2>{block.title}</h2>}
        <div className="mini-checklist">
          {block.content.map((item) => {
            const value = item as { label: string; checked: boolean };
            return (
              <div key={value.label}>
                <span className={value.checked ? 'check-dot active' : 'check-dot'}>{value.checked ? <Check size={14} /> : null}</span>
                {value.label}
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  if (block.blockType === 'table' && Array.isArray(block.content)) {
    const rows = block.content as string[][];
    return (
      <section className="detail-block">
        {block.title && <h2>{block.title}</h2>}
        <div className="table-wrap">
          <table>
            <tbody>
              {rows.map((row, index) => (
                <tr key={row.join('-')} className={index === 0 ? 'table-head' : ''}>
                  {row.map((cell) => (
                    <td key={cell}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  if (block.blockType === 'chart' && Array.isArray(block.content)) {
    const points = block.content as { period: string; revenue: number }[];
    const max = Math.max(...points.map((point) => point.revenue));
    return (
      <section className="detail-block">
        {block.title && <h2>{block.title}</h2>}
        <div className="bar-list">
          {points.map((point) => (
            <div className="bar-row" key={point.period}>
              <span>{point.period}</span>
              <div><i style={{ width: `${(point.revenue / max) * 100}%` }} /></div>
              <strong>${point.revenue.toFixed(1)}B</strong>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="detail-block quote-block">
      {block.title && <h2>{block.title}</h2>}
      <p>{String(block.content)}</p>
    </section>
  );
}

function FundamentalsPanel() {
  return (
    <section className="data-panel">
      {financialMetrics.map((metric) => (
        <div key={metric.id}>
          <span>{metric.metricName}</span>
          <strong>{metric.value}{metric.unit === 'percent' ? '%' : metric.unit.includes('USD') ? 'B' : ''}</strong>
          <small>{metric.sourceLabel}</small>
        </div>
      ))}
    </section>
  );
}

function EarningsPanel() {
  return (
    <section className="detail-block">
      <h2>Earnings rows</h2>
      <div className="table-wrap">
        <table>
          <tbody>
            <tr className="table-head">
              <td>Period</td>
              <td>Report date</td>
              <td>Revenue</td>
              <td>EPS</td>
              <td>Notes</td>
            </tr>
            {earningsEvents.map((event) => (
              <tr key={event.id}>
                <td>{event.fiscalPeriod}</td>
                <td>{event.reportDate}</td>
                <td>${event.revenue}B</td>
                <td>${event.eps}</td>
                <td>{event.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function PerformancePanel() {
  const values = financialMetrics.filter((metric) => metric.metricName !== 'Revenue');
  return (
    <section className="data-panel">
      {values.map((metric) => (
        <div key={metric.id}>
          <span>{metric.metricName}</span>
          <strong>{metric.value}{metric.unit === 'percent' ? '%' : 'B'}</strong>
          <small>{metric.period}</small>
        </div>
      ))}
    </section>
  );
}

function TranscriptPanel() {
  return (
    <section className="transcript-stack">
      {transcriptNotes.map((note) => (
        <article key={note.id}>
          <span>{note.speaker} on {note.topic}</span>
          <p>{note.quoteSnippet}</p>
          <strong>{note.ownerInterpretation}</strong>
        </article>
      ))}
    </section>
  );
}

function ActionPanel({
  auth,
  actions,
  setActions,
}: {
  auth: ReturnType<typeof useOwnerAuth>;
  actions: ActionState;
  setActions: (actions: ActionState) => void;
}) {
  const mutate = async (type: keyof ActionState) => {
    if (!auth.isSignedIn) return;
    const now = new Date().toISOString();
    setActions({ ...actions, [type]: true });
    if (!isInstantConfigured || !auth.user) return;

    if (type === 'watchlist') {
      await db.transact(db.tx.watchlistItems[id()].update({ userId: auth.user.id, companyId: company.id, createdAt: now, notes: 'Added from Nvidia sample brief.' }));
    }
    if (type === 'portfolio') {
      await db.transact(db.tx.portfolioPositions[id()].update({ userId: auth.user.id, companyId: company.id, shares: 0, averageCost: 0, thesis: 'Tracking thesis before entering a position.', createdAt: now, updatedAt: now }));
    }
    if (type === 'saved') {
      await db.transact(db.tx.savedBriefs[id()].update({ userId: auth.user.id, briefId: brief.id, createdAt: now }));
    }
  };

  return (
    <div className="action-panel">
      <button type="button" onClick={() => void mutate('watchlist')} disabled={!auth.isSignedIn || actions.watchlist}>
        <Plus size={16} /> {actions.watchlist ? 'Added to Watchlist' : 'Add to Watchlist'}
      </button>
      <button type="button" onClick={() => void mutate('portfolio')} disabled={!auth.isSignedIn || actions.portfolio}>
        <PieChart size={16} /> {actions.portfolio ? 'Tracked' : 'Track in Portfolio'}
      </button>
      <button type="button" onClick={() => void mutate('saved')} disabled={!auth.isSignedIn || actions.saved}>
        <Bookmark size={16} /> {actions.saved ? 'Saved' : 'Save Brief'}
      </button>
      {!auth.isSignedIn && <small>Sign in to use owner tools.</small>}
    </div>
  );
}

function CollectionPage({ auth, type }: { auth: ReturnType<typeof useOwnerAuth>; type: 'watchlist' | 'portfolio' }) {
  if (!auth.isSignedIn) return <SignedOutGate auth={auth} />;
  const isPortfolio = type === 'portfolio';
  return (
    <main className="app-surface">
      <AppHeader auth={auth} />
      <section className="collection-page">
        <p className="label">{isPortfolio ? 'Portfolio Tracker' : 'Watchlist'}</p>
        <h1>{isPortfolio ? 'Track companies like businesses.' : 'Keep interesting companies close.'}</h1>
        <p>
          {isPortfolio
            ? 'V1 records companies you want to track. Position sizing, thesis history, and performance analytics come next.'
            : 'V1 is ready to save companies from a brief. Notes, alerts, and transcript follow-ups come next.'}
        </p>
        <Link className="collection-row" to="/briefs/2026-05-18-nvda">
          <span>{company.ticker}</span>
          <strong>{company.name}</strong>
          <ChevronRight size={18} />
        </Link>
      </section>
    </main>
  );
}

function SignedOutGate({ auth }: { auth: ReturnType<typeof useOwnerAuth> }) {
  return (
    <main className="site gate-screen">
      <PublicHeader auth={auth} />
      <section>
        <div>
          <p className="label">Owner access</p>
          <h1>Sign in to open the Owner’s Brief workspace.</h1>
          <p>Use your email magic code to view the sample brief and owner tools.</p>
        </div>
        <AuthCard auth={auth} />
      </section>
    </main>
  );
}

function LoadingScreen() {
  return <main className="loading-screen">Preparing your owner workspace...</main>;
}

function Signal({ icon, label, value }: { icon: ReactNode; label: string; value: string }) {
  return (
    <div>
      <span>{icon}</span>
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  );
}

function sectionIcon(type: string) {
  const icons: Record<string, ReactNode> = {
    thesis: <BookOpenText size={19} />,
    'owner-question': <ClipboardCheck size={19} />,
    'business-model': <Building2 size={19} />,
    products: <BriefcaseBusiness size={19} />,
    leadership: <UserRound size={19} />,
    fundamentals: <CircleDollarSign size={19} />,
    earnings: <CalendarDays size={19} />,
    financials: <LineChart size={19} />,
    growth: <Sparkles size={19} />,
    risks: <ShieldCheck size={19} />,
    transcript: <Mail size={19} />,
    checklist: <ClipboardCheck size={19} />,
  };
  return icons[type] || <BookOpenText size={19} />;
}

function Footer({ app = false }: { app?: boolean }) {
  return (
    <footer id="disclaimer" className={app ? 'app-footer' : 'footer'}>
      <span>Owner’s Brief</span>
      <p>{brief.disclaimer} Sample data is provided to exercise the product experience.</p>
    </footer>
  );
}

export default App;
