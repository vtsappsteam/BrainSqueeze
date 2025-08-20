CREATE TABLE "users" (
	"id" BIGSERIAL NOT NULL UNIQUE,
	"first_name" VARCHAR(255) NOT NULL,
	"last_name" VARCHAR(255) NOT NULL,
	"email" VARCHAR(255) NOT NULL,
	PRIMARY KEY("id")
);

CREATE TABLE "difficulty" (
	"id" SMALLSERIAL NOT NULL UNIQUE,
	"name" VARCHAR(255),
	"min_threshold" SMALLINT,
	"max_threshold" SMALLINT,
	"total_questions" BIGINT,
	PRIMARY KEY("id")
);

CREATE TABLE "categories" (
	"id" BIGSERIAL NOT NULL UNIQUE,
	"name" VARCHAR(255),
	PRIMARY KEY("id")
);