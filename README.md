# 📷 Formulario con Cámara

Sistema web desarrollado como práctica académica que permite registrar usuarios mediante un formulario HTML, utilizando la cámara del dispositivo para capturar una fotografía y almacenarla en una base de datos MariaDB.

---

# 📖 Descripción

El proyecto consiste en una aplicación web desarrollada con HTML, CSS, JavaScript, AJAX y PHP que permite realizar operaciones CRUD (Altas, Bajas, Cambios y Consultas) sobre usuarios registrados.

Como característica principal, el sistema hace uso de la API **getUserMedia()** del navegador para acceder a la cámara web, capturar una fotografía y almacenarla codificada en Base64 dentro de la base de datos.

---

# ✨ Características

- Registro de usuarios.
- Captura de fotografía mediante cámara web.
- Vista previa de la fotografía capturada.
- Almacenamiento de imágenes en Base64.
- Consulta de usuarios.
- Consulta ascendente.
- Consulta descendente.
- Inicio de sesión.
- Edición de registros.
- Eliminación de registros.
- Validación de datos.
- Conexión con MariaDB mediante PHP.

---

# 🛠 Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- AJAX
- PHP
- MariaDB
- HeidiSQL
- Visual Studio Code
- XAMPP

---

# 📂 Estructura del proyecto

```text
FORMULARIO_CAMARA
│
├── PHP
│   ├── BD.php
│   ├── proxy.php
│   ├── servicios.php
│   └── usuarios.php
│
├── ajax.js
├── index.css
├── index.html
├── index.js
├── indexV.js
│
├── usuarios.sql
└── Consulta #2.sql
```

---

# ⚙ Funcionamiento

1. El usuario llena el formulario.
2. Activa la cámara del dispositivo.
3. Captura una fotografía.
4. La imagen se convierte a formato Base64.
5. Los datos se envían mediante AJAX.
6. PHP procesa la solicitud.
7. MariaDB almacena la información.
8. El sistema permite consultar, modificar y eliminar registros.

---

# 🗄 Base de datos

La base de datos utilizada es **usuarioss**.

Tablas principales:

- constantes
- login
- nombre
- papellido
- sapellido
- nacimiento
- generos
- fotos
- mensajes

---

# 📸 Evidencias del sistema

## Formulario principal

![](img/01_formulario_principal.png)

## Captura de fotografía

![](img/02_captura_fotografia.png)

## Consulta de constantes

![](img/03_consulta_constantes.png)

## Consulta de usuarios (ascendente)

![](img/04_consulta_usuarios_ascendente.png)

## Consulta de usuarios (descendente)

![](img/05_consulta_usuarios_descendente.png)

## Alta de usuario exitosa

![](img/06_alta_usuario_exitosa.png)

## Login exitoso

![](img/07_login_exitoso.png)

---

# 🗄 Evidencias de la base de datos

## Base de datos en HeidiSQL

![](img/08_base_datos_heidisql.png)

## Tabla login

![](img/09_tabla_login.png)

## Tabla nombre

![](img/10_tabla_nombre.png)

## Tabla apellido paterno

![](img/11_tabla_papellido.png)

## Tabla apellido materno

![](img/12_tabla_sapellido.png)

## Tabla nacimiento

![](img/13_tabla_nacimiento.png)

## Tabla géneros

![](img/14_tabla_generos.png)

## Tabla fotografías

![](img/15_tabla_fotos.png)

## Tabla mensajes

![](img/16_tabla_mensajes.png)

## Tabla constantes

![](img/17_tabla_constantes.png)

---

# 💻 Código fuente

## Formulario HTML

![](img/18_codigo_formulario.png)

## JavaScript (Cámara)

![](img/19_codigo_camara_javascript.png)

## AJAX

![](img/20_codigo_ajax.png)

## Servicios PHP

![](img/21_codigo_servicios_php.png)

## Usuarios PHP

![](img/22_codigo_usuarios_php.png)

## Conexión a la base de datos

![](img/23_codigo_base_datos_php.png)

## Estructura del proyecto

![](img/24_estructura_proyecto.png)

---

# 🚀 Instalación

1. Instalar **XAMPP**.
2. Iniciar los servicios **Apache** y **MariaDB**.
3. Importar el archivo **usuarios.sql**.
4. Copiar la carpeta **FORMULARIO_CAMARA** dentro de **htdocs**.
5. Abrir el navegador.
6. Ejecutar la siguiente dirección:

```text
http://localhost/Formulario_camara/
```

---

# 👩‍💻 Autora

**Juana Isabel Perez Lopez**

Ingeniería en Sistemas Computacionales

Instituto Tecnológico Superior de Misantla

---

# 📄 Licencia

Proyecto desarrollado con fines académicos.
