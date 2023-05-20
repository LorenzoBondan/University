INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Alex', 'alex@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://media.istockphoto.com/id/1270067126/pt/foto/smiling-indian-man-looking-at-camera.jpg?s=612x612&w=0&k=20&c=Uxyoin6A5yJLc_a8XLeukKteiTZmenne9t38Isz0QS4=');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Maria', 'maria@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://i.pinimg.com/originals/76/ef/b7/76efb7c94755748d695d3d46cf11d08d.jpg');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Bob', 'bob@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://media.istockphoto.com/id/1265576300/photo/portrait-of-cheerful-mid-adult-black-man-in-casual-clothing.jpg?s=612x612&w=0&k=20&c=NlxtrL8x6M5fCrEt8CXuqIJ8BWqes47DhTixMKP5b0s=');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Bryan', 'bryan@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://media.istockphoto.com/id/1265576300/photo/portrait-of-cheerful-mid-adult-black-man-in-casual-clothing.jpg?s=612x612&w=0&k=20&c=NlxtrL8x6M5fCrEt8CXuqIJ8BWqes47DhTixMKP5b0s=');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Julia', 'julia@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://media.istockphoto.com/id/1265576300/photo/portrait-of-cheerful-mid-adult-black-man-in-casual-clothing.jpg?s=612x612&w=0&k=20&c=NlxtrL8x6M5fCrEt8CXuqIJ8BWqes47DhTixMKP5b0s=');
INSERT INTO tb_user (name, email, password, img_Url) VALUES ('Kelly', 'kelly@gmail.com', '$2a$10$eACCYoNOHEqXve8aIWT8Nu3PkMXWBaOxJ9aORUYzfMQCbVBIhZ8tG', 'https://media.istockphoto.com/id/1265576300/photo/portrait-of-cheerful-mid-adult-black-man-in-casual-clothing.jpg?s=612x612&w=0&k=20&c=NlxtrL8x6M5fCrEt8CXuqIJ8BWqes47DhTixMKP5b0s=');

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
INSERT INTO tb_user_role (user_id, role_id) VALUES (5, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (6, 1);
INSERT INTO tb_user_role (user_id, role_id) VALUES (6, 2);

INSERT INTO tb_course (name, img_Url, description) VALUES ('Software Engineering', 'https://cursos.unipampa.edu.br/cursos/engenhariadesoftware/files/2016/08/Logo-ES-Fundo-branco.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu erat justo. In ut urna diam. Aliquam a est sit amet eros lobortis accumsan. Curabitur a eleifend tortor. Vivamus nec congue erat. Nullam euismod sed felis in mollis. Vestibulum eu tempor metus, semper congue odio. Integer ipsum ex, ullamcorper a turpis sed, ullamcorper molestie massa. Donec eget urna iaculis, lobortis leo ut, cursus diam.');
INSERT INTO tb_course (name, img_Url, description) VALUES ('Law', 'https://seeklogo.com/images/S/simbolo-de-direito-logo-52D04CB959-seeklogo.com.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu erat justo. In ut urna diam. Aliquam a est sit amet eros lobortis accumsan. Curabitur a eleifend tortor. Vivamus nec congue erat. Nullam euismod sed felis in mollis. Vestibulum eu tempor metus, semper congue odio. Integer ipsum ex, ullamcorper a turpis sed, ullamcorper molestie massa. Donec eget urna iaculis, lobortis leo ut, cursus diam.');
INSERT INTO tb_course (name, img_Url, description) VALUES ('Medicine', 'https://www.freepnglogos.com/uploads/medicine-logo-png-1.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu erat justo. In ut urna diam. Aliquam a est sit amet eros lobortis accumsan. Curabitur a eleifend tortor. Vivamus nec congue erat. Nullam euismod sed felis in mollis. Vestibulum eu tempor metus, semper congue odio. Integer ipsum ex, ullamcorper a turpis sed, ullamcorper molestie massa. Donec eget urna iaculis, lobortis leo ut, cursus diam.');
INSERT INTO tb_course (name, img_Url, description) VALUES ('Business', 'https://seeklogo.com/images/A/administracao-logo-0C19FACA99-seeklogo.com.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu erat justo. In ut urna diam. Aliquam a est sit amet eros lobortis accumsan. Curabitur a eleifend tortor. Vivamus nec congue erat. Nullam euismod sed felis in mollis. Vestibulum eu tempor metus, semper congue odio. Integer ipsum ex, ullamcorper a turpis sed, ullamcorper molestie massa. Donec eget urna iaculis, lobortis leo ut, cursus diam.');
INSERT INTO tb_course (name, img_Url, description) VALUES ('Biomedicine', 'https://seeklogo.com/images/B/biomedicina-logo-9980D97C53-seeklogo.com.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu erat justo. In ut urna diam. Aliquam a est sit amet eros lobortis accumsan. Curabitur a eleifend tortor. Vivamus nec congue erat. Nullam euismod sed felis in mollis. Vestibulum eu tempor metus, semper congue odio. Integer ipsum ex, ullamcorper a turpis sed, ullamcorper molestie massa. Donec eget urna iaculis, lobortis leo ut, cursus diam.');
INSERT INTO tb_course (name, img_Url, description) VALUES ('Physical Education', 'https://seeklogo.com/images/E/educacao-fisica-logo-1EBC40DC9C-seeklogo.com.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu erat justo. In ut urna diam. Aliquam a est sit amet eros lobortis accumsan. Curabitur a eleifend tortor. Vivamus nec congue erat. Nullam euismod sed felis in mollis. Vestibulum eu tempor metus, semper congue odio. Integer ipsum ex, ullamcorper a turpis sed, ullamcorper molestie massa. Donec eget urna iaculis, lobortis leo ut, cursus diam.');
INSERT INTO tb_course (name, img_Url, description) VALUES ('Mechanical Engineering', 'https://seeklogo.com/images/S/S__mbolo_da_Engenharia_Mec__nica-logo-8CCBA4796F-seeklogo.com.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu erat justo. In ut urna diam. Aliquam a est sit amet eros lobortis accumsan. Curabitur a eleifend tortor. Vivamus nec congue erat. Nullam euismod sed felis in mollis. Vestibulum eu tempor metus, semper congue odio. Integer ipsum ex, ullamcorper a turpis sed, ullamcorper molestie massa. Donec eget urna iaculis, lobortis leo ut, cursus diam.');
INSERT INTO tb_course (name, img_Url, description) VALUES ('Civil Engineering', 'https://seeklogo.com/images/E/engenharia-civil-logo-98BEDE6119-seeklogo.com.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu erat justo. In ut urna diam. Aliquam a est sit amet eros lobortis accumsan. Curabitur a eleifend tortor. Vivamus nec congue erat. Nullam euismod sed felis in mollis. Vestibulum eu tempor metus, semper congue odio. Integer ipsum ex, ullamcorper a turpis sed, ullamcorper molestie massa. Donec eget urna iaculis, lobortis leo ut, cursus diam.');
INSERT INTO tb_course (name, img_Url, description) VALUES ('Chemical Engineering', 'https://seeklogo.com/images/E/engenharia-quimica-logo-0AB6414414-seeklogo.com.png', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eu erat justo. In ut urna diam. Aliquam a est sit amet eros lobortis accumsan. Curabitur a eleifend tortor. Vivamus nec congue erat. Nullam euismod sed felis in mollis. Vestibulum eu tempor metus, semper congue odio. Integer ipsum ex, ullamcorper a turpis sed, ullamcorper molestie massa. Donec eget urna iaculis, lobortis leo ut, cursus diam.');

INSERT INTO tb_subject (name, semester) VALUES ('Programming I', 1);
INSERT INTO tb_subject (name, semester) VALUES ('Web Development', 7);
INSERT INTO tb_subject (name, semester) VALUES ('Digital Law', 5);
INSERT INTO tb_subject (name, semester) VALUES ('Criminal Law I', 2);
INSERT INTO tb_subject (name, semester) VALUES ('Anatomy', 2);
INSERT INTO tb_subject (name, semester) VALUES ('Business Intelligence', 4);
INSERT INTO tb_subject (name, semester) VALUES ('Calculus I', 1);
INSERT INTO tb_subject (name, semester) VALUES ('Calculus II', 2);
INSERT INTO tb_subject (name, semester) VALUES ('Calculus III', 3);

INSERT INTO tb_class (code, limit_Of_Students, subject_id) VALUES ('ABC', 10, 1);
INSERT INTO tb_class (code, limit_Of_Students, subject_id) VALUES ('BCD', 20, 1);
INSERT INTO tb_class (code, limit_Of_Students, subject_id) VALUES ('CDE', 30, 2);
INSERT INTO tb_class (code, limit_Of_Students, subject_id) VALUES ('DEF', 40, 3);
INSERT INTO tb_class (code, limit_Of_Students, subject_id) VALUES ('EFG', 50, 4);
INSERT INTO tb_class (code, limit_Of_Students, subject_id) VALUES ('FGH', 50, 5);
INSERT INTO tb_class (code, limit_Of_Students, subject_id) VALUES ('GHI', 50, 6);
INSERT INTO tb_class (code, limit_Of_Students, subject_id) VALUES ('IJK', 50, 7);
INSERT INTO tb_class (code, limit_Of_Students, subject_id) VALUES ('JKL', 50, 8);
INSERT INTO tb_class (code, limit_Of_Students, subject_id) VALUES ('KLM', 50, 9);

INSERT INTO tb_user_course (user_id, course_id) VALUES (1,1);
INSERT INTO tb_user_course (user_id, course_id) VALUES (4,2);
INSERT INTO tb_user_course (user_id, course_id) VALUES (5,3);
INSERT INTO tb_user_course (user_id, course_id) VALUES (6,4);

INSERT INTO tb_course_subject (course_id, subject_id) VALUES (1,1);
INSERT INTO tb_course_subject (course_id, subject_id) VALUES (1,2);
INSERT INTO tb_course_subject (course_id, subject_id) VALUES (2,3);
INSERT INTO tb_course_subject (course_id, subject_id) VALUES (2,4);
INSERT INTO tb_course_subject (course_id, subject_id) VALUES (3,5);
INSERT INTO tb_course_subject (course_id, subject_id) VALUES (4,6);
INSERT INTO tb_course_subject (course_id, subject_id) VALUES (5,5);
INSERT INTO tb_course_subject (course_id, subject_id) VALUES (6,5);
INSERT INTO tb_course_subject (course_id, subject_id) VALUES (7,7);
INSERT INTO tb_course_subject (course_id, subject_id) VALUES (7,8);
INSERT INTO tb_course_subject (course_id, subject_id) VALUES (7,9);
INSERT INTO tb_course_subject (course_id, subject_id) VALUES (8,7);
INSERT INTO tb_course_subject (course_id, subject_id) VALUES (8,8);
INSERT INTO tb_course_subject (course_id, subject_id) VALUES (8,9);
INSERT INTO tb_course_subject (course_id, subject_id) VALUES (9,7);
INSERT INTO tb_course_subject (course_id, subject_id) VALUES (9,8);
INSERT INTO tb_course_subject (course_id, subject_id) VALUES (9,9);
INSERT INTO tb_course_subject (course_id, subject_id) VALUES (1,7);
INSERT INTO tb_course_subject (course_id, subject_id) VALUES (1,8);
INSERT INTO tb_course_subject (course_id, subject_id) VALUES (1,9);


INSERT INTO tb_class_student (class_id, student_id) VALUES (1,1);
INSERT INTO tb_class_student (class_id, student_id) VALUES (3,1);
INSERT INTO tb_class_student (class_id, student_id) VALUES (4,4);
INSERT INTO tb_class_student (class_id, student_id) VALUES (5,5);
INSERT INTO tb_class_student (class_id, student_id) VALUES (6,6);


