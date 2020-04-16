const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const sampleEnvFile = '.env.sample';
const envFile = '.env';

const sampleEnv = fs.readFileSync(sampleEnvFile, 'utf8');

fs.open(envFile, 'w', (err, fd) => {
  if (err) {
    console.error(err);
    throw err;
  }

  // Replace HASH_SALT
  fs.writeFileSync(fd, sampleEnv.replace(/XXX/, uuidv4()), 'utf8');
});
