import { fakerEN_US as faker } from '@faker-js/faker';
import axios from 'axios';
import { config } from 'dotenv';

config(); // تحميل متغيرات البيئة من ملف .env

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SERVICE_ROLE_KEY;

const headers = {
  'apikey': supabaseKey,
  'Authorization': `Bearer ${supabaseKey}`,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation',
};

const logErrorAndExit = (tableName, error) => {
  const msg = error?.response?.data?.message || error.message || error;
  console.error(`An error occurred in table '${tableName}': ${msg}`);
  process.exit(1);
};

const logStep = (stepMessage) => {
  console.log(stepMessage);
};

const seedProjects = async (numEntries) => {
  logStep('Seeding projects...');
  const projects = [];

  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3);

    projects.push({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      description : faker.lorem.paragraph(2),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([1, 2, 3]),
    });
  }

  try {
    const response = await axios.post(
      `${supabaseUrl}/rest/v1/projects`,
      projects,
      { headers }
    );

    logStep('Projects seeded successfully.');
    return response.data; // يحتوي على بيانات المشاريع (مع id)
  } catch (error) {
    logErrorAndExit('Projects', error);
  }
};

const seedTasks = async (numEntries, projectIds) => {
  logStep('Seeding tasks...');
  const tasks = [];

  for (let i = 0; i < numEntries; i++) {
    tasks.push({
      name: faker.lorem.words(3),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      description: faker.lorem.paragraph(),
      due_date: faker.date.future().toISOString(),
      project_id: faker.helpers.arrayElement(projectIds),
      collaborators: faker.helpers.arrayElements([1, 2, 3]),
    });
  }

  try {
    const response = await axios.post(
      `${supabaseUrl}/rest/v1/tasks`,
      tasks,
      { headers }
    );

    logStep('Tasks seeded successfully.');
    return response.data;
  } catch (error) {
    logErrorAndExit('Tasks', error);
  }
};

const seedDatabase = async (numEntriesPerTable) => {
  const projects = await seedProjects(numEntriesPerTable);
  const projectIds = projects.map((p) => p.id);
  await seedTasks(numEntriesPerTable, projectIds);
};

const numEntriesPerTable = 10;
seedDatabase(numEntriesPerTable);
