#!/bin/bash

# Parar os containers do Docker
echo "Desligando os containers Docker..."
docker compose down

# Remover a pasta de dados com permissão elevada
echo "Removendo pasta de dados..."
sudo rm -rf data/

# Subir os containers novamente
echo "Subindo os containers Docker..."
docker compose up -d

# Aguardar o banco e a aplicação subirem
echo "Aguardando o banco e a aplicação iniciarem..."
sleep 5  # Ajuste o tempo conforme necessário

# Rodar as migrations do Prisma
echo "Executando migrations do Prisma..."
npx prisma migrate deploy

# (Opcional) Rodar seeds do Prisma, se houver
# echo "Executando seeds do Prisma..."
# npx prisma db seed

# Iniciar a aplicação em modo dev
echo "Iniciando a aplicação..."
npm run start:dev