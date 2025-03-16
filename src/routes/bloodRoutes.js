const express = require('express');
const { registerBlood, listBlood, deleteBlood, exportPdf } = require('../controllers/bloodController');

const router = express.Router();

router.post('/registerBlood', registerBlood);
router.get('/listBlood', listBlood);
router.delete('/deleteBlood/:id', deleteBlood);
router.get('/exportPdf', exportPdf);

module.exports = router;
