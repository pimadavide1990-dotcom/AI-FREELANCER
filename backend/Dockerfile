# 1. Usa un'immagine base ufficiale leggera (Alpine Linux)
FROM node:20-alpine AS builder

# 2. Imposta la directory di lavoro
WORKDIR /app

# 3. Copia i file delle dipendenze
COPY package*.json ./

# 4. Installa le dipendenze di produzione
RUN npm ci --only=production

# --- Immagine Finale di Produzione (Multi-stage build per sicurezza) ---
FROM node:20-alpine AS runner

WORKDIR /app

# 5. SICUREZZA: Crea un utente e un gruppo non-root dedicati
RUN addgroup -g 1001 -S nodegroup && \
    adduser -u 1001 -S nodeuser -G nodegroup

# 6. Copia le dipendenze e il codice sorgente dalla fase precedente
COPY --from=builder /app/node_modules ./node_modules
COPY package.json ./
COPY server.js ./

# 7. Assegna la proprietà dei file all'utente non-root
RUN chown -R nodeuser:nodegroup /app

# 8. Passa all'utente non-root per l'esecuzione
USER nodeuser

# 9. Espone la porta del backend
EXPOSE 5000

# 10. Comando di avvio dell'applicazione
CMD ["node", "server.js"]