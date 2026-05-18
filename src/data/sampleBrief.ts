export type BriefSection = {
  id: string;
  briefId: string;
  slug: string;
  title: string;
  sectionType: string;
  summary: string;
  body: string;
  order: number;
  updatedAt: string;
  blocks: SectionBlock[];
};

export type SectionBlock = {
  id: string;
  sectionId: string;
  blockType: 'paragraph' | 'bullets' | 'table' | 'chart' | 'quote' | 'checklist';
  title?: string;
  content: unknown;
  sortOrder: number;
};

const uuidFromKey = (key: string) => {
  let hash = 2166136261;
  for (let index = 0; index < key.length; index += 1) {
    hash ^= key.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  const hex = Math.abs(hash).toString(16).padStart(8, '0');
  return `${hex.slice(0, 8)}-${hex.slice(0, 4)}-4${hex.slice(1, 4)}-8${hex.slice(2, 5)}-${hex}${hex.slice(0, 4)}`.slice(0, 36);
};

export const company = {
  id: uuidFromKey('company-nvda'),
  ticker: 'NVDA',
  name: 'Nvidia Corporation',
  exchange: 'Nasdaq',
  sector: 'Technology',
  industry: 'Semiconductors and infrastructure computing',
  website: 'https://www.nvidia.com',
  logoUrl: '',
  description:
    'Nvidia designs accelerated computing platforms spanning GPUs, networking, systems software, and developer tools used across gaming, data centers, professional visualization, robotics, and automotive markets.',
};

export const brief = {
  id: uuidFromKey('brief-2026-05-18-nvda'),
  companyId: company.id,
  ticker: company.ticker,
  title: 'Nvidia: The Operating System of Accelerated Computing',
  slug: '2026-05-18-nvda',
  publishDate: '2026-05-18',
  status: 'published',
  summary:
    'A sample educational owner brief studying Nvidia as a company, not as a ticker. The focus is business quality, leadership, growth runway, fundamentals, risks, and what an owner should keep watching.',
  ownerQuestion:
    'If you owned the whole business, would you want to keep Jensen Huang and the Nvidia team running it for the next decade?',
  disclaimer: 'Educational and informational only. Not investment advice.',
};

const updatedAt = '2026-05-18T12:00:00.000Z';

const makeSection = (
  order: number,
  slug: string,
  title: string,
  sectionType: string,
  summary: string,
  body: string,
  blocks: Omit<SectionBlock, 'sectionId'>[],
): BriefSection => {
  const id = uuidFromKey(`section-${slug}`);
  return {
    id,
    briefId: brief.id,
    slug,
    title,
    sectionType,
    summary,
    body,
    order,
    updatedAt,
    blocks: blocks.map((block) => ({ ...block, id: uuidFromKey(block.id), sectionId: id })),
  };
};

export const sections: BriefSection[] = [
  makeSection(
    1,
    'company-thesis',
    'Company thesis',
    'thesis',
    'Nvidia is a platform company built around accelerated computing, not only a chip vendor.',
    'The owner thesis is that Nvidia has turned specialized computing into a full stack: silicon, networking, systems, software libraries, developer mindshare, and ecosystem partnerships. That combination can create durable demand when customers need more efficient compute for AI, simulation, graphics, and scientific workloads.',
    [
      {
        id: 'block-thesis-bullets',
        blockType: 'bullets',
        title: 'What an owner is testing',
        content: [
          'Can Nvidia keep compounding developer and customer trust as AI infrastructure matures?',
          'Does the company continue to widen from components into full systems and software?',
          'Are customers buying because Nvidia solves hard business problems, not because AI spending is fashionable?',
        ],
        sortOrder: 1,
      },
    ],
  ),
  makeSection(
    2,
    'owners-question',
    'Owner’s question',
    'owner-question',
    'Would you want to run this company, and do you trust the people currently running it?',
    'A long-term owner should ask whether the mission is interesting enough to keep studying. Nvidia is trying to define the computing layer for AI factories, robotics, and accelerated workloads. That is ambitious, technically difficult, and operationally intense.',
    [
      {
        id: 'block-owner-check',
        blockType: 'checklist',
        title: 'Owner fit',
        content: [
          { label: 'Mission is clear and ambitious', checked: true },
          { label: 'Leadership communicates like builders', checked: true },
          { label: 'Business requires continued technical execution', checked: true },
          { label: 'Valuation can punish disappointment', checked: true },
        ],
        sortOrder: 1,
      },
    ],
  ),
  makeSection(
    3,
    'business-model',
    'Business model',
    'business-model',
    'Nvidia sells hardware platforms, networking, systems, and software that make accelerated computing useful.',
    'The business makes money by selling GPUs, accelerators, networking equipment, systems, software, and platform services. Data center demand is currently the center of gravity, but the broader model depends on recurring platform relevance across developers, cloud providers, enterprises, researchers, and device makers.',
    [
      {
        id: 'block-model-table',
        blockType: 'table',
        title: 'Revenue engine',
        content: [
          ['Area', 'What it produces', 'Owner question'],
          ['Data center', 'Accelerated computing systems', 'Is demand durable beyond initial AI buildout?'],
          ['Gaming', 'Consumer GPUs and services', 'Can it remain culturally and technically relevant?'],
          ['Automotive', 'Compute platforms for vehicles', 'Can long-cycle partnerships become material?'],
        ],
        sortOrder: 1,
      },
    ],
  ),
  makeSection(
    4,
    'products-revenue',
    'Products and revenue streams',
    'products',
    'The company’s products are increasingly bundled into complete computing platforms.',
    'Nvidia’s core advantage is not any single product line in isolation. The owner should study the system: chips, CUDA, networking, server designs, cloud access, developer tools, and vertical market software.',
    [
      {
        id: 'block-products',
        blockType: 'bullets',
        title: 'Platform pieces',
        content: ['GPU accelerators', 'Networking and interconnects', 'CUDA and AI software stack', 'DGX and systems designs', 'Gaming GPUs', 'Automotive compute'],
        sortOrder: 1,
      },
    ],
  ),
  makeSection(
    5,
    'leadership-culture',
    'Leadership and culture',
    'leadership',
    'The company is strongly associated with founder-led technical strategy and long product cycles.',
    'Jensen Huang’s communication style emphasizes long-term platform shifts, full-stack engineering, and customer problem solving. Owners should listen for whether management remains precise about constraints, supply, customer concentration, and how demand is evolving.',
    [
      {
        id: 'block-leadership-quote',
        blockType: 'quote',
        title: 'Owner lens',
        content:
          'Founder-led does not automatically mean owner-aligned. The evidence has to show up in capital allocation, product discipline, candor, and resilience when cycles turn.',
        sortOrder: 1,
      },
    ],
  ),
  makeSection(
    6,
    'fundamentals',
    'Fundamentals',
    'fundamentals',
    'The sample fundamentals focus on growth, margins, cash generation, and balance-sheet flexibility.',
    'Fundamental analysis should answer whether growth is translating into durable economics. Owners should monitor revenue mix, gross margin stability, operating leverage, cash flow conversion, inventory, customer concentration, and supply constraints.',
    [
      {
        id: 'block-fundamentals-table',
        blockType: 'table',
        title: 'Sample fundamental snapshot',
        content: [
          ['Metric', 'Sample reading', 'Owner interpretation'],
          ['Revenue growth', 'Very high in recent AI buildout period', 'Demand is powerful, but expectations are elevated'],
          ['Gross margin', 'High for a hardware-heavy business', 'Platform value is showing up in economics'],
          ['Cash flow', 'Strong cash generation', 'Gives flexibility for R&D and supply commitments'],
          ['Balance sheet', 'Net cash position in recent filings', 'Useful cushion in a cyclical industry'],
        ],
        sortOrder: 1,
      },
    ],
  ),
  makeSection(
    7,
    'earnings-history',
    'Earnings history',
    'earnings',
    'Track whether reported results support the long-term story quarter by quarter.',
    'Earnings history is where owner attention becomes practical. The goal is not to trade every print, but to compare what management said would happen with what actually happened.',
    [
      {
        id: 'block-earnings-table',
        blockType: 'table',
        title: 'Sample recent quarters',
        content: [
          ['Period', 'Revenue', 'EPS', 'Owner note'],
          ['FY2025 Q4', '$39.3B', '$0.89', 'Data center demand remained the main driver'],
          ['FY2025 Q3', '$35.1B', '$0.81', 'Growth still broad, supply execution important'],
          ['FY2025 Q2', '$30.0B', '$0.68', 'Margins and data center mix stayed central'],
        ],
        sortOrder: 1,
      },
    ],
  ),
  makeSection(
    8,
    'financial-performance',
    'Financial performance',
    'financials',
    'The owner view connects income statement momentum to the quality and durability of the business.',
    'Financial performance should be read as a narrative of business strength. Strong numbers matter, but the deeper question is whether the company can keep investing, defend its platform, and serve customers through technology transitions.',
    [
      {
        id: 'block-performance-chart',
        blockType: 'chart',
        title: 'Sample revenue trend',
        content: [
          { period: 'FY2024', revenue: 60.9 },
          { period: 'FY2025', revenue: 130.5 },
          { period: 'FY2026 sample run-rate', revenue: 165.0 },
        ],
        sortOrder: 1,
      },
    ],
  ),
  makeSection(
    9,
    'growth-plan',
    'Growth plan',
    'growth',
    'The company’s growth plan is tied to AI infrastructure, enterprise adoption, robotics, simulation, and accelerated computing breadth.',
    'Owners should listen for growth that is specific and operational. Which customers are expanding? Which bottlenecks are being solved? Which new markets are moving from prototype to production?',
    [
      {
        id: 'block-growth',
        blockType: 'bullets',
        title: 'Areas to keep studying',
        content: ['AI factories and data centers', 'Enterprise AI software adoption', 'Networking scale', 'Robotics and physical AI', 'Automotive platforms'],
        sortOrder: 1,
      },
    ],
  ),
  makeSection(
    10,
    'risks-concerns',
    'Risks and concerns',
    'risks',
    'Great companies can still be poor owner experiences when expectations, competition, or cycles shift.',
    'The owner should be honest about risk: customer concentration, export controls, supply chain pressure, competition from internal accelerators, margin normalization, and the possibility that AI infrastructure spending becomes lumpy.',
    [
      {
        id: 'block-risks',
        blockType: 'bullets',
        title: 'Primary watch items',
        content: ['Customer concentration', 'Export restrictions', 'Supply constraints', 'Competitive silicon', 'High expectations embedded in the story'],
        sortOrder: 1,
      },
    ],
  ),
  makeSection(
    11,
    'transcript-notes',
    'Earnings transcript owner notes',
    'transcript',
    'Transcript notes turn management commentary into an owner checklist.',
    'Instead of reacting to headlines, owners should read transcripts for tone, clarity, repeated customer proof points, changes in backlog language, and whether management addresses hard questions directly.',
    [
      {
        id: 'block-transcript',
        blockType: 'quote',
        title: 'Sample owner interpretation',
        content:
          'When management talks about demand, separate confirmed customer deployment from broad excitement. Owners should reward specificity.',
        sortOrder: 1,
      },
    ],
  ),
  makeSection(
    12,
    'owner-checklist',
    'Owner checklist',
    'checklist',
    'A decision aid for whether this is a business you want to keep studying and potentially own.',
    'The checklist is not a buy signal. It is a way to decide whether the company deserves more of your attention as a potential long-term owner.',
    [
      {
        id: 'block-checklist',
        blockType: 'checklist',
        title: 'Questions before acting',
        content: [
          { label: 'Do I understand how the company makes money?', checked: true },
          { label: 'Would I be excited to run this business?', checked: true },
          { label: 'Do I trust the leadership team as operators?', checked: true },
          { label: 'Do I understand what could break the thesis?', checked: false },
          { label: 'Have I read the latest earnings transcript?', checked: false },
        ],
        sortOrder: 1,
      },
    ],
  ),
];

export const financialMetrics = [
  { id: uuidFromKey('metric-revenue-fy2025'), companyId: company.id, period: 'FY2025', fiscalYear: 2025, fiscalQuarter: 'FY', metricName: 'Revenue', value: 130.5, unit: 'USD billions', sourceLabel: 'Company filings, rounded sample' },
  { id: uuidFromKey('metric-gm-fy2025'), companyId: company.id, period: 'FY2025', fiscalYear: 2025, fiscalQuarter: 'FY', metricName: 'Gross margin', value: 75.0, unit: 'percent', sourceLabel: 'Company filings, rounded sample' },
  { id: uuidFromKey('metric-fcf-fy2025'), companyId: company.id, period: 'FY2025', fiscalYear: 2025, fiscalQuarter: 'FY', metricName: 'Free cash flow', value: 60.9, unit: 'USD billions', sourceLabel: 'Company filings, rounded sample' },
  { id: uuidFromKey('metric-rd-fy2025'), companyId: company.id, period: 'FY2025', fiscalYear: 2025, fiscalQuarter: 'FY', metricName: 'R&D intensity', value: 8.1, unit: 'percent of revenue', sourceLabel: 'Company filings, rounded sample' },
];

export const earningsEvents = [
  { id: uuidFromKey('earnings-fy2025-q4'), companyId: company.id, fiscalPeriod: 'FY2025 Q4', reportDate: '2025-02-26', revenue: 39.3, eps: 0.89, grossMargin: 73.0, operatingIncome: 24.0, netIncome: 22.1, notes: 'Sample row: data center remained the primary growth engine.' },
  { id: uuidFromKey('earnings-fy2025-q3'), companyId: company.id, fiscalPeriod: 'FY2025 Q3', reportDate: '2024-11-20', revenue: 35.1, eps: 0.81, grossMargin: 75.0, operatingIncome: 21.9, netIncome: 19.3, notes: 'Sample row: demand commentary stayed focused on accelerated computing.' },
  { id: uuidFromKey('earnings-fy2025-q2'), companyId: company.id, fiscalPeriod: 'FY2025 Q2', reportDate: '2024-08-28', revenue: 30.0, eps: 0.68, grossMargin: 75.1, operatingIncome: 18.6, netIncome: 16.6, notes: 'Sample row: owner focus on supply, margins, and customer breadth.' },
];

export const transcriptNotes = [
  {
    id: uuidFromKey('transcript-note-demand'),
    briefId: brief.id,
    speaker: 'Management',
    topic: 'Data center demand',
    quoteSnippet: 'Sample paraphrase: customers are building accelerated computing capacity for AI workloads.',
    ownerInterpretation: 'Listen for evidence of real deployments, not only aspirational demand.',
    sentiment: 'constructive',
  },
  {
    id: uuidFromKey('transcript-note-supply'),
    briefId: brief.id,
    speaker: 'CFO',
    topic: 'Supply and margins',
    quoteSnippet: 'Sample paraphrase: supply availability and product transitions remain important operating variables.',
    ownerInterpretation: 'Execution risk matters because expectations are already high.',
    sentiment: 'watch',
  },
];

export const allSectionBlocks = sections.flatMap((section) => section.blocks);
