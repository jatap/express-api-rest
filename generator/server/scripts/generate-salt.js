const fs = require('fs');
const crypto = require('crypto');

const sampleEnvFile = '.env.sample';
const envFile = '.env';

const sampleEnv = fs.readFileSync(sampleEnvFile, 'utf8');

fs.open(envFile, 'w', (err, fd) => {
  if (err) {
    console.error(err);
    throw err;
  }

  // Replace HASH_SALT
  fs.writeFileSync(
    fd,
    sampleEnv.replace(/YYY/, crypto.randomBytes(64).toString('hex')),
    'utf8',
  );
});
