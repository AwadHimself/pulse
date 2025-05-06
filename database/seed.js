import { fakerEN_US as faker } from '@faker-js/faker'
import axios from 'axios'
import { config } from 'dotenv'

config() // تحميل متغيرات البيئة من ملف .env

const supabaseUrl = process.env.VITE_SUPABASE_URL
const supabaseKey = process.env.SERVICE_ROLE_KEY
const testingUserEmail = process.env.TESTING_USER_EMAIL

if (!testingUserEmail) {
  console.error('Have you forgot to add TESTING_USER_EMAIL to your .env file?')
  process.exit(1)
}

const headers = {
  apikey: supabaseKey,
  Authorization: `Bearer ${supabaseKey}`,
  'Content-Type': 'application/json',
  Prefer: 'return=representation',
}

const logErrorAndExit = (tableName, error) => {
  const msg = error?.response?.data?.message || error.message || error
  console.error(`An error occurred in table '${tableName}': ${msg}`)
  process.exit(1)
}

const logStep = (stepMessage) => {
  console.log(stepMessage)
}

// التأكد من وجود المستخدم الأساسي
const checkPrimaryTestUser = async () => {
  logStep('Checking if primary test user exists...')
  try {
    const { data } = await axios.get(
      `${supabaseUrl}/rest/v1/profiles?username=eq.testaccount1&select=id,username`,
      { headers }
    )

    if (data.length === 0) {
      console.log('Primary test user not found. Will create one.')
      return null
    }

    logStep('Primary test user is found.')
    return data[0].id
  } catch (error) {
    logErrorAndExit('profiles (checking user)', error)
  }
}

// إنشاء المستخدم الأساسي (بافتراض أن المستخدم غير مفعل عبر الواجهة)
const createPrimaryTestUser = async () => {
  logStep('Creating primary test user...')
  const firstName = 'Test'
  const lastName = 'Account'
  const userName = 'testaccount1'

  try {
    const { data } = await axios.post(
      `${supabaseUrl}/auth/v1/admin/users`,
      {
        email: testingUserEmail,
        password: 'password',
        email_confirm: true,
        user_metadata: {
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`,
          username: userName,
        },
      },
      {
        headers: {
          ...headers,
          Authorization: `Bearer ${supabaseKey}`,
        },
      }
    )

    const userId = data.id

    // إضافة بيانات المستخدم إلى جدول profiles
    await axios.post(
      `${supabaseUrl}/rest/v1/profiles`,
      {
        id: userId,
        full_name: `${firstName} ${lastName}`,
        username: userName,
        bio: 'The main testing account',
        avatar_url: `https://i.pravatar.cc/150?u=${userId}`,
      },
      { headers }
    )

    logStep('Primary test user created successfully.')
    return userId
  } catch (error) {
    logErrorAndExit('Users/profiles', error)
  }
}

const seedProjects = async (numEntries, userId) => {
  logStep('Seeding projects...')
  const projects = []

  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(3)

    projects.push({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      description: faker.lorem.paragraph(2),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      collaborators: [userId],
    })
  }

  try {
    const response = await axios.post(
      `${supabaseUrl}/rest/v1/projects`,
      projects,
      { headers }
    )
    logStep('Projects seeded successfully.')
    return response.data
  } catch (error) {
    logErrorAndExit('Projects', error)
  }
}

const seedTasks = async (numEntries, projectIds, userId) => {
  logStep('Seeding tasks...')
  const tasks = []

  for (let i = 0; i < numEntries; i++) {
    tasks.push({
      name: faker.lorem.words(3),
      status: faker.helpers.arrayElement(['in-progress', 'completed']),
      description: faker.lorem.paragraph(),
      due_date: faker.date.future().toISOString(),
      project_id: faker.helpers.arrayElement(projectIds),
      profile_id: userId,
      collaborators: [userId],
    })
  }

  try {
    const response = await axios.post(
      `${supabaseUrl}/rest/v1/tasks`,
      tasks,
      { headers }
    )
    logStep('Tasks seeded successfully.')
    return response.data
  } catch (error) {
    logErrorAndExit('Tasks', error)
  }
}

const seedDatabase = async (numEntriesPerTable) => {
  let userId = await checkPrimaryTestUser()
  if (!userId) {
    userId = await createPrimaryTestUser()
  }

  const projects = await seedProjects(numEntriesPerTable, userId)
  const projectIds = projects.map((p) => p.id)
  await seedTasks(numEntriesPerTable, projectIds, userId)
}

const numEntriesPerTable = 10
seedDatabase(numEntriesPerTable)
