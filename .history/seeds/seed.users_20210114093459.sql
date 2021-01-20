BEGIN;

INSERT INTO users (email, first_name, last_name, password, date_created, profile_image, phone_number, user_type)
VALUES 
('user1@demo.com', 'Monika', 'Thanki', '$2a$12$A9x3aZ5.Xmyaoun.aPYqiOI2rIqY8HXA6CLyNghOBWQY24wPIebOW', '2020-01-03T00:00:00.000Z', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2XJlpvEK3jm60AidjxUu9tn1LCL3bQMMpdA&usqp=CAU', '1234567890', 'admin');

COMMIT;