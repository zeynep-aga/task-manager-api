// Geçici Veritabanımız (JavaScript Dizisi)
let tasks = [
    { id: 1, title: "Proje Kurulumu", description: "Node.js ve Express kurulacak", status: "Tamamlandı" },
    { id: 2, title: "CRUD İşlemleri", description: "Görev ekleme, silme, güncelleme yazılacak", status: "Devam Ediyor" }
];

// --- CONTROLLER FONKSİYONLARI ---

// 1. Gelişmiş Görev Listeleme (Filtreleme, Arama, Sayfalama)
const getAllTasks = (req, res) => {
    // Kullanıcının URL sonuna eklediği query parametrelerini alıyoruz
    const { status, search, page = 1, limit = 10 } = req.query;
    
    // Veritabanının kopyasını alıyoruz ki orijinal veri bozulmasın
    let filteredTasks = [...tasks];

    // FİLTRELEME: Eğer URL'de status gönderilmişse (Örn: ?status=Tamamlandı)
    if (status) {
        filteredTasks = filteredTasks.filter(t => t.status === status);
    }

    // ARAMA: Eğer URL'de search gönderilmişse (Örn: ?search=kurulum)
    if (search) {
        filteredTasks = filteredTasks.filter(t => 
            t.title.toLowerCase().includes(search.toLowerCase()) || 
            t.description.toLowerCase().includes(search.toLowerCase())
        );
    }

    // SAYFALAMA: Hangi sayfada kaç veri gösterilecek (Örn: ?page=1&limit=5)
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedTasks = filteredTasks.slice(startIndex, endIndex);

    // Gelişmiş JSON yanıtı döndürüyoruz
    res.status(200).json({
        toplamKayit: filteredTasks.length,
        suAnkiSayfa: Number(page),
        sayfaBasinaKayit: Number(limit),
        veri: paginatedTasks
    });
};

// 2. Görev Detayı Getirme
const getTaskById = (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find(t => t.id === taskId);
    if (!task) return res.status(404).json({ mesaj: "Görev bulunamadı!" });
    res.status(200).json(task);
};

// 3. Yeni Görev Oluşturma
const createTask = (req, res) => {
    const { title, description, status } = req.body;
    const newTask = {
        id: tasks.length > 0 ? tasks[tasks.length - 1].id + 1 : 1,
        title,
        description,
        status: status || "Bekliyor"
    };
    tasks.push(newTask);
    res.status(201).json({ mesaj: "Görev başarıyla eklendi", task: newTask });
};

// 4. Görev Güncelleme
const updateTask = (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return res.status(404).json({ mesaj: "Güncellenecek görev bulunamadı!" });
    
    tasks[taskIndex] = { ...tasks[taskIndex], ...req.body };
    res.status(200).json({ mesaj: "Görev güncellendi", task: tasks[taskIndex] });
};

// 5. Görev Silme
const deleteTask = (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return res.status(404).json({ mesaj: "Silinecek görev bulunamadı!" });
    
    const deletedTask = tasks.splice(taskIndex, 1);
    res.status(200).json({ mesaj: "Görev başarıyla silindi", task: deletedTask[0] });
};

// Diğer dosyalarda kullanabilmek için fonksiyonları dışa aktarıyoruz
module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};