const router = require('express').Router();
const asyncFn = require('../middleware/asyncWrapper');
const Report = require('../models/Report');

router.post('/:classId/:courseId', asyncFn(async (req, res) => {
    const { classId, courseId } = req.params;
    const reports = req.body; // Expecting an array of report objects

    // Validate input
    if (!Array.isArray(reports) || reports.length === 0) {
        return res.status(400).json({ error: 'Invalid input. Expecting an array of report objects.' });
    }

    // Assign Grade and Remark based on marks
    reports.forEach(report => {
        const totalMarks = parseInt(report.SEEMarks, 10) + parseInt(report.CIEMarks, 10);

        if (totalMarks >= 90) {
            report.Grade = 'A+';
            report.Remark = 'PASS';
        } else if (totalMarks >= 75) {
            report.Grade = 'A';
            report.Remark = 'PASS';
        } else if (totalMarks >= 60) {
            report.Grade = 'B';
            report.Remark = 'PASS';
        } else if (totalMarks >= 50) {
            report.Grade = 'C';
            report.Remark = 'Pass';
        } else {
            report.Grade = 'F';
            report.Remark = 'Fail';
        }

        // Add classId and courseId to the report
        report.ClassId = classId;
        report.CourseId = courseId;
    });

    // Add reports to the database
    await Report.addReports(reports);

    res.status(200).json({ success: true, message: 'Reports added successfully!' });
}));

module.exports = router;
