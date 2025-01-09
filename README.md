# Role Management Dashboard

Bu projede bir backend, frontend ve PostgreSQL veritabanı kullanılarak bir role management dashboard geliştirilmiştir. Bu rehber, projeyi nasıl kurup çalıştıracağınızı adım adım anlatmaktadır.

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
