const { GraphQLClient, gql } = require('graphql-request');

// Test Jobs query against backend
async function testJobsQuery() {
  // Change this to your EC2 backend URL to test
  const endpoint = process.env.BACKEND_URL || 'http://localhost:3001/api/graphql';

  const client = new GraphQLClient(endpoint);

  const query = gql`
    query TestJobsQuery {
      Jobs(where: { status: { equals: "active" } }, limit: 100) {
        docs {
          id
          title
          location
          description
          status
        }
        totalDocs
      }
    }
  `;

  try {
    console.log(`🔍 Testing GraphQL endpoint: ${endpoint}\n`);

    const data = await client.request(query);

    console.log('✅ SUCCESS! Jobs query works.\n');
    console.log(`Total active jobs: ${data.Jobs.totalDocs}`);
    console.log('\nJobs found:');
    console.log(JSON.stringify(data.Jobs.docs, null, 2));

  } catch (error) {
    console.error('❌ ERROR! Jobs query failed.\n');
    console.error('Error details:', error.message);

    if (error.response) {
      console.error('\nGraphQL Response:', JSON.stringify(error.response, null, 2));
    }

    if (error.request) {
      console.error('\nGraphQL Request:', error.request.query);
    }
  }
}

testJobsQuery();
