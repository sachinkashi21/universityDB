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
            // Drop existing tables in correct order
            "DROP TABLE IF EXISTS ATTENDANCE, REPORT, ASSIGNMENT, CURRICULUM, LECTURE, COURSE, CLASS, STUDENT, TEACHER, USERS",
        
            // USERS Table (Independent)
            `CREATE TABLE USERS (
                UserId INT PRIMARY KEY AUTO_INCREMENT,
                Email VARCHAR(100) UNIQUE NOT NULL,
                Password VARCHAR(255) NOT NULL,
                FName VARCHAR(10) NOT NULL,
                MInit VARCHAR(10),
                LName VARCHAR(10),
                Role ENUM('Student', 'Teacher', 'Admin') NOT NULL,
                Phone VARCHAR(10),
                State VARCHAR(20),
                City VARCHAR(20),
                PinCode VARCHAR(6),
                DOB DATE NOT NULL
            )`,
        
            // CLASS Table (Independent)
            `CREATE TABLE CLASS (
                ClassId INT PRIMARY KEY AUTO_INCREMENT,
                Sem INT NOT NULL,
                Branch VARCHAR(50) NOT NULL,
                StartDate DATE NOT NULL,
                EndDate DATE NOT NULL,
                Degree VARCHAR(50) NOT NULL
            )`,
        
            // COURSE Table (Independent)
            `CREATE TABLE COURSE (
                CourseCode VARCHAR(20) PRIMARY KEY,
                Name VARCHAR(100) NOT NULL,
                Credits INT NOT NULL,
                DeptName VARCHAR(50) NOT NULL
            )`,
        
            // TEACHER Table (Depends on USERS)
            `CREATE TABLE TEACHER (
                UserId INT PRIMARY KEY,
                Salary DECIMAL(10,2),
                SSN VARCHAR(20) UNIQUE,
                Department VARCHAR(50),
                FOREIGN KEY (UserId) REFERENCES USERS(UserId) ON DELETE CASCADE
            )`,
        
            // STUDENT Table (Depends on USERS and CLASS)
            `CREATE TABLE STUDENT (
                UserId INT PRIMARY KEY,
                CurrentClassId INT,
                FOREIGN KEY (UserId) REFERENCES USERS(UserId) ON DELETE CASCADE,
                FOREIGN KEY (CurrentClassId) REFERENCES CLASS(ClassId) ON DELETE SET NULL
            )`,
        
            // LECTURE Table (Depends on COURSE and CLASS)
            `CREATE TABLE LECTURE (
                LectureId INT PRIMARY KEY AUTO_INCREMENT,
                Date DATE NOT NULL,
                Time TIME NOT NULL,
                Duration INT NOT NULL,
                Topic VARCHAR(255) NOT NULL,
                RoomNo VARCHAR(20),
                MeetLink VARCHAR(100),
                CourseId VARCHAR(20),
                ClassId INT,
                FOREIGN KEY (CourseId) REFERENCES COURSE(CourseCode) ON DELETE CASCADE,
                FOREIGN KEY (ClassId) REFERENCES CLASS(ClassId) ON DELETE CASCADE
            )`,
        
            // ATTENDANCE Table (Depends on USERS and LECTURE)
            `CREATE TABLE ATTENDANCE (
                Status ENUM('Present', 'Absent', 'Partial') NOT NULL,
                StudentId INT,
                LectureId INT,
                PRIMARY KEY (StudentId, LectureId),
                FOREIGN KEY (StudentId) REFERENCES USERS(UserId) ON DELETE CASCADE,
                FOREIGN KEY (LectureId) REFERENCES LECTURE(LectureId) ON DELETE CASCADE
            )`,
        
            // REPORT Table (Depends on COURSE, CLASS, and USERS)
            `CREATE TABLE REPORT (
                SEEMarks INT,
                CIEMarks INT,
                Grade CHAR(2),
                Remark VARCHAR(255),
                CourseId VARCHAR(20),
                ClassId INT,
                StudentId INT,
                Primary key (CourseId, ClassId, StudentId),
                FOREIGN KEY (CourseId) REFERENCES COURSE(CourseCode) ON DELETE CASCADE,
                FOREIGN KEY (ClassId) REFERENCES CLASS(ClassId) ON DELETE CASCADE,
                FOREIGN KEY (StudentId) REFERENCES USERS(UserId) ON DELETE CASCADE
            )`,
        
            // ASSIGNMENT Table (Depends on CLASS and COURSE)
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
        
            // CURRICULUM Table (Depends on CLASS, COURSE, and USERS)
            `CREATE TABLE CURRICULUM (
                ClassId INT,
                CourseId VARCHAR(20),
                AssignedTeacherId INT,
                PRIMARY KEY (ClassId, CourseId),
                FOREIGN KEY (ClassId) REFERENCES CLASS(ClassId) ON DELETE CASCADE,
                FOREIGN KEY (CourseId) REFERENCES COURSE(CourseCode) ON DELETE CASCADE,
                FOREIGN KEY (AssignedTeacherId) REFERENCES USERS(UserId) ON DELETE CASCADE
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
