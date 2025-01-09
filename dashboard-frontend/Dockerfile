# Node.js image'ı kullanma
FROM node:16

# Çalışma dizinini ayarlama
WORKDIR /app

# package.json ve package-lock.json'ı kopyalama
COPY package*.json ./

# Bağımlılıkları kurma
RUN npm install

# Tüm frontend kodlarını kopyalama
COPY . .

# Port tanımlama
EXPOSE 5173

