# Ticketing System (Spring Boot + Next.js)

This repository contains two folders:
- backend: Java Spring Boot REST API using PostgreSQL
- frontend: Next.js React frontend connecting via JWT

## Quick start (local)
1. Ensure Docker is installed and run `docker-compose up -d` to start PostgreSQL.
2. Backend:
   - cd backend
   - mvn clean package
   - mvn spring-boot:run
3. Frontend:
   - cd frontend
   - npm install
   - npm run dev

Default admin user: `admin` / `adminpass`.

This scaffold provides the core features:
- JWT auth, role-based access
- Users can create tickets, add comments, view own tickets
- Admin panel to view users and tickets

This is a scaffold for a working system; you should harden security, add validation, and expand features for production.
