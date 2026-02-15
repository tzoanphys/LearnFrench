# LearnFrench Backend (Spring Boot + PostgreSQL)

## How to run the backend

### 1. Prerequisites

- **Java 17** or higher (`java -version`)
- **Maven** (or use the included wrapper `mvnw`)
- **PostgreSQL** installed and running (for full setup; see step 2)

### 2. Create the database and tables (first time only)

1. Create a database named `learnfrench` in PostgreSQL (e.g. in `psql` or pgAdmin):
   ```sql
   CREATE DATABASE learnfrench;
   ```
2. Run the schema to create tables (from the project root or from `backend`):
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
