# 🚀 Görev Yönetimi REST API (Task Manager API)

Bu proje, Node.js ve Express.js kullanılarak geliştirilmiş, uçtan uca CRUD operasyonlarına, gelişmiş filtreleme ve sayfalama özelliklerine, ayrıca özel bir veri doğrulama (validation) katmanına sahip profesyonel bir REST API projesidir. Temiz kod prensipleri ve MVC mimarisi temel alınarak tasarlanmıştır.

## ✨ Öne Çıkan Özellikler
* **Tam CRUD Operasyonları:** Görev oluşturma, listeleme, detay görüntüleme, güncelleme ve silme.
* **MVC Mimarisi:** Rotalar, controller'lar ve middleware'ler ayrı klasörlerde izole bir şekilde yönetilmektedir (`src/controllers`, `src/middlewares`).
* **Validation Middleware:** Sisteme eklenen veya güncellenen veriler, özel olarak yazılmış doğrulama katmanı sayesinde güvenlik süzgecinden geçirilir. Hatalı veya eksik veri girişleri engellenir.
* **Gelişmiş Veri Yönetimi:** URL üzerinden gönderilen Query parametreleri ile arama (search), duruma göre filtreleme (status) ve sayfalama (pagination) işlemleri yapılabilir.

## 📁 Proje Yapısı
```text
task-manager-api/
├── src/
│   ├── controllers/
│   │   └── taskController.js    # Veri işleme ve iş mantığı
│   └── middlewares/
│       └── validateTask.js      # Güvenlik ve veri doğrulama kalkanı
├── app.js                       # Ana uygulama ve sunucu yapılandırması
├── .gitignore                   # Git takip dışı dosyalar
└── package.json                 # Proje bağımlılıkları
