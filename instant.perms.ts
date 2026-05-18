import type { InstantRules } from '@instantdb/react';

const rules = {
  attrs: {
    allow: {
      $default: 'false',
    },
  },
  companies: {
    allow: {
      view: 'true',
      create: 'false',
      update: 'false',
      delete: 'false',
    },
  },
  briefs: {
    allow: {
      view: "data.status == 'published'",
      create: 'false',
      update: 'false',
      delete: 'false',
    },
  },
  briefSections: {
    allow: {
      view: 'true',
      create: 'false',
      update: 'false',
      delete: 'false',
    },
  },
  sectionBlocks: {
    allow: {
      view: 'true',
      create: 'false',
      update: 'false',
      delete: 'false',
    },
  },
  financialMetrics: {
    allow: {
      view: 'true',
      create: 'false',
      update: 'false',
      delete: 'false',
    },
  },
  earningsEvents: {
    allow: {
      view: 'true',
      create: 'false',
      update: 'false',
      delete: 'false',
    },
  },
  transcriptNotes: {
    allow: {
      view: 'true',
      create: 'false',
      update: 'false',
      delete: 'false',
    },
  },
  watchlistItems: {
    allow: {
      view: 'auth.id == data.userId',
      create: 'auth.id == newData.userId',
      update: 'auth.id == data.userId',
      delete: 'auth.id == data.userId',
    },
  },
  portfolioPositions: {
    allow: {
      view: 'auth.id == data.userId',
      create: 'auth.id == newData.userId',
      update: 'auth.id == data.userId',
      delete: 'auth.id == data.userId',
    },
  },
  savedBriefs: {
    allow: {
      view: 'auth.id == data.userId',
      create: 'auth.id == newData.userId',
      update: 'auth.id == data.userId',
      delete: 'auth.id == data.userId',
    },
  },
  userProfiles: {
    allow: {
      view: 'auth.id == data.userId',
      create: 'auth.id == newData.userId',
      update: 'auth.id == data.userId',
      delete: 'auth.id == data.userId',
    },
  },
  $users: {
    allow: {
      view: 'auth.id == data.id',
      create: 'true',
      update: 'auth.id == data.id',
      delete: 'false',
    },
  },
} satisfies InstantRules;

export default rules;
