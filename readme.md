# Docker Secrets or dotenv

Reads values from docker secrets or from dotenv.


If `NODE_ENV` is `production` it reads each secret from `/run/secrets/SECRET_NAME` otherwise falls back to local `.env` file

## Usage

```
const dockerSecret = require('@stendahls/docker-secrets-or-dotenv');

const SLACK_WEBHOOK_URL = dockerSecret('SLACK_WEBHOOK');
```