FROM nginx:alpine
#Compiled Angular app in nginx directory kopieren
COPY school-system /usr/share/nginx/html
# Standard http port exposen
EXPOSE 80
# Nginx ausführen
CMD ["nginx", "-g", "daemon off;"]

