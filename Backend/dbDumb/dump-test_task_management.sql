PGDMP  ,                    |            test_task_management    16.1    16.1     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    36033    test_task_management    DATABASE     �   CREATE DATABASE test_task_management WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_Pakistan.1252';
 $   DROP DATABASE test_task_management;
                postgres    false                        2615    2200    public    SCHEMA        CREATE SCHEMA public;
    DROP SCHEMA public;
                pg_database_owner    false            �           0    0    SCHEMA public    COMMENT     6   COMMENT ON SCHEMA public IS 'standard public schema';
                   pg_database_owner    false    4            K           1247    36035    priority    TYPE     M   CREATE TYPE public.priority AS ENUM (
    'High',
    'Medium',
    'Low'
);
    DROP TYPE public.priority;
       public          postgres    false    4            N           1247    36042    status    TYPE     {   CREATE TYPE public.status AS ENUM (
    'NOT_STARTED',
    'STARTED',
    'PENDING',
    'IN_PROGRESS',
    'COMPLETED'
);
    DROP TYPE public.status;
       public          postgres    false    4            �            1259    36053    tasks    TABLE     �   CREATE TABLE public.tasks (
    title character varying,
    description character varying,
    due_date timestamp with time zone DEFAULT now(),
    priority public.priority,
    status public.status,
    user_id bigint,
    id bigint NOT NULL
);
    DROP TABLE public.tasks;
       public         heap    postgres    false    843    846    4            �            1259    36059    tasks_id_seq    SEQUENCE     u   CREATE SEQUENCE public.tasks_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.tasks_id_seq;
       public          postgres    false    4    215            �           0    0    tasks_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.tasks_id_seq OWNED BY public.tasks.id;
          public          postgres    false    216            �            1259    36060    users    TABLE     �   CREATE TABLE public.users (
    id bigint NOT NULL,
    user_name character varying,
    email character varying,
    password character varying
);
    DROP TABLE public.users;
       public         heap    postgres    false    4            �            1259    36065    users_id_seq    SEQUENCE     u   CREATE SEQUENCE public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 #   DROP SEQUENCE public.users_id_seq;
       public          postgres    false    4    217            �           0    0    users_id_seq    SEQUENCE OWNED BY     =   ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;
          public          postgres    false    218            &           2604    36066    tasks id    DEFAULT     d   ALTER TABLE ONLY public.tasks ALTER COLUMN id SET DEFAULT nextval('public.tasks_id_seq'::regclass);
 7   ALTER TABLE public.tasks ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    216    215            '           2604    36067    users id    DEFAULT     d   ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);
 7   ALTER TABLE public.users ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    218    217            �          0    36053    tasks 
   TABLE DATA           \   COPY public.tasks (title, description, due_date, priority, status, user_id, id) FROM stdin;
    public          postgres    false    215   �       �          0    36060    users 
   TABLE DATA           ?   COPY public.users (id, user_name, email, password) FROM stdin;
    public          postgres    false    217          �           0    0    tasks_id_seq    SEQUENCE SET     <   SELECT pg_catalog.setval('public.tasks_id_seq', 350, true);
          public          postgres    false    216            �           0    0    users_id_seq    SEQUENCE SET     ;   SELECT pg_catalog.setval('public.users_id_seq', 33, true);
          public          postgres    false    218            )           2606    36069    tasks tasks_pk 
   CONSTRAINT     L   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pk PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_pk;
       public            postgres    false    215            +           2606    36071    users users_pk 
   CONSTRAINT     L   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pk PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.users DROP CONSTRAINT users_pk;
       public            postgres    false    217            -           2606    36073    users users_un 
   CONSTRAINT     J   ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_un UNIQUE (email);
 8   ALTER TABLE ONLY public.users DROP CONSTRAINT users_un;
       public            postgres    false    217            .           2606    36074    tasks tasks_fk    FK CONSTRAINT     m   ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_fk FOREIGN KEY (user_id) REFERENCES public.users(id);
 8   ALTER TABLE ONLY public.tasks DROP CONSTRAINT tasks_fk;
       public          postgres    false    217    4651    215            �      x������ � �      �   g   x�3��,.J�/�HL�,,M54��s3s���s9U��TT�]#KK*��<��]�
+�M�,S�K}����}�SM�=���rSB}�������*�b���� z��     