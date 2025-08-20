--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.0

-- Started on 2025-08-18 23:32:37 CEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 221 (class 1259 OID 16552)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    total_questions bigint
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 220 (class 1259 OID 16551)
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.categories_id_seq OWNER TO postgres;

--
-- TOC entry 3407 (class 0 OID 0)
-- Dependencies: 220
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 227 (class 1259 OID 16573)
-- Name: difficulties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.difficulties (
    id bigint NOT NULL,
    name character varying(255),
    min_threshold smallint,
    max_threshold smallint,
    total_questions bigint
);


ALTER TABLE public.difficulties OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 16572)
-- Name: question_weight_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.question_weight_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.question_weight_id_seq OWNER TO postgres;

--
-- TOC entry 3408 (class 0 OID 0)
-- Dependencies: 226
-- Name: question_weight_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.question_weight_id_seq OWNED BY public.difficulties.id;


--
-- TOC entry 225 (class 1259 OID 16561)
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    id bigint NOT NULL,
    question character varying(255) NOT NULL,
    correct_answer character varying(255) NOT NULL,
    wrong_answer_1 character varying(255) NOT NULL,
    wrong_answer_2 character varying(255) NOT NULL,
    wrong_answer_3 character varying(255) NOT NULL,
    times_viewed bigint NOT NULL,
    answered_correctly bigint NOT NULL,
    category_id bigint NOT NULL,
    difficulty_id bigint NOT NULL
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16559)
-- Name: questions_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questions_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.questions_category_id_seq OWNER TO postgres;

--
-- TOC entry 3409 (class 0 OID 0)
-- Dependencies: 223
-- Name: questions_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questions_category_id_seq OWNED BY public.questions.category_id;


--
-- TOC entry 222 (class 1259 OID 16558)
-- Name: questions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.questions_id_seq OWNER TO postgres;

--
-- TOC entry 3410 (class 0 OID 0)
-- Dependencies: 222
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- TOC entry 224 (class 1259 OID 16560)
-- Name: questions_question_weight_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.questions_question_weight_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.questions_question_weight_id_seq OWNER TO postgres;

--
-- TOC entry 3411 (class 0 OID 0)
-- Dependencies: 224
-- Name: questions_question_weight_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questions_question_weight_id_seq OWNED BY public.questions.difficulty_id;


--
-- TOC entry 219 (class 1259 OID 16502)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    role_id smallint NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16500)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3412 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 218 (class 1259 OID 16501)
-- Name: users_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_role_id_seq
    AS smallint
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_role_id_seq OWNER TO postgres;

--
-- TOC entry 3413 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_role_id_seq OWNED BY public.users.role_id;


--
-- TOC entry 3230 (class 2604 OID 16555)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 3234 (class 2604 OID 16576)
-- Name: difficulties id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.difficulties ALTER COLUMN id SET DEFAULT nextval('public.question_weight_id_seq'::regclass);


--
-- TOC entry 3231 (class 2604 OID 16564)
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- TOC entry 3232 (class 2604 OID 16565)
-- Name: questions category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions ALTER COLUMN category_id SET DEFAULT nextval('public.questions_category_id_seq'::regclass);


--
-- TOC entry 3233 (class 2604 OID 16566)
-- Name: questions difficulty_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions ALTER COLUMN difficulty_id SET DEFAULT nextval('public.questions_question_weight_id_seq'::regclass);


--
-- TOC entry 3228 (class 2604 OID 16505)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3229 (class 2604 OID 16506)
-- Name: users role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN role_id SET DEFAULT nextval('public.users_role_id_seq'::regclass);


--
-- TOC entry 3395 (class 0 OID 16552)
-- Dependencies: 221
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories (id, name, total_questions) VALUES (4, 'Nova kategorija test', 3);
INSERT INTO public.categories (id, name, total_questions) VALUES (1, 'Istorija', 7);
INSERT INTO public.categories (id, name, total_questions) VALUES (3, 'Geografija', 3);


--
-- TOC entry 3401 (class 0 OID 16573)
-- Dependencies: 227
-- Data for Name: difficulties; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.difficulties (id, name, min_threshold, max_threshold, total_questions) VALUES (18, 'Hard', 67, 100, 1);
INSERT INTO public.difficulties (id, name, min_threshold, max_threshold, total_questions) VALUES (7, 'Easy', 0, 33, 5);
INSERT INTO public.difficulties (id, name, min_threshold, max_threshold, total_questions) VALUES (9, 'Medium', 34, 66, 4);


