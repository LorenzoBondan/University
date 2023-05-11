INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Alex', 'alex@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://media.istockphoto.com/id/1270067126/pt/foto/smiling-indian-man-looking-at-camera.jpg?s=612x612&w=0&k=20&c=Uxyoin6A5yJLc_a8XLeukKteiTZmenne9t38Isz0QS4=');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Maria', 'maria@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://i.pinimg.com/originals/76/ef/b7/76efb7c94755748d695d3d46cf11d08d.jpg');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Bob', 'bob@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://media.istockphoto.com/id/1265576300/photo/portrait-of-cheerful-mid-adult-black-man-in-casual-clothing.jpg?s=612x612&w=0&k=20&c=NlxtrL8x6M5fCrEt8CXuqIJ8BWqes47DhTixMKP5b0s=');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Bryan', 'bryan@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://media.istockphoto.com/id/1265576300/photo/portrait-of-cheerful-mid-adult-black-man-in-casual-clothing.jpg?s=612x612&w=0&k=20&c=NlxtrL8x6M5fCrEt8CXuqIJ8BWqes47DhTixMKP5b0s=');

INSERT INTO tb_role (authority) VALUES ('ROLE_STUDENT');
INSERT INTO tb_role (authority) VALUES ('ROLE_TEACHER');
INSERT INTO tb_role (authority) VALUES ('ROLE_ADMIN');

INSERT INTO tb_user_role (user_id, role_id) VALUES (1, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 2);
INSERT INTO tb_user_role (user_id, role_id) VALUES (2, 3);
INSERT INTO tb_user_role (user_id, role_id) VALUES (3, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (3, 2);
INSERT INTO tb_user_role (user_id, role_id) VALUES (4, 1);

INSERT INTO tb_course (name, img_Url) VALUES ('Software Engineering', 'https://cursos.unipampa.edu.br/cursos/engenhariadesoftware/files/2016/08/Logo-ES-Fundo-branco.png');
INSERT INTO tb_course (name, img_Url) VALUES ('Law', 'https://w7.pngwing.com/pngs/761/914/png-transparent-lady-justice-symbol-criminal-justice-balance-scales-miscellaneous-measuring-scales-sign.png');

INSERT INTO tb_subject (name, semester) VALUES ('Programming I', 1);
INSERT INTO tb_subject (name, semester) VALUES ('Web Development', 7);
INSERT INTO tb_subject (name, semester) VALUES ('Digital Law', 5);
INSERT INTO tb_subject (name, semester) VALUES ('Criminal Law I', 2);

INSERT INTO tb_class (code, limit_Of_Students, subject_id) VALUES ('A', 10, 1);
INSERT INTO tb_class (code, limit_Of_Students, subject_id) VALUES ('B', 20, 1);
INSERT INTO tb_class (code, limit_Of_Students, subject_id) VALUES ('C', 30, 2);
INSERT INTO tb_class (code, limit_Of_Students, subject_id) VALUES ('D', 40, 3);
INSERT INTO tb_class (code, limit_Of_Students, subject_id) VALUES ('E', 50, 4);


INSERT INTO tb_user_course (user_id, course_id) VALUES (1,1);

INSERT INTO tb_course_subject (course_id, subject_id) VALUES (1,1);
INSERT INTO tb_course_subject (course_id, subject_id) VALUES (1,2);
INSERT INTO tb_course_subject (course_id, subject_id) VALUES (2,3);
INSERT INTO tb_course_subject (course_id, subject_id) VALUES (2,4);

