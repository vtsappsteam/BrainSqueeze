--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5 (Debian 17.5-1.pgdg120+1)
-- Dumped by pg_dump version 17.0

-- Started on 2025-09-19 17:16:39 CEST

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
-- TOC entry 220 (class 1259 OID 16552)
-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    id bigint NOT NULL,
    name character varying(255) NOT NULL,
    total_questions bigint,
    eng_name character varying(255)
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16551)
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
-- TOC entry 3404 (class 0 OID 0)
-- Dependencies: 219
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- TOC entry 226 (class 1259 OID 16573)
-- Name: difficulties; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.difficulties (
    id bigint NOT NULL,
    name character varying(255),
    min_threshold smallint,
    max_threshold smallint,
    total_questions bigint,
    eng_name character varying(255)
);


ALTER TABLE public.difficulties OWNER TO postgres;

--
-- TOC entry 225 (class 1259 OID 16572)
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
-- TOC entry 3405 (class 0 OID 0)
-- Dependencies: 225
-- Name: question_weight_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.question_weight_id_seq OWNED BY public.difficulties.id;


--
-- TOC entry 224 (class 1259 OID 16561)
-- Name: questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.questions (
    id bigint NOT NULL,
    question text NOT NULL,
    correct_answer character varying(255) NOT NULL,
    wrong_answer_1 character varying(255) NOT NULL,
    wrong_answer_2 character varying(255) NOT NULL,
    wrong_answer_3 character varying(255) NOT NULL,
    times_viewed bigint NOT NULL,
    answered_correctly bigint NOT NULL,
    category_id bigint NOT NULL,
    difficulty_id bigint NOT NULL,
    eng_question text,
    eng_correct_answer character varying(255),
    eng_wrong_answer_1 character varying(255),
    eng_wrong_answer_2 character varying(255),
    eng_wrong_answer_3 character varying(255),
    created_at timestamp with time zone
);


ALTER TABLE public.questions OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 16559)
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
-- TOC entry 3406 (class 0 OID 0)
-- Dependencies: 222
-- Name: questions_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questions_category_id_seq OWNED BY public.questions.category_id;


--
-- TOC entry 221 (class 1259 OID 16558)
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
-- TOC entry 3407 (class 0 OID 0)
-- Dependencies: 221
-- Name: questions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questions_id_seq OWNED BY public.questions.id;


--
-- TOC entry 223 (class 1259 OID 16560)
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
-- TOC entry 3408 (class 0 OID 0)
-- Dependencies: 223
-- Name: questions_question_weight_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.questions_question_weight_id_seq OWNED BY public.questions.difficulty_id;


--
-- TOC entry 218 (class 1259 OID 16502)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id bigint NOT NULL,
    first_name character varying(255) NOT NULL,
    last_name character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying,
    password_change_needed boolean,
    refresh_token character varying
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
-- TOC entry 3409 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 3228 (class 2604 OID 16555)
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- TOC entry 3232 (class 2604 OID 16576)
-- Name: difficulties id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.difficulties ALTER COLUMN id SET DEFAULT nextval('public.question_weight_id_seq'::regclass);


--
-- TOC entry 3229 (class 2604 OID 16564)
-- Name: questions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions ALTER COLUMN id SET DEFAULT nextval('public.questions_id_seq'::regclass);


--
-- TOC entry 3230 (class 2604 OID 16565)
-- Name: questions category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions ALTER COLUMN category_id SET DEFAULT nextval('public.questions_category_id_seq'::regclass);


--
-- TOC entry 3231 (class 2604 OID 16566)
-- Name: questions difficulty_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions ALTER COLUMN difficulty_id SET DEFAULT nextval('public.questions_question_weight_id_seq'::regclass);


--
-- TOC entry 3227 (class 2604 OID 16505)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3392 (class 0 OID 16552)
-- Dependencies: 220
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.categories VALUES (1, 'Istorija', 0, 'History');
INSERT INTO public.categories VALUES (2, 'Geografija', 0, 'Geography');


--
-- TOC entry 3398 (class 0 OID 16573)
-- Dependencies: 226
-- Data for Name: difficulties; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.difficulties VALUES (3, 'Teško', 67, 100, 5, 'Hard');
INSERT INTO public.difficulties VALUES (1, 'Lako', 0, 33, 7, 'Easy');
INSERT INTO public.difficulties VALUES (2, 'Srednje', 34, 66, 22, 'Medium');


--
-- TOC entry 3396 (class 0 OID 16561)
-- Dependencies: 224
-- Data for Name: questions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3390 (class 0 OID 16502)
-- Dependencies: 218
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, 'VTŠ Apps Tim', 'Admin', 'admin@vtsappstim.edu.rs', '$2b$10$vU//JgRJHf5cPVB23BddoOaWEp6wKjLF3DMqoiMPm5oyqVDHIS.LG', false, '$2b$10$7t/8h0gfn7od4oWXNPdpIeu8dEw90WUvCysEu8pNQkoR0O8s1hP3K');


--
-- TOC entry 3410 (class 0 OID 0)
-- Dependencies: 219
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_id_seq', 29, true);


--
-- TOC entry 3411 (class 0 OID 0)
-- Dependencies: 225
-- Name: question_weight_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.question_weight_id_seq', 20, true);


--
-- TOC entry 3412 (class 0 OID 0)
-- Dependencies: 222
-- Name: questions_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questions_category_id_seq', 1, false);


--
-- TOC entry 3413 (class 0 OID 0)
-- Dependencies: 221
-- Name: questions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questions_id_seq', 149, true);


--
-- TOC entry 3414 (class 0 OID 0)
-- Dependencies: 223
-- Name: questions_question_weight_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.questions_question_weight_id_seq', 1, false);


--
-- TOC entry 3415 (class 0 OID 0)
-- Dependencies: 217
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 42, true);


--
-- TOC entry 3236 (class 2606 OID 16557)
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- TOC entry 3241 (class 2606 OID 16578)
-- Name: difficulties difficulties_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.difficulties
    ADD CONSTRAINT difficulties_pkey PRIMARY KEY (id);


--
-- TOC entry 3239 (class 2606 OID 16570)
-- Name: questions questions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_pkey PRIMARY KEY (id);


--
-- TOC entry 3234 (class 2606 OID 16510)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 3237 (class 1259 OID 16594)
-- Name: questions_index_0; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX questions_index_0 ON public.questions USING btree (question);


--
-- TOC entry 3242 (class 2606 OID 16579)
-- Name: questions questions_categories_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_categories_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id);


--
-- TOC entry 3243 (class 2606 OID 16584)
-- Name: questions questions_difficulties_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.questions
    ADD CONSTRAINT questions_difficulties_id_fkey FOREIGN KEY (difficulty_id) REFERENCES public.difficulties(id);


-- Completed on 2025-09-19 17:16:39 CEST

--
-- PostgreSQL database dump complete
--

