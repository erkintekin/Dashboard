# Role Management Dashboard

Bu projede bir backend, frontend ve PostgreSQL veritabanı kullanılarak bir role management dashboard geliştirilmiştir. Bu rehber, projeyi nasıl kurup çalıştıracağınızı adım adım anlatmaktadır.

### Overview (Genel Bakış) 

e-Ticaret siteniz için Satış Genel Bakışı, Kategori Dağılımı, Kanal Üzerinden Satışlar için grafikleri görüntüleyebilirsiniz.

### Products (Ürünler)

e-Ticaret siteniz için Ürün Yönetimini kolaylıkla burada yapabilirsiniz. Ürün eklemek, listelemek, düzenlemek ve silmek için Ürün Listesi'ni kullanabilirsiniz. Ayrıca Satış Eğrisi ve Kategori Dağılımı tabloları ile şirketiniz için daha iyi analizler yapabilirsiniz.

### Orders (Siparişler)

Bu kısımda Günlük Siparişlerinizin grafiğini görüntüleyebilir, Sipariş Statüsü Dağılımı grafiği ile analizlerinize devam ederken Sipariş Listesi ile bütün siparişlerinizi görüntüleyebilirsiniz

### Sales (Satışlar)

Satış Genel Görünümü, Kategorilere Göre Satışlar ve Günlük Satış Eğilimi grafikleri tam size göre!

### Analytics (Analiz)

Kar vs Hedef tablosu ile hedeflerinize ne kadar yakın olduğunuzu görün! Kanal Performansı, Ürün Performansı, Kullanıcı Tutma ve Müşteri Dağılımı grafikleri ile gelişim rotanızı belirleyin! AI Insights ile AI'dan tam destek alın!

### Settings (Ayarlar)

Profilinizi burada görüntüleyebilir, düzenleyebilirsiniz. Google, Facebook ile hesabınızı bağlayın, kolaylığı yaşayın!

## Gereksinimler

Projeyi çalıştırmak için aşağıdaki araçların bilgisayarınızda kurulu olması gerekmektedir:

- **Node.js** (18.0.0 ve üzeri)
- **npm** (Node Package Manager)
- **Docker** (PostgreSQL için)
- **Docker Compose**

## Kurulum ve Başlatma Adımları

### 1. Projeyi İndirin

GitHub'dan projeyi klonlayın:

```bash
git clone https://github.com/username/repository-name.git
```

Ardından proje klasörüne girin:

```bash
cd repository-name
```

### 2. Veritabanını Başlatma
PostgreSQL veritabanını Docker üzerinden çalıştırmak için aşağıdaki adımları takip edin:

Docker Compose'u başlatın:

```bash
docker-compose up --build
```
Bu komut, PostgreSQL'i yapılandırır ve role_management veritabanını oluşturur.

PostgreSQL veritabanının başarılı bir şekilde çalıştığını doğrulamak için:

```bash
docker ps
```
Çıktıda postgres_container adında bir konteyner çalıştığını görmelisiniz.

Veritabanı migrasyonlarını ve seed işlemlerini çalıştırmak için backend dizinine gidin ve şu komutları çalıştırın:

```bash
cd dashboard-backend
npm install
npx knex migrate:latest
npx knex seed:run
```
Eğer npm install çalıştırırken hata alıyorsanız PowerShell'den aşağıdaki komutu giriniz

```bash
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

### 3. Backend'i Başlatma
Backend sunucusunu başlatmak için:

Backend dizinine gidin:

```bash
cd dashboard-backend
```
Gerekli bağımlılıkları yükleyin:

```bash
npm install
```

Backend sunucusunu başlatın:

```bash
node server.js
```

Backend sunucusu, http://localhost:5000 adresinde çalışacaktır.

### 4. Frontend'i Başlatma

Frontend'i çalıştırmak için:

Frontend dizinine gidin:

```bash
cd dashboard-frontend
```
Gerekli bağımlılıkları yükleyin:

```bash
npm install
```
Frontend'i başlatın:

```bash
npm start
```

Hesap şifrelerini öğrenmek için aşağıdaki bilgileri

```bash
   {
      name: "SuperAdmin",
      email: "superadmin@example.com",
      password: "superadmin123",
    },
    {
      id: 2,
      name: "Admin",
      email: "admin@example.com",
      password: "admin123",

    },
    {
      name: "User",
      email: "user@example.com",
      password: user123,
    }

```

ya da

Docker terminal'de aşağıdakı komutu girin

```bash
docker exec -it postgres_container psql -U postgres -d role_management
```
Sonrasında tüm tablolar için aşağıdaki komutu yazın

```bash
\dt
```

Aşağıdaki sorgu ile istediğiniz hesabın şifresine ulaşabilirsiniz

```bash
SELECT * FROM users;
```
Frontend, http://localhost:5173 adresinde çalışacaktır.

### Geliştirici Notları

Projeyi geliştirirken herhangi bir hata alırsanız, terminal çıktısını kontrol ederek eksik bağımlılıkları veya hataları çözebilirsiniz.

PostgreSQL'e erişmek için Docker logs komutunu kullanabilirsiniz:

```bash
docker logs postgres_container
```
### İletişim
Eğer herhangi bir sorunla karşılaşırsanız veya katkıda bulunmak isterseniz, lütfen benimle iletişime geçin.

Teşekkürler!
