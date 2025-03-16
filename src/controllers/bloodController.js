const db = require('../db/database');
const PDFDocument = require('pdfkit');

exports.registerBlood = (req, res) => {
    const { value } = req.body;
    const date = new Date().toISOString().split('T')[0];

    db.run(`INSERT INTO blood_records (value, date) VALUES (?, ?)`, [value, date], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ id: this.lastID, value, date });
    });
};

exports.listBlood = (req, res) => {
    const { startDate, endDate } = req.query;

    db.all(`SELECT * FROM blood_records WHERE date BETWEEN ? AND ? ORDER BY date DESC`, 
        [startDate, endDate], 
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(200).json(rows);
        });
};

exports.deleteBlood = (req, res) => {
    const { id } = req.params;

    db.run(`DELETE FROM blood_records WHERE id = ?`, id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: 'Registro deletado com sucesso!' });
    });
};

exports.exportPdf = (req, res) => {
    const { startDate, endDate } = req.query;

    db.all(`SELECT * FROM blood_records WHERE date BETWEEN ? AND ? ORDER BY date DESC`, 
        [startDate, endDate], 
        (err, rows) => {
            if (err) return res.status(500).json({ error: err.message });

            const doc = new PDFDocument();
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', 'attachment; filename="glicemia.pdf"');

            doc.pipe(res);
            doc.fontSize(18).text('Relatório de Glicemia', { align: 'center' });
            doc.moveDown();

            rows.forEach(({ id, value, date }) => {
                doc.fontSize(14).text(`ID: ${id} | Valor: ${value} | Data: ${date}`);
            });

            doc.end();
        });
};
