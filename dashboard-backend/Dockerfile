# Node.js image'ı kullanma
FROM node:16

# Çalışma dizinini ayarlama
WORKDIR /app

# package.json ve package-lock.json'ı kopyalama
COPY package*.json ./

# PostgreSQL client yükleme
RUN apt-get update && apt-get install -y postgresql-client && rm -rf /var/lib/apt/lists/*

# Bağımlılıkları kur
RUN npm install

# Tüm backend kodlarını kopyalama
COPY . .

# Port tanımlama
EXPOSE 5000

