const pool = require("../config/db");
const mysql = require("mysql2/promise");
require("dotenv").config();

const initDB = async () => {
    try {
        console.log("Initializing database...");

        // Create a temporary connection without selecting a DB
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        });

        // Create database if it doesn't exist
        await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
        console.log(`Database '${process.env.DB_NAME}' is ready.`);

        await connection.end(); // Close temporary connection

        const pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });


        const queries = [
            // Drop existing tables
            "DROP TABLE IF EXISTS ATTENDANCE, REPORT, ASSIGNMENT, CURRICULUM, LECTURE, COURSE, CLASS, STUDENT, TEACHER, USERS",

            // USERS
            `CREATE TABLE USERS (
                UserId INT PRIMARY KEY AUTO_INCREMENT,
                Name VARCHAR(100) NOT NULL,
                Role ENUM('Student', 'Teacher') NOT NULL,
                Phone VARCHAR(15),
                Address VARCHAR(255),
                Email VARCHAR(100) UNIQUE NOT NULL
            )`,

            // CLASS
            `CREATE TABLE CLASS (
                ClassId INT PRIMARY KEY AUTO_INCREMENT,
                Sem INT NOT NULL,
                Branch VARCHAR(50) NOT NULL,
                StartDate DATE NOT NULL,
                EndDate DATE NOT NULL,
                Degree VARCHAR(50) NOT NULL
            )`,

            // COURSE
            `CREATE TABLE COURSE (
                CourseCode VARCHAR(20) PRIMARY KEY,
                Name VARCHAR(100) NOT NULL,
                Credits INT NOT NULL,
                DeptName VARCHAR(50) NOT NULL
            )`,

            // LECTURE
            `CREATE TABLE LECTURE (
                LectureId INT PRIMARY KEY AUTO_INCREMENT,
                Date DATE NOT NULL,
                Time TIME NOT NULL,
                Duration INT NOT NULL,
                Topic VARCHAR(255) NOT NULL,
                RoomNo VARCHAR(20),
                CourseId VARCHAR(20),
                ClassId INT,
                FOREIGN KEY (CourseId) REFERENCES COURSE(CourseCode) ON DELETE CASCADE,
                FOREIGN KEY (ClassId) REFERENCES CLASS(ClassId) ON DELETE CASCADE
            )`,

            // ATTENDANCE
            `CREATE TABLE ATTENDANCE (
                AttendanceId INT PRIMARY KEY AUTO_INCREMENT,
                Status ENUM('Present', 'Absent') NOT NULL,
                StudentId INT,
                LectureId INT,
                FOREIGN KEY (StudentId) REFERENCES USERS(UserId) ON DELETE CASCADE,
                FOREIGN KEY (LectureId) REFERENCES LECTURE(LectureId) ON DELETE CASCADE
            )`,

            // REPORT
            `CREATE TABLE REPORT (
                ReportId INT PRIMARY KEY AUTO_INCREMENT,
                SEEMarks INT,
                CIEMarks INT,
                Grade CHAR(2),
                Remark VARCHAR(255),
                CourseId VARCHAR(20),
                ClassId INT,
                StudentId INT,
                FOREIGN KEY (CourseId) REFERENCES COURSE(CourseCode) ON DELETE CASCADE,
                FOREIGN KEY (ClassId) REFERENCES CLASS(ClassId) ON DELETE CASCADE,
                FOREIGN KEY (StudentId) REFERENCES USERS(UserId) ON DELETE CASCADE
            )`,

            // ASSIGNMENT
            `CREATE TABLE ASSIGNMENT (
                AssignmentId INT PRIMARY KEY AUTO_INCREMENT,
                Title VARCHAR(255) NOT NULL,
                Description TEXT,
                GivenOn DATE NOT NULL,
                Deadline DATE NOT NULL,
                ClassId INT,
                CourseId VARCHAR(20),
                FOREIGN KEY (ClassId) REFERENCES CLASS(ClassId) ON DELETE CASCADE,
                FOREIGN KEY (CourseId) REFERENCES COURSE(CourseCode) ON DELETE CASCADE
            )`,

            // CURRICULUM
            `CREATE TABLE CURRICULUM (
                CurriculumId INT PRIMARY KEY AUTO_INCREMENT,
                ClassId INT,
                CourseId VARCHAR(20),
                AssignedTeacherId INT,
                FOREIGN KEY (ClassId) REFERENCES CLASS(ClassId) ON DELETE CASCADE,
                FOREIGN KEY (CourseId) REFERENCES COURSE(CourseCode) ON DELETE CASCADE,
                FOREIGN KEY (AssignedTeacherId) REFERENCES USERS(UserId) ON DELETE CASCADE
            )`,

            // TEACHER
            `CREATE TABLE TEACHER (
                UserId INT PRIMARY KEY,
                Salary DECIMAL(10,2),
                SSN VARCHAR(20) UNIQUE,
                Department VARCHAR(50),
                FOREIGN KEY (UserId) REFERENCES USERS(UserId) ON DELETE CASCADE
            )`,

            // STUDENT
            `CREATE TABLE STUDENT (
                UserId INT PRIMARY KEY,
                DOB DATE NOT NULL,
                CurrentClassId INT,
                FOREIGN KEY (UserId) REFERENCES USERS(UserId) ON DELETE CASCADE,
                FOREIGN KEY (CurrentClassId) REFERENCES CLASS(ClassId) ON DELETE CASCADE
            )`
        ];

        for (let query of queries) {
            await pool.query(query);
        }

        console.log("Database initialized successfully!");

        await pool.end();
        console.log("Connection pool closed.");
        
    } catch (error) {
        console.error("Error initializing database:", error);
    }
};

initDB().then(() => process.exit(0));
