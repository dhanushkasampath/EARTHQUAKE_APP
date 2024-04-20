//in server/create-api-key.js
const client = require('./elasticsearch/client');

//create keys that gives access to elasticsearch cloud instance we created 
async function generateApiKeys(opts) {
  const body = await client.security.createApiKey({
    body: {
      name: 'earthquake_app',
      role_descriptors: {
        earthquakes_example_writer: {
          cluster: ['monitor'],
          index: [
            {
              names: ['earthquakes'],
              privileges: ['create_index', 'write', 'read', 'manage'],
            },
          ],
        },
      },
    },
  });
  return Buffer.from(`${body.id}:${body.api_key}`).toString('base64');
}

generateApiKeys()
  .then(console.log)
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

  //run this file seperately to create api key and place in config/default.json file