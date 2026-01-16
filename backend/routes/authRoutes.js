const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/login', (req, res) => authController.login(req, res));
router.post('/cadastro', (req, res) => authController.cadastro(req, res));
router.post('/logout', (req, res) => authController.logout(req, res));

module.exports = router;