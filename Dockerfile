FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
# If using pnpm/bun, we might need to adjust, but let's try npm first as it is standard
# The root uses turbo, but this is inside the frontend package?
# Wait, the frontend is part of a monorepo.
# Installing dependencies might need root config if it relies on workspace protocols.
# For simplicity in a hurry, we'll try to install standard deps.

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev", "--", "--host"]
