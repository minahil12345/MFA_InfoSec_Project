CREATE DATABASE MFA;
USE MFA;
-- Drop database MFA;
CREATE TABLE Login_Credentials(
	id INT NOT NULL AUTO_INCREMENT,
    username VARCHAR(50),
    password VARCHAR(50),
    security_question VARCHAR(100),
    email VARCHAR(100),
    PRIMARY KEY (id)
);

CREATE TABLE MFA_Code(
	id INT,
    code INT,
    FOREIGN KEY (id) REFERENCES Login_Credentials(id)
);

INSERT INTO Login_Credentials (username, password, security_question, email) VALUES('manahil', 'password1', 'Red', 'manahilfaisal200@gmail.com');
INSERT INTO Login_Credentials (username, password, security_question, email) VALUES ('hani', 'securepassword', 'Blue', 'mhani7642@gmail.com');
INSERT INTO Login_Credentials (username, password, security_question, email) VALUES ('saba', 'pass123', 'Green', 'sabakarim0000@gmail.com');
INSERT INTO Login_Credentials (username, password, security_question, email) VALUES ('hamza', 'adminpass', 'Brown', 'hamza.cstn@gmail.com');



show tables;

select * from MFA_Code;