--
-- TOC entry 3399 (class 0 OID 16561)
-- Dependencies: 225
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.questions (id, question, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, times_viewed, answered_correctly, category_id, difficulty_id) VALUES (16, 'hhfgh fh fh fh f hf hf. ', 'hfhfhfhf hhhh', 'rrrrrrr rrrrrr', 'tttttt tttttt', 'yyyy yyyyyy', 0, 0, 4, 7);
INSERT INTO public.questions (id, question, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, times_viewed, answered_correctly, category_id, difficulty_id) VALUES (4, 'Testno pitanje 2', 'To', 'no1', 'no2', 'no3', 19, 15, 1, 7);
INSERT INTO public.questions (id, question, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, times_viewed, answered_correctly, category_id, difficulty_id) VALUES (9, 'Test pitanje 1 vue', 'Test tačan odgovor 1 vue', 'Test netačan odgovor 1 vue', 'Test netačan odgovor 1 vue', 'Test netačan odgovor 1 vue', 3, 2, 1, 7);
INSERT INTO public.questions (id, question, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, times_viewed, answered_correctly, category_id, difficulty_id) VALUES (10, 'Prvo pitanje kroz input formu', 'Tacan odgovor input', 'netacan 1', 'netacan 2', 'netacan 3', 152, 123, 1, 9);
INSERT INTO public.questions (id, question, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, times_viewed, answered_correctly, category_id, difficulty_id) VALUES (17, 'hehrhrh', 'erherh', 'erherherh', 'fghfhfgh', 'fghfghfgh', 0, 0, 4, 7);
INSERT INTO public.questions (id, question, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, times_viewed, answered_correctly, category_id, difficulty_id) VALUES (18, 'jtyjtyj edit', 'jtyjtyj', 'tyjtyjtj', 'tyjtyjt', 'tjtyjtjy', 0, 0, 1, 18);
INSERT INTO public.questions (id, question, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, times_viewed, answered_correctly, category_id, difficulty_id) VALUES (3, 'Testno pitanje', 'Tačan odgovor 1', 'Netačan odgovor 1', 'Netačan odgovor 2', 'Netačan odgovor 3', 19, 7, 1, 7);
INSERT INTO public.questions (id, question, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, times_viewed, answered_correctly, category_id, difficulty_id) VALUES (19, 'asdasdasd', 'asdasdad', 'dasdadasd', 'asdasdasd', 'asdasdasdsad', 1, 1, 1, 7);
INSERT INTO public.questions (id, question, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, times_viewed, answered_correctly, category_id, difficulty_id) VALUES (21, 'dfgdgdfgdgdfg', 'dgfdgdgfdgddgd', 'gdgfdgdgdgd', 'dgdgdfdg', 'dgfgdfgfgfdg', 0, 0, 3, 9);
INSERT INTO public.questions (id, question, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, times_viewed, answered_correctly, category_id, difficulty_id) VALUES (22, 'vnbvnnvnvnvn', 'nvbnvbnvnnv', 'vbnvnvbnvn', 'vnvnvbnvn', 'vbnvnvnv', 0, 0, 3, 9);
INSERT INTO public.questions (id, question, correct_answer, wrong_answer_1, wrong_answer_2, wrong_answer_3, times_viewed, answered_correctly, category_id, difficulty_id) VALUES (20, 'yrtyrtyrty edit', 'yrtyrtyrtyrtyrty', 'rtyrtyrty', 'rtyrtyrtyr', 'rtyryryryr', 0, 0, 3, 9);


--
-- TOC entry 3393 (class 0 OID 16502)
-- Dependencies: 219
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users (id, first_name, last_name, email, role_id) VALUES (3, 'Mika', 'Hakinen', 'mika@mail.com', 15);
INSERT INTO public.users (id, first_name, last_name, email, role_id) VALUES (1, 'Pera edit', 'Tester', 'test@test.com', 1);
INSERT INTO public.users (id, first_name, last_name, email, role_id) VALUES (5, 'Laza edit', 'Testerić edit', 'test4edit@test.com', 1);
INSERT INTO public.users (id, first_name, last_name, email, role_id) VALUES (7, 'Žika', 'Testerić33', 'test4@test.com33', 1);
INSERT INTO public.users (id, first_name, last_name, email, role_id) VALUES (12, 'Admin43', 'Admin43', 'admin4@mail.com', 1);
INSERT INTO public.users (id, first_name, last_name, email, role_id) VALUES (24, 'Edit', 'Edit', 'Edit', 1);
INSERT INTO public.users (id, first_name, last_name, email, role_id) VALUES (25, '4', '4', '4', 1);
INSERT INTO public.users (id, first_name, last_name, email, role_id) VALUES (26, '5', '5', '5', 1);
INSERT INTO public.users (id, first_name, last_name, email, role_id) VALUES (27, '6', '6', '6', 1);
INSERT INTO public.users (id, first_name, last_name, email, role_id) VALUES (28, '7', '7', '7', 1);
INSERT INTO public.users (id, first_name, last_name, email, role_id) VALUES (29, '8', '8', '8', 1);


--
-- TOC entry 3414 (class 0 OID 0)
-- Dependencies: 220
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 19, true);


--
-- TOC entry 3415 (class 0 OID 0)
-- Dependencies: 226
-- Name: question_weight_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.question_weight_id_seq', 20, true);


--
-- TOC entry 3416 (class 0 OID 0)
-- Dependencies: 223
-- Name: questions_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questions_category_id_seq', 1, false);


--
-- TOC entry 3417 (class 0 OID 0)
-- Dependencies: 222
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questions_id_seq', 22, true);


--
-- TOC entry 3418 (class 0 OID 0)
-- Dependencies: 224
-- Name: questions_question_weight_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questions_question_weight_id_seq', 1, false);


--
-- TOC entry 3419 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 29, true);


--
-- TOC entry 3420 (class 0 OID 0)
-- Dependencies: 218
-- Name: users_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_role_id_seq', 2, true);


--
-- TOC entry 3238 (class 2606 OID 16557)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 3243 (class 2606 OID 16578)
-- Name: difficulties difficulties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.difficulties
    ADD CONSTRAINT difficulties_pkey PRIMARY KEY (id);


--
-- TOC entry 3241 (class 2606 OID 16570)
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- TOC entry 3236 (class 2606 OID 16510)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3239 (class 1259 OID 16571)
-- Name: questions_index_0; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX questions_index_0 ON public.questions USING btree (question);


--
-- TOC entry 3244 (class 2606 OID 16579)
-- Name: questions questions_categories_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_categories_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- TOC entry 3245 (class 2606 OID 16584)
-- Name: questions questions_difficulties_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_difficulties_id_fkey FOREIGN KEY (difficulty_id) REFERENCES public.difficulties(id);


-- Completed on 2025-08-18 23:32:37 CEST

--
-- PostgreSQL database dump complete
--

