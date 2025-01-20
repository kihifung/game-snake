# 使用 Node.js 基礎映像作為構建階段
FROM node:18-alpine AS build

# 設定工作目錄
WORKDIR /app

# 複製專案配置文件
COPY package.json package-lock.json ./

# 安裝專案依賴
RUN npm install

# 複製專案所有文件到容器
COPY . .

# 建立靜態檔案
RUN npm run build

# 使用 Nginx 作為靜態檔案伺服器
FROM nginx:alpine

# 複製構建產物到 Nginx 預設的靜態資源目錄
COPY --from=build /app/dist /usr/share/nginx/html

# 暴露 Nginx HTTP 埠
EXPOSE 80

# 啟動 Nginx
CMD ["nginx", "-g", "daemon off;"]

