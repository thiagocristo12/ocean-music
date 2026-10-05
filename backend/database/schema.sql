-- ============================================================
-- Ocean Music — Schema do banco de dados (PostgreSQL)
-- Criado na Etapa 12. Ligado à aplicação na Etapa 13.
-- ============================================================

-- Necessário para gen_random_uuid()
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ========== Autenticação ==========

CREATE TABLE users (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name          varchar(120) NOT NULL,
  email         varchar(255) NOT NULL,
  password_hash text NOT NULL,
  created_at    timestamptz NOT NULL DEFAULT now()
);
-- Garante e-mail único mesmo com maiúsculas/minúsculas diferentes
-- (a mesma checagem que authService.register() já fazia com .toLowerCase())
CREATE UNIQUE INDEX users_email_lower_key ON users (lower(email));

CREATE TABLE sessions (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  expires_at timestamptz NOT NULL
);
CREATE INDEX sessions_user_id_idx ON sessions (user_id);

-- ========== Catálogo (vocabulário fixo) ==========

CREATE TABLE areas (
  id       smallserial PRIMARY KEY,
  slug     text NOT NULL UNIQUE,
  name     text NOT NULL,
  position smallint NOT NULL DEFAULT 0
);

CREATE TABLE styles (
  id       smallserial PRIMARY KEY,
  slug     text NOT NULL UNIQUE,
  name     text NOT NULL,
  position smallint NOT NULL DEFAULT 0
);

CREATE TABLE goals (
  id       smallserial PRIMARY KEY,
  slug     text NOT NULL UNIQUE,
  name     text NOT NULL,
  area_id  smallint NOT NULL REFERENCES areas(id),
  position smallint NOT NULL DEFAULT 0
);

-- ========== Perfil musical ==========

CREATE TABLE profiles (
  user_id                 uuid PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  level                   text NOT NULL CHECK (level IN ('beginner', 'intermediate')),
  prior_experience        text NOT NULL CHECK (prior_experience IN ('none', 'some', 'regular')),
  onboarding_completed_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE profile_areas (
  user_id  uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  area_id  smallint NOT NULL REFERENCES areas(id),
  priority smallint NOT NULL CHECK (priority BETWEEN 1 AND 3),
  PRIMARY KEY (user_id, area_id),
  UNIQUE (user_id, priority)
);

CREATE TABLE profile_goals (
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  goal_id smallint NOT NULL REFERENCES goals(id),
  PRIMARY KEY (user_id, goal_id)
);

CREATE TABLE profile_styles (
  user_id  uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  style_id smallint NOT NULL REFERENCES styles(id),
  PRIMARY KEY (user_id, style_id)
);

-- ========== Conteúdo (trilhas) ==========

CREATE TABLE tracks (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug           text NOT NULL UNIQUE,
  title          text NOT NULL,
  area_id        smallint NOT NULL REFERENCES areas(id),
  level          text NOT NULL CHECK (level IN ('beginner', 'intermediate')),
  total_lessons  smallint NOT NULL,
  position       smallint NOT NULL DEFAULT 0
);

CREATE TABLE track_goals (
  track_id uuid NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  goal_id  smallint NOT NULL REFERENCES goals(id),
  PRIMARY KEY (track_id, goal_id)
);

CREATE TABLE track_styles (
  track_id uuid NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  style_id smallint NOT NULL REFERENCES styles(id),
  PRIMARY KEY (track_id, style_id)
);

CREATE TABLE stages (
  id       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  track_id uuid NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  slug     text NOT NULL,
  title    text NOT NULL,
  position smallint NOT NULL,
  UNIQUE (track_id, slug),
  UNIQUE (track_id, position)
);

CREATE TABLE lessons (
  id       uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stage_id uuid NOT NULL REFERENCES stages(id) ON DELETE CASCADE,
  slug     text NOT NULL,
  title    text NOT NULL,
  position smallint NOT NULL,
  -- Blocos de conteúdo (texto, dica...), no mesmo formato que já existe
  -- em exerciseContent.js: [{ type: 'text', title, body }, ...]
  content  jsonb NOT NULL DEFAULT '[]',
  UNIQUE (stage_id, slug),
  UNIQUE (stage_id, position)
);

CREATE TABLE exercises (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id   uuid NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  key         text NOT NULL,
  position    smallint NOT NULL,
  type        text NOT NULL, -- sem CHECK de propósito: novos tipos entram sem migração (registry no front)
  prompt      text NOT NULL,
  payload     jsonb NOT NULL DEFAULT '{}', -- dados públicos (opções, etc.)
  solution    jsonb NOT NULL,              -- resposta certa — NUNCA enviado ao cliente
  explanation text NOT NULL,
  UNIQUE (lesson_id, key),
  UNIQUE (lesson_id, position)
);

-- ========== Progresso do usuário ==========

CREATE TABLE user_track_progress (
  user_id          uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  track_id         uuid NOT NULL REFERENCES tracks(id) ON DELETE CASCADE,
  completed_lessons smallint NOT NULL DEFAULT 0,
  updated_at       timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, track_id)
);

CREATE TABLE user_lesson_scores (
  user_id            uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  lesson_id          uuid NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  best_score_percent smallint NOT NULL CHECK (best_score_percent BETWEEN 0 AND 100),
  updated_at         timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, lesson_id)
);

CREATE TABLE user_daily_activity (
  user_id       uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  activity_date date NOT NULL,
  PRIMARY KEY (user_id, activity_date)
);