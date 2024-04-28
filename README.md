# backendADS
 servidor en node js



Como Configurar:
* tener instalado node.js

1. clonar el repositorio

tener algun servidor de base de datos (de preferencia mysql)
ejecutar el sql que esta en /sql/BeeMeet.sql
configurar el archivo .env con DATABASE_URL="mysql://usuario:password@localhost:3306/nameDataBase"


2. ejecutar 'npm install'
3. ejecutar 'npx prisma generate'


Una vez configurado ejecutamos en una consola
1. 'npm run dev'

En otra consola ejecutamos
1.  npx prisma studio


Abrimos un navegador y entramos a 

localhost:3000