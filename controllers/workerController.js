const ProjectPost = require('../models/ProjectPost');
const Application = require('../models/Application');

exports.dashboard = async (req, res) => {
    try {
        const applications = await Application.findByWorkerId(req.cookies.userId);
        res.render('worker/dashboard', {
            userName: req.cookies.userName,
            applications
        });
    } catch (error) {
        console.error('Worker dashboard error:', error);
        res.status(500).send('Server Error');
    }
};

exports.viewJobs = async (req, res) => {
    try {
        const jobs = await ProjectPost.findAll();
        res.render('worker/jobs', {
            userName: req.cookies.userName,
            jobs
        });
    } catch (error) {
        console.error('View jobs error:', error);
        res.status(500).send('Server Error');
    }
};

exports.applyToJob = async (req, res) => {
    try {
        const { project_post_id } = req.body;

        if (!project_post_id) {
            return res.redirect('/worker/jobs');
        }

        await Application.create(req.cookies.userId, project_post_id);
        res.redirect('/worker/dashboard');
    } catch (error) {
        if (error.message === 'You have already applied to this job') {
            // Redirect with error (in production, use flash messages)
            return res.redirect('/worker/jobs');
        }
        console.error('Apply to job error:', error);
        res.status(500).send('Server Error');
    }
};
