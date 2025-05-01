import { fakerEN_US as faker } from '@faker-js/faker';
import axios from 'axios';
import { config } from 'dotenv';
config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SERVICE_ROLE_KEY;

const supabaseApiUrl = `${supabaseUrl}/rest/v1/projects`;

const seedProjects = async (count = 10) => {
  try {
    const projects = [];

    for (let i = 0; i < count; i++) {
      const name = faker.lorem.words(3);
      projects.push({
        name: name,
        slug: name.toLowerCase().replace(/\s+/g, '-'),
        status: faker.helpers.arrayElement(['in-progress', 'completed']),
        collaborators: faker.helpers.arrayElements([1, 2, 3])
      });
    }

    const response = await axios.post(supabaseApiUrl, projects, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      }
    });

    console.log(`${projects.length} projects inserted successfully:`, response.data);
  } catch (error) {
    console.error('Error inserting projects:', error.response?.data || error.message);
  }
};


seedProjects(10);
