-- LearnFrench - PostgreSQL schema for Spring Boot
-- Run this when setting up your database (or use Flyway/Liquibase).

-- Users: email is the main identifier and used for login + password recovery
CREATE TABLE IF NOT EXISTS users (
    id              BIGSERIAL PRIMARY KEY,
    email           VARCHAR(255) NOT NULL UNIQUE,
    name            VARCHAR(255) NOT NULL,
    password_hash   VARCHAR(255) NOT NULL,
    email_verified  BOOLEAN NOT NULL DEFAULT FALSE,
    created_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at      TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);

-- Vocabulary lists: each list belongs to a user and has a name (10–50 words per list)
CREATE TABLE IF NOT EXISTS vocabulary_lists (
    id          BIGSERIAL PRIMARY KEY,
    user_id     BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    name        VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_vocabulary_lists_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX idx_vocabulary_lists_user_id ON vocabulary_lists(user_id);

-- Words in each list: 10–50 French words per list
CREATE TABLE IF NOT EXISTS list_words (
    id                  BIGSERIAL PRIMARY KEY,
    list_id             BIGINT NOT NULL REFERENCES vocabulary_lists(id) ON DELETE CASCADE,
    french_word         VARCHAR(255) NOT NULL,
    position            INT NOT NULL CHECK (position >= 1 AND position <= 50),
    created_at          TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_list_words_list FOREIGN KEY (list_id) REFERENCES vocabulary_lists(id) ON DELETE CASCADE,
    CONSTRAINT uq_list_position UNIQUE (list_id, position)
);

CREATE INDEX idx_list_words_list_id ON list_words(list_id);

-- Optional: add English translation later if needed
-- ALTER TABLE list_words ADD COLUMN english_translation VARCHAR(255);

-- User progress per list (progress of each list for each user)
CREATE TABLE IF NOT EXISTS user_list_progress (
    id                  BIGSERIAL PRIMARY KEY,
    user_id             BIGINT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    list_id             BIGINT NOT NULL REFERENCES vocabulary_lists(id) ON DELETE CASCADE,
    progress_percent    INT NOT NULL DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
    words_mastered     INT NOT NULL DEFAULT 0,
    last_practiced_at   TIMESTAMP WITH TIME ZONE,
    created_at         TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at         TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_progress_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_progress_list FOREIGN KEY (list_id) REFERENCES vocabulary_lists(id) ON DELETE CASCADE,
    CONSTRAINT uq_user_list_progress UNIQUE (user_id, list_id)
);

CREATE INDEX idx_user_list_progress_user_id ON user_list_progress(user_id);
CREATE INDEX idx_user_list_progress_list_id ON user_list_progress(list_id);
