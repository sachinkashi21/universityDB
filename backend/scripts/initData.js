const mysql = require("mysql2/promise");
require("dotenv").config();

const insertData = async () => {
    try {
        console.log("Connecting to database...");
        
        const pool = mysql.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
        });

        console.log("Inserting data...");

        await pool.query("INSERT INTO USERS (Email, Password, FName, MInit, LName, Role, Phone, State, City, PinCode, DOB) VALUES ?", [
            [
                ["john.doe@example.com", "password123", "John", "M", "Doe", "Student", "9876543210", "California", "Los Angeles", "90001", "2000-05-15"],
                ["jane.smith@example.com", "securepass", "Jane", "A", "Smith", "Teacher", "8765432109", "Texas", "Dallas", "75001", "1985-08-20"],
                ["admin@example.com", "adminpass", "Admin", null, null, "Admin", "1234567890", "New York", "NYC", "10001", "1990-01-01"]
            ]
        ]);

        await pool.query("INSERT INTO CLASS (Sem, Branch, StartDate, EndDate, Degree) VALUES ?", [
            [
                [1, "Computer Science", "2024-01-10", "2024-05-30", "B.Tech"],
                [2, "Electronics", "2024-01-10", "2024-05-30", "B.Tech"]
            ]
        ]);

        await pool.query("INSERT INTO COURSE (CourseCode, Name, Credits, DeptName) VALUES ?", [
            [
                ["CS101", "Data Structures", 4, "Computer Science"],
                ["EE201", "Digital Electronics", 3, "Electronics"]
            ]
        ]);

        await pool.query("INSERT INTO TEACHER (UserId, Salary, SSN, Department) VALUES ?", [
            [[2, 50000, "SSN123456", "Computer Science"]]
        ]);

        await pool.query("INSERT INTO STUDENT (UserId, CurrentClassId) VALUES ?", [
            [[1, 1]]
        ]);

        await pool.query("INSERT INTO LECTURE (Date, Time, Duration, Topic, RoomNo, MeetLink, CourseId, ClassId) VALUES ?", [
            [["2024-02-10", "10:00:00", 90, "Introduction to Linked Lists", "101", "meet.com/abc", "CS101", 1]]
        ]);

        await pool.query("INSERT INTO ATTENDANCE (Status, StudentId, LectureId) VALUES ?", [
            [["Present", 1, 1]]
        ]);

        await pool.query("INSERT INTO REPORT (SEEMarks, CIEMarks, Grade, Remark, CourseId, ClassId, StudentId) VALUES ?", [
            [[80, 20, "A", "Good performance", "CS101", 1, 1]]
        ]);

        await pool.query("INSERT INTO ASSIGNMENT (Title, Description, GivenOn, Deadline, ClassId, CourseId) VALUES ?", [
            [["Linked List Homework", "Implement various linked list operations.", "2024-02-05", "2024-02-12", 1, "CS101"]]
        ]);

        await pool.query("INSERT INTO CURRICULUM (ClassId, CourseId, AssignedTeacherId) VALUES ?", [
            [[1, "CS101", 2]]
        ]);

        console.log("Data inserted successfully!");
        await pool.end();
        console.log("Connection pool closed.");
    } catch (error) {
        console.error("Error inserting data:", error);
    }
};

insertData().then(() => process.exit(0));
