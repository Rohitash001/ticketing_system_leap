# Ticketing Backend (Spring Boot)

## Quick start

1. Ensure PostgreSQL is running (db `ticketing`, user `postgres` / password `postgres`) or edit `application.properties`.
2. Build: `mvn clean package`
3. Run: `mvn spring-boot:run` or run the generated jar.
4. An admin user is created at startup: username `admin` password `adminpass`.

APIs:
- POST /api/auth/register {username,password}
- POST /api/auth/login {username,password}
- /api/tickets -> CRUD operations (authenticated)
- /api/admin -> admin-only endpoints
