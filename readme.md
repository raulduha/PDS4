Proyecto pds4 - Estación de Casilleros
Este proyecto tiene como objetivo implementar una Estación de Casilleros digital que permita a los usuarios reservar casilleros, cargar y retirar paquetes, así como verificar el estado de los casilleros. El sistema se compone de un backend desarrollado en Django y un frontend en React.js.

Backend (Django)
Requisitos:
Python 3.x
Pip
Inicialización:
Navega a la carpeta backend:

cd backend

Activa el entorno virtual:

source venv/bin/activate  # En sistemas basados en UNIX
venv\Scripts\activate  # En Windows

Instala las dependencias:

pip install -r requirements.txt

Ejecutar el servidor:

python manage.py runserver

Creación de superusuario:
Si no has creado un superusuario para el admin de Django, hazlo con el siguiente comando:

python manage.py createsuperuser
Sigue las instrucciones para configurar tu usuario y contraseña.

Frontend (React.js)
Requisitos:
Node.js
npm o yarn
Inicialización:
Navega a la carpeta frontend:

cd frontend

Instala las dependencias:

npm install
# o
yarn install

Ejecutar la aplicación:

npm start
# o
yarn start