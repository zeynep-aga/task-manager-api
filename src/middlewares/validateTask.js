// src/middlewares/validateTask.js içeriği

const validateTask = (req, res, next) => {
    const { title, description } = req.body;

    // Başlık kontrolü
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({ 
            hata: "Geçerli bir 'title' (başlık) alanı zorunludur!" 
        });
    }

    // Açıklama kontrolü
    if (!description || typeof description !== 'string' || description.trim() === '') {
        return res.status(400).json({ 
            hata: "Geçerli bir 'description' (açıklama) alanı zorunludur!" 
        });
    }

    // Eğer hiçbir hata yoksa, isteğin Controller'a gitmesine izin ver
    next();
};

module.exports = validateTask;