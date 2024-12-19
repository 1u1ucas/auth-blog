-- Adminer 4.8.1 PostgreSQL 17.2 (Debian 17.2-1.pgdg120+1) dump

DROP TABLE IF EXISTS "post";
DROP SEQUENCE IF EXISTS post_id_seq;
CREATE SEQUENCE post_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."post" (
    "id" integer DEFAULT nextval('post_id_seq') NOT NULL,
    "user_id" integer NOT NULL,
    "title" text NOT NULL,
    "content" text NOT NULL,
    "image_path" text NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "post_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "post_title" UNIQUE ("title")
) WITH (oids = false);

INSERT INTO "post" ("id", "user_id", "title", "content", "image_path", "created_at") VALUES
(9,	12,	'post test',	'test ',	'test',	'2024-12-11 08:41:25.613325'),
(10,	11,	'shigeru myamoto',	'vagabond ',	'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f645c0a9-1e73-4701-9305-a26947ced46b/dcxd9dj-dc03ffb7-1e81-4095-aef3-db8778fd61f2.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcL2Y2NDVjMGE5LTFlNzMtNDcwMS05MzA1LWEyNjk0N2NlZDQ2YlwvZGN4ZDlkai1kYzAzZmZiNy0xZTgxLTQwOTUtYWVmMy1kYjg3NzhmZDYxZjIucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.Nx6P4kevGChyJPnu4lxNtWx-vRBARONM7Sm7iKaojr8',	'2024-12-11 10:26:43.98087'),
(11,	11,	'mon post',	'faire un post',	'post image',	'2024-12-18 11:36:57.168776');

DROP TABLE IF EXISTS "user";
DROP SEQUENCE IF EXISTS user_id_seq;
CREATE SEQUENCE user_id_seq INCREMENT 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1;

CREATE TABLE "public"."user" (
    "id" integer DEFAULT nextval('user_id_seq') NOT NULL,
    "username" text NOT NULL,
    "email" text NOT NULL,
    "password" text NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "user_email" UNIQUE ("email"),
    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
) WITH (oids = false);

INSERT INTO "user" ("id", "username", "email", "password", "created_at") VALUES
(1,	'test username',	'test email',	'test password',	'2024-12-02 13:46:08.854395'),
(2,	'test',	'tset@test.com',	'test',	'2024-12-04 08:35:06.118238'),
(9,	'tsststs',	'sqdgf@qsdfgf.com',	'qeghgj',	'2024-12-04 08:47:01.157233'),
(11,	'lucas',	'lucasleveque17@gmail.com',	'lucas017',	'2024-12-09 10:07:17.936718'),
(12,	'cmoi',	'lucasleveque@gmail.com',	'lucas',	'2024-12-09 10:23:16.411301'),
(16,	'karpenkokarpenko24',	'karpenkokarpenko24@gmail.com',	'lucas017',	'2024-12-09 15:47:59.284269'),
(17,	'test',	'test@test.com',	'test',	'2024-12-18 11:46:59.895658'),
(18,	'Justin',	'justin.pitra@gmail.com',	'hello',	'2024-12-19 08:38:13.872491');

ALTER TABLE ONLY "public"."post" ADD CONSTRAINT "post_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "user"(id) ON UPDATE SET DEFAULT ON DELETE CASCADE NOT DEFERRABLE;

-- 2024-12-19 09:01:07.504926+00
