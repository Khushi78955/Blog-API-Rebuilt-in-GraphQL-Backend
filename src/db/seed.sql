INSERT INTO users (username, email, password)
VALUES
(
    'khushi',
    'khushi@example.com',
    '$2b$10$vfYJ0F9Xa9AX27/Dg5jpo.6OPZ7c8WyeUtljyVRbrVlhcKKoKJoCi'
),
(
    'john',
    'john@example.com',
    '$2b$10$vfYJ0F9Xa9AX27/Dg5jpo.6OPZ7c8WyeUtljyVRbrVlhcKKoKJoCi'
);

INSERT INTO posts (title, content, slug, author_id)
VALUES
(
    'Introduction to GraphQL',
    'GraphQL is a query language for APIs.',
    'introduction-to-graphql',
    1
),
(
    'Getting Started with PostgreSQL',
    'PostgreSQL is a powerful relational database.',
    'getting-started-with-postgresql',
    1
),
(
    'Node.js Async Programming',
    'Understanding async and await.',
    'nodejs-async-programming',
    2
),
(
    'Express.js Middleware',
    'Middleware powers Express applications.',
    'expressjs-middleware',
    2
);

INSERT INTO tags (name)
VALUES
('GraphQL'),
('Node.js'),
('PostgreSQL'),
('Backend'),
('Express');

INSERT INTO post_tags (post_id, tag_id)
VALUES
(1,1),
(1,4),
(2,3),
(2,4),
(3,2),
(3,4),
(4,2),
(4,5);