const admin_api_port = 5000;

const DATE_FORMAT = 'YYYY-MM-DD HH:mm Z';

const AWS_BUCKET = process.env.AWS_BUCKET || ""
const AWS_REGION = process.env.AWS_REGION || ""
const AWS_IDENTITY_POOL_ID = process.env.AWS_IDENTITY_POOL_ID || ""
const AWS_ACCESS_KEY_ID = process.env.AWS_ACCESS_KEY_ID || ""
const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY || ""

const DB_HOSTS = process.env.DB_HOSTS || "localhost:27017"
const DB_REPLICA_SET = process.env.DB_REPLICA_SET || ""
const ADMIN_DB_USER = process.env.ADMIN_DB_USER || ""
const ADMIN_DB_PASS = process.env.ADMIN_DB_PASS || ""
const ADMIN_DB_NAME = process.env.ADMIN_DB_NAME || ""
const DB_SSL = process.env.DB_SSL || true

const AWS_PUBLIC = {
  "AWS_BUCKET" : AWS_BUCKET,
  "AWS_REGION" : AWS_REGION,
};

const AWS_CONFIG = Object.assign({}, AWS_PUBLIC, {
  "AWS_IDENTITY_POOL_ID" : AWS_IDENTITY_POOL_ID,
  "AWS_ACCESS_KEY_ID" : AWS_ACCESS_KEY_ID,
  "AWS_SECRET_ACCESS_KEY" : AWS_SECRET_ACCESS_KEY
});

module.exports = {
  apps: [
    {
      "name": "admin-api",
      "script": "server.js",
      "log_date_format" : DATE_FORMAT,
      "env": Object.assign({}, AWS_CONFIG, {
        "NODE_ENV": "development",
        "PORT": admin_api_port,
        "ADMIN_DB_NAME": "phylex-admin",
        "PUBLIC_DB_NAME": "phylex-public"
      }),
      'env_production': Object.assign({}, AWS_CONFIG, {
        "DB_HOSTS": DB_HOSTS,
        "ADMIN_DB_USER": ADMIN_DB_USER,
        "ADMIN_DB_PASS": ADMIN_DB_PASS,
        "ADMIN_DB_NAME": ADMIN_DB_NAME,
        "DB_REPLICA_SET": DB_REPLICA_SET,
        "DB_SSL": DB_SSL,
        "DB_AUTH_SOURCE": "admin",
        "NODE_ENV": "production",
        "PORT": admin_api_port
      })
    },
  ]
};
