const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.showRegister = (req, res) => {
    res.render('register', { error: null });
};

exports.register = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Validate input
        if (!name || !email || !password || !role) {
            return res.render('register', { error: 'All fields are required' });
        }

        // Check if user exists
        const existingUser = await User.findByEmail(email);
        if (existingUser) {
            return res.render('register', { error: 'Email already registered' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await User.create(name, email, hashedPassword, role);

        res.redirect('/login');
    } catch (error) {
        console.error('Registration error:', error);
        res.render('register', { error: 'Registration failed. Please try again.' });
    }
};

exports.showLogin = (req, res) => {
    res.render('login', { error: null });
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.render('login', { error: 'Email and password are required' });
        }

        // Find user
        const user = await User.findByEmail(email);
        if (!user) {
            return res.render('login', { error: 'Invalid email or password' });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.render('login', { error: 'Invalid email or password' });
        }

        // Set cookies
        res.cookie('userId', user.id, { httpOnly: true });
        res.cookie('userRole', user.role, { httpOnly: true });
        res.cookie('userName', user.name, { httpOnly: true });

        // Redirect based on role
        res.redirect(`/${user.role}/dashboard`);
    } catch (error) {
        console.error('Login error:', error);
        res.render('login', { error: 'Login failed. Please try again.' });
    }
};

exports.logout = (req, res) => {
    res.clearCookie('userId');
    res.clearCookie('userRole');
    res.clearCookie('userName');
    res.redirect('/login');
};
