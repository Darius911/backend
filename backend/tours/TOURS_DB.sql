--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4
-- Dumped by pg_dump version 16.4

-- Started on 2025-02-24 06:32:45

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
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
-- TOC entry 222 (class 1259 OID 24926)
-- Name: bookings; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bookings (
    id integer NOT NULL,
    user_id integer,
    tour_date_id integer,
    status character varying(50)
);


ALTER TABLE public.bookings OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 24925)
-- Name: bookings_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bookings_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bookings_id_seq OWNER TO postgres;

--
-- TOC entry 4888 (class 0 OID 0)
-- Dependencies: 221
-- Name: bookings_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bookings_id_seq OWNED BY public.bookings.id;


--
-- TOC entry 224 (class 1259 OID 24943)
-- Name: reviews; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reviews (
    id integer NOT NULL,
    user_id integer,
    tour_id integer,
    rating integer,
    comment text,
    CONSTRAINT reviews_rating_check CHECK (((rating >= 0) AND (rating <= 5)))
);


ALTER TABLE public.reviews OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 24942)
-- Name: reviews_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reviews_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reviews_id_seq OWNER TO postgres;

--
-- TOC entry 4889 (class 0 OID 0)
-- Dependencies: 223
-- Name: reviews_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reviews_id_seq OWNED BY public.reviews.id;


--
-- TOC entry 220 (class 1259 OID 24914)
-- Name: tour_dates; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tour_dates (
    id integer NOT NULL,
    tour_id integer,
    date date NOT NULL
);


ALTER TABLE public.tour_dates OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 24913)
-- Name: tour_dates_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tour_dates_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tour_dates_id_seq OWNER TO postgres;

--
-- TOC entry 4890 (class 0 OID 0)
-- Dependencies: 219
-- Name: tour_dates_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tour_dates_id_seq OWNED BY public.tour_dates.id;


--
-- TOC entry 218 (class 1259 OID 24900)
-- Name: tours; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tours (
    id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    image_url character varying(255),
    duration character varying(100),
    price numeric(10,2),
    category character varying(50),
    created_by integer
);


ALTER TABLE public.tours OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 24899)
-- Name: tours_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tours_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tours_id_seq OWNER TO postgres;

--
-- TOC entry 4891 (class 0 OID 0)
-- Dependencies: 217
-- Name: tours_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tours_id_seq OWNED BY public.tours.id;


--
-- TOC entry 216 (class 1259 OID 24891)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(50) NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 24890)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4892 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4711 (class 2604 OID 24929)
-- Name: bookings id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings ALTER COLUMN id SET DEFAULT nextval('public.bookings_id_seq'::regclass);


--
-- TOC entry 4712 (class 2604 OID 24946)
-- Name: reviews id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews ALTER COLUMN id SET DEFAULT nextval('public.reviews_id_seq'::regclass);


--
-- TOC entry 4710 (class 2604 OID 24917)
-- Name: tour_dates id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_dates ALTER COLUMN id SET DEFAULT nextval('public.tour_dates_id_seq'::regclass);


--
-- TOC entry 4709 (class 2604 OID 24903)
-- Name: tours id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tours ALTER COLUMN id SET DEFAULT nextval('public.tours_id_seq'::regclass);


--
-- TOC entry 4708 (class 2604 OID 24894)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4880 (class 0 OID 24926)
-- Dependencies: 222
-- Data for Name: bookings; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 4882 (class 0 OID 24943)
-- Dependencies: 224
-- Data for Name: reviews; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.reviews VALUES (2, NULL, 28, 1, NULL);
INSERT INTO public.reviews VALUES (4, NULL, 30, 0, NULL);
INSERT INTO public.reviews VALUES (5, NULL, 31, 0, NULL);


