## Production deployment workflow (using github action)
### 1. CI
- checkout code
- install deps
- run test (optional)
- build image (multi step or not)
- push to registry
### 2. CD
- migrate data
- run bootstrap (init data)
- start app
### 3. post-deployment
- health check
- monitor
- test
- ...