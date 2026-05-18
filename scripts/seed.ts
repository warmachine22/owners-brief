import 'dotenv/config';
import { init } from '@instantdb/admin';
import {
  allSectionBlocks,
  brief,
  company,
  earningsEvents,
  financialMetrics,
  sections,
  transcriptNotes,
} from '../src/data/sampleBrief';

const appId = process.env.VITE_INSTANT_APP_ID || process.env.INSTANT_APP_ID;
const adminToken = process.env.INSTANT_APP_ADMIN_TOKEN;

if (!appId || !adminToken) {
  console.error('Missing VITE_INSTANT_APP_ID/INSTANT_APP_ID or INSTANT_APP_ADMIN_TOKEN.');
  process.exit(1);
}

const db = init({ appId, adminToken });

const writeAll = async () => {
  await db.transact([
    db.tx.companies[company.id].update(company),
    db.tx.briefs[brief.id].update(brief),
    ...sections.map((section) =>
      db.tx.briefSections[section.id].update({
        id: section.id,
        briefId: section.briefId,
        slug: section.slug,
        title: section.title,
        sectionType: section.sectionType,
        summary: section.summary,
        body: section.body,
        order: section.order,
        updatedAt: section.updatedAt,
      }),
    ),
    ...allSectionBlocks.map((block) => db.tx.sectionBlocks[block.id].update(block)),
    ...financialMetrics.map((metric) => db.tx.financialMetrics[metric.id].update(metric)),
    ...earningsEvents.map((event) => db.tx.earningsEvents[event.id].update(event)),
    ...transcriptNotes.map((note) => db.tx.transcriptNotes[note.id].update(note)),
  ]);

  console.log(`Seeded ${brief.title} (${brief.slug}).`);
};

writeAll().catch((error) => {
  console.error(error);
  process.exit(1);
});
