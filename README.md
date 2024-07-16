# backendADS
 servidor en nodejs y express para gestionar las invitaciones y accesos a personas invitadas a reuniones en una empresa para facilitar el acceso y registro de los dispositivos y personas que tienen acceso a las reuniones.



## instalacion
### previos:
* tener instalado node.js
1. verificar en consola: ```node --version``` salida: v22.0.0
2. verificar en consola ```npm -v```: 10.5.1
3. tener instalado mysql server


### pasos:
1. clonar el repositorio
2. ejecutar ```npm install```
3. ejecutar ```npx prisma generate```
* configurar el archivo .env con DATABASE_URL="mysql://usuario:password@localhost:3306/beemeet"
4. ejecutar ```npx prisma migrate dev --name "ubuntu6"```
5. ejecutar ```mysql -u root -p -D beemeet < ./sql/noUsar.sql```




## Ejecutar
1. En una consola ejecutar el servidor http: ```npm run dev```
2. En otra consola ejecutar el manejador de la base de datos prisma orm ```npx prisma studio```
3. En una pestaña del navegador accedemos a ```localhost:3000```


instrucciones para modificar la base de datos.

1. modificar el esquema en ./prisma/schema.prisma
2. ejecutar ```npx prisma migrate dev --name "nombre_del_cambio"```
3. modificar el archivo ./sql/noUsar.sql por si hay tablas que añadiste y eliminar los datos que se tengan 
4. añadir datos de prueba -> ejecutar ```mysql -u root -p -D beemeet < ./sql/noUsar.sql```
5. listo! si todo esta correcto puedes volver a ejeutar ```npx prisma studio```
