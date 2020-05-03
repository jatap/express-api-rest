db = db.getSiblingDB('XXX');

db.createUser({
  user: 'CCC',
  pwd: 'DDD',
  roles: ['readWrite'],
});
