import { fakerEN_US as faker } from '@faker-js/faker';
import axios from 'axios';
import { config } from 'dotenv';

config(); // لتحميل متغيرات البيئة من ملف .env

const supabaseUrl = process.env.VITE_SUPABASE_URL; // URL من .env
const supabaseKey = process.env.SERVICE_ROLE_KEY; // API Key من .env

const supabaseApiUrl = `${supabaseUrl}/rest/v1/projects`; // مسار API للجدول 'projects'

const logErrorAndExit = (tableName, error) => {
  console.error(
    `An error occurred in table '${tableName}' with code ${error.code}: ${error.message}`
  );
  process.exit(1);
}

const logStep = (stepMessage) => {
  console.log(stepMessage);
}

const seedProjects = async (numEntries) => {
  logStep('Seeding projects...');
  const projects = [];

  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3);

    projects.push({
      name: name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: faker.helpers.arrayElements([1, 2, 3]),
    });
  }

  try {
    const response = await axios.post(supabaseApiUrl, projects, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
    });

    logStep('Projects seeded successfully.');
    return response.data; // البيانات المدخلة
  } catch (error) {
    logErrorAndExit('Projects', error);
  }
};

const seedDatabase = async (numEntriesPerTable) => {
  await seedProjects(numEntriesPerTable);
};

const numEntriesPerTable = 10;

seedDatabase(numEntriesPerTable);
