## Development Note
### 1. Update schema
- after update schema, run migrate
```bash
npx prisma migrate dev --name <details>
```
- if you face this error: Property '<model name>' does not exist on type 'PrismaClient<{ adapter: PrismaPg; }, never, DefaultArgs>'. Press `Ctrl + Shift + P` then typing "Restart Typescript Server" and press Enter. You also can restart VSCode to fix it.

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