--
-- TOC entry 4878 (class 0 OID 24914)
-- Dependencies: 220
-- Data for Name: tour_dates; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tour_dates VALUES (1, 6, '2025-11-11');
INSERT INTO public.tour_dates VALUES (2, 8, '2025-11-11');
INSERT INTO public.tour_dates VALUES (3, 11, '2025-04-05');
INSERT INTO public.tour_dates VALUES (4, 11, '2025-04-10');
INSERT INTO public.tour_dates VALUES (5, 12, '2025-04-05');
INSERT INTO public.tour_dates VALUES (6, 12, '2025-04-10');
INSERT INTO public.tour_dates VALUES (7, 13, '2025-04-05');
INSERT INTO public.tour_dates VALUES (8, 13, '2025-04-10');
INSERT INTO public.tour_dates VALUES (9, 14, '2025-04-05');
INSERT INTO public.tour_dates VALUES (10, 14, '2025-04-10');
INSERT INTO public.tour_dates VALUES (11, 15, '2025-04-05');
INSERT INTO public.tour_dates VALUES (12, 15, '2025-04-10');
INSERT INTO public.tour_dates VALUES (13, 16, '2025-04-05');
INSERT INTO public.tour_dates VALUES (14, 16, '2025-04-10');
INSERT INTO public.tour_dates VALUES (15, 17, '2025-04-05');
INSERT INTO public.tour_dates VALUES (16, 17, '2025-04-10');
INSERT INTO public.tour_dates VALUES (17, 18, '2025-04-05');
INSERT INTO public.tour_dates VALUES (18, 18, '2025-04-10');
INSERT INTO public.tour_dates VALUES (19, 19, '2025-04-05');
INSERT INTO public.tour_dates VALUES (20, 19, '2025-04-10');
INSERT INTO public.tour_dates VALUES (21, 20, '2025-04-05');
INSERT INTO public.tour_dates VALUES (22, 20, '2025-04-10');
INSERT INTO public.tour_dates VALUES (23, 21, '2025-04-05');
INSERT INTO public.tour_dates VALUES (24, 21, '2025-04-10');
INSERT INTO public.tour_dates VALUES (25, 22, '2025-04-05');
INSERT INTO public.tour_dates VALUES (26, 22, '2025-04-10');
INSERT INTO public.tour_dates VALUES (27, 23, '2025-04-05');
INSERT INTO public.tour_dates VALUES (28, 23, '2025-04-10');
INSERT INTO public.tour_dates VALUES (29, 24, '2025-04-05');
INSERT INTO public.tour_dates VALUES (30, 24, '2025-04-10');
INSERT INTO public.tour_dates VALUES (31, 25, '2025-04-05');
INSERT INTO public.tour_dates VALUES (32, 25, '2025-04-10');
INSERT INTO public.tour_dates VALUES (33, 26, '2025-05-11');
INSERT INTO public.tour_dates VALUES (34, 27, '2025-05-11');
INSERT INTO public.tour_dates VALUES (35, 28, '2025-05-11');
INSERT INTO public.tour_dates VALUES (37, 30, '2025-05-11');
INSERT INTO public.tour_dates VALUES (38, 31, '2025-05-11');


--
-- TOC entry 4876 (class 0 OID 24900)
-- Dependencies: 218
-- Data for Name: tours; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.tours VALUES (1, 'senamiestis', 'pasivaiksciojimas po senamiesti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '2', 19.99, 'vienas', 7);
INSERT INTO public.tours VALUES (2, 'naujamiestis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 29.99, 'vienas', 7);
INSERT INTO public.tours VALUES (3, 'naujamiestis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 29.99, 'vienas', 7);
INSERT INTO public.tours VALUES (4, 'naujamiestis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 29.99, 'vienas', 7);
INSERT INTO public.tours VALUES (5, 'naujamiestis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 29.99, 'vienas', 7);
INSERT INTO public.tours VALUES (6, 'naujamiestis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 29.99, 'vienas', 7);
INSERT INTO public.tours VALUES (7, 'Ekskursija po Vilnių', 'Pavadinimas', 'image.jpg', '120', 30.00, 'Pavieniams asmenims', 7);
INSERT INTO public.tours VALUES (9, 'naujamiestis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 29.99, 'vienas', 7);
INSERT INTO public.tours VALUES (10, 'naujamiestis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 29.99, 'vienas', 7);
INSERT INTO public.tours VALUES (11, 'naujamiestis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 29.99, 'vienas', 7);
INSERT INTO public.tours VALUES (12, 'naujamiestis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 29.99, 'vienas', 7);
INSERT INTO public.tours VALUES (13, 'naujamiestis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 29.99, 'vienas', 7);
INSERT INTO public.tours VALUES (14, 'naujamiestis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 29.99, 'vienas', 7);
INSERT INTO public.tours VALUES (15, 'naujamiestis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 29.99, 'vienas', 7);
INSERT INTO public.tours VALUES (16, 'naujamiestis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 29.99, 'vienas', 7);
INSERT INTO public.tours VALUES (17, 'naujamiestis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 29.99, 'vienas', 7);
INSERT INTO public.tours VALUES (18, 'naujamiestis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 29.99, 'vienas', 7);
INSERT INTO public.tours VALUES (19, 'naujamiestis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 29.99, 'vienas', 7);
INSERT INTO public.tours VALUES (20, 'naujamiestis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 29.99, 'vienas', 7);
INSERT INTO public.tours VALUES (21, 'naujamiestis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 29.99, 'vienas', 7);
INSERT INTO public.tours VALUES (22, 'naujamiestis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 29.99, 'vienas', 7);
INSERT INTO public.tours VALUES (23, 'naujamiestis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 29.99, 'vienas', 7);
INSERT INTO public.tours VALUES (24, 'naujamiestis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 29.99, 'vienas', 7);
INSERT INTO public.tours VALUES (25, 'uzupis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 129.99, 'vienas', 7);
INSERT INTO public.tours VALUES (26, 'uzupis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 129.99, 'vienas', 7);
INSERT INTO public.tours VALUES (27, 'uzupis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 129.99, 'vienas', 7);
INSERT INTO public.tours VALUES (28, 'uzupis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 129.99, 'vienas', 7);
INSERT INTO public.tours VALUES (30, 'uzupis', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '1.30', 129.99, 'vienas', 7);
INSERT INTO public.tours VALUES (8, 'Kaunas', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '2.30', 29.99, 'vienas', 7);
INSERT INTO public.tours VALUES (31, 'Kaunas', 'pasivaiksciojimas po naujamieti', 'https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/2c/f9/3d.jpg', '2.30', 29.99, 'vienas', 7);


--
-- TOC entry 4874 (class 0 OID 24891)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (3, 'Begedis', 'begedis@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$ZxZXPosVq6iSTSqsPEVZzA$o7wBruHYvViiQRg4kwhwc0RZxvsPoNlXkxnkGkW2sPc', 'user');
INSERT INTO public.users VALUES (4, 'Begedis', 'begedis1@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$AUKfJmD+PU0//F70eFfhkA$O1Q0FtGoBgudiiM3amYoYCJGV0WERgJvkEVE9+A/YbQ', 'user');
INSERT INTO public.users VALUES (5, 'Begedis', 'begedis2@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$yTyp9xUIBnS9kKdjkk6pEg$nkvKdpl5UGg0a4uLd+zt9GR0oSOtziLZmiyG72LtmZ4', 'user');
INSERT INTO public.users VALUES (6, 'Begedis', 'begedis3@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$g91UXYYMeD3zXBXZ4ksmlw$QcNB+Io9/zTD2JAszK/RSTJgoFwU271QiCvnSkA14Cc', 'user');
INSERT INTO public.users VALUES (7, 'adminas', 'adminas@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$YHOf5OyWdJlphzslokBsSw$V08L57G0LaCNOD0HYqJ8+hi2yzu2SN5TeBFPbgytW3I', 'admin');


--
-- TOC entry 4893 (class 0 OID 0)
-- Dependencies: 221
-- Name: bookings_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bookings_id_seq', 1, false);


--
-- TOC entry 4894 (class 0 OID 0)
-- Dependencies: 223
-- Name: reviews_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reviews_id_seq', 7, true);


--
-- TOC entry 4895 (class 0 OID 0)
-- Dependencies: 219
-- Name: tour_dates_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tour_dates_id_seq', 44, true);


--
-- TOC entry 4896 (class 0 OID 0)
-- Dependencies: 217
-- Name: tours_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tours_id_seq', 33, true);


--
-- TOC entry 4897 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 7, true);


--
-- TOC entry 4721 (class 2606 OID 24931)
-- Name: bookings bookings_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_pkey PRIMARY KEY (id);


--
-- TOC entry 4723 (class 2606 OID 24951)
-- Name: reviews reviews_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_pkey PRIMARY KEY (id);


--
-- TOC entry 4719 (class 2606 OID 24919)
-- Name: tour_dates tour_dates_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_dates
    ADD CONSTRAINT tour_dates_pkey PRIMARY KEY (id);


--
-- TOC entry 4717 (class 2606 OID 24907)
-- Name: tours tours_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tours
    ADD CONSTRAINT tours_pkey PRIMARY KEY (id);


--
-- TOC entry 4715 (class 2606 OID 24898)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4726 (class 2606 OID 24937)
-- Name: bookings bookings_tour_date_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_tour_date_id_fkey FOREIGN KEY (tour_date_id) REFERENCES public.tour_dates(id) ON DELETE CASCADE;


--
-- TOC entry 4727 (class 2606 OID 24932)
-- Name: bookings bookings_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bookings
    ADD CONSTRAINT bookings_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4728 (class 2606 OID 24957)
-- Name: reviews reviews_tour_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_tour_id_fkey FOREIGN KEY (tour_id) REFERENCES public.tours(id) ON DELETE CASCADE;


--
-- TOC entry 4729 (class 2606 OID 24952)
-- Name: reviews reviews_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reviews
    ADD CONSTRAINT reviews_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- TOC entry 4725 (class 2606 OID 24920)
-- Name: tour_dates tour_dates_tour_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tour_dates
    ADD CONSTRAINT tour_dates_tour_id_fkey FOREIGN KEY (tour_id) REFERENCES public.tours(id) ON DELETE CASCADE;


--
-- TOC entry 4724 (class 2606 OID 24908)
-- Name: tours tours_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tours
    ADD CONSTRAINT tours_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.users(id);


-- Completed on 2025-02-24 06:32:45

--
-- PostgreSQL database dump complete
--

