# LearnFrench Backend (Spring Boot + PostgreSQL)

## Run with PostgreSQL (checklist)

1. **Start PostgreSQL**  
   - Windows: start the "PostgreSQL" service (Services app or `pg_ctl`), or run `pg_ctl -D "C:\Program Files\PostgreSQL\<version>\data" start` if you use a custom data dir.  
   - Ensure it listens on `localhost:5432`.

2. **Create the database and run the schema** (first time only) — see section 2 below.

3. **Match the DB password** for user `postgres` with `application.properties`:  
   - The app uses `spring.datasource.password=postgres` by default.  
   - Set the same password in PostgreSQL (WSL/Linux):
     ```bash
     sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'postgres';"
     ```
   - Or set your own password in PostgreSQL, then set **the same value** in `src/main/resources/application.properties` as `spring.datasource.password=...`.

4. **Run the app** (no profile = PostgreSQL):
   ```bash
   cd backend
   mvn clean package
   java -jar target/learnfrench-backend-0.0.1-SNAPSHOT.jar
   ```
   Or: `mvn spring-boot:run`

---

## How to run the backend

### 1. Prerequisites

- **Java 17** or higher (`java -version`)
- **Maven** (or use the included wrapper `mvnw`)
- **PostgreSQL** installed and running (for full setup; see step 2)

### 2. Create the database and tables (first time only)

**WSL / Linux:** If `psql` is not found, install the PostgreSQL client (and optionally the server):
   ```bash
   sudo apt update
   sudo apt install postgresql-client   # only psql, to connect to an existing server
   # Or install server + client:  sudo apt install postgresql postgresql-client
   ```
   If you installed the server in WSL, start it: `sudo service postgresql start`.

1. Create a database named `learnfrench` in PostgreSQL (e.g. in `psql` or pgAdmin):
   ```sql
   CREATE DATABASE learnfrench;
   ```
   From the shell (run from the **backend** folder):
   ```bash
   psql -U postgres -c "CREATE DATABASE learnfrench;"
   ```
   **WSL/Linux "Peer authentication failed":** use the system `postgres` user so the OS user matches:
   ```bash
   sudo -u postgres psql -c "CREATE DATABASE learnfrench;"
   sudo -u postgres psql -d learnfrench -f src/main/resources/schema.sql
   ```
2. Run the schema to create tables (from the **backend** folder). If not using `sudo -u postgres`:
   ```bash
   psql -U postgres -d learnfrench -f src/main/resources/schema.sql
   ```
   Or open `src/main/resources/schema.sql` in your DB tool and execute it.

### 3. Configure database credentials

Edit `src/main/resources/application.properties` and set your PostgreSQL username and password:

```properties
spring.datasource.username=postgres
spring.datasource.password=your_actual_password
```

(If PostgreSQL is on another host or port, change `spring.datasource.url` too.)

### 4. Start the backend

From the **backend** folder:

**With Maven wrapper (Windows):**
```bash
cd backend
.\mvnw.cmd spring-boot:run
```

**With Maven wrapper (Linux/macOS or WSL):**
```bash
cd backend
./mvnw spring-boot:run
```

**If you have Maven installed globally:**
```bash
cd backend
mvn spring-boot:run
```
mvn clean package
java -jar target/learnfrench-backend-0.0.1-SNAPSHOT.jar

When it starts, you should see something like: `Started LearnFrenchApplication in ... seconds`.

### 5. Check it’s running

Open in a browser or with curl:

- **http://localhost:8080/api/health**

You should get: `{"status":"UP","app":"LearnFrench Backend"}`.

---

## Database schema (reference)

| Table | Purpose |
|-------|--------|
| **users** | name, email (login + password recovery), password_hash, email_verified |
| **vocabulary_lists** | User's lists; each has a **name** and belongs to a user |
| **list_words** | 10–50 French words per list (`french_word`, `position` 1–50) |
| **user_list_progress** | Progress per user per list (`progress_percent`, `words_mastered`, `last_practiced_at`) |

---

## Frontend auth (current)

- Login/Logout are in-memory and stored in `localStorage` until you connect to the backend.
- When ready: replace the mock login in `LoginPage.jsx` with a `POST /api/auth/login` (email + password); backend returns user + token; frontend stores token and user.
