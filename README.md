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

```
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

![](img/01_formulario_principal.jpg)

## Cámara activada

![](img/02_camara_activada.jpg)

## Vista previa de la captura

![](img/03_vista_previa.jpg)

## Consulta de constantes

![](img/04_consulta_constantes.jpg)

## Consulta ascendente

![](img/05_consulta_ascendente.jpg)

## Consulta descendente

![](img/06_consulta_descendente.jpg)

## Alta exitosa

![](img/07_alta_exitosa.jpg)

## Login exitoso

![](img/08_login_exitoso.jpg)

---

# 🗄 Evidencias de la base de datos

## Base de datos en HeidiSQL

![](img/09_base_datos_heidisql.jpg)

## Tabla constantes

![](img/10_tabla_constantes.jpg)

## Tabla login

![](img/11_tabla_login.jpg)

## Tabla nombre

![](img/12_tabla_nombre.jpg)

## Tabla apellido paterno

![](img/13_tabla_papellido.jpg)

## Tabla apellido materno

![](img/14_tabla_sapellido.jpg)

## Tabla nacimiento

![](img/15_tabla_nacimiento.jpg)

## Tabla géneros

![](img/16_tabla_generos.jpg)

## Tabla fotografías

![](img/17_tabla_fotos.jpg)

## Tabla mensajes

![](img/18_tabla_mensajes.jpg)

---

# 💻 Código fuente

## Formulario HTML

![](img/19_codigo_formulario.jpg)

## JavaScript (Cámara)

![](img/20_codigo_camara_javascript.jpg)

## AJAX

![](img/21_codigo_ajax.jpg)

## Servicios PHP

![](img/22_codigo_servicios_php.jpg)

## Usuarios PHP

![](img/23_codigo_usuarios_php.jpg)

## Conexión a la base de datos

![](img/24_codigo_base_datos_php.jpg)

## Estructura del proyecto

![](img/25_estructura_proyecto.jpg)

---

# 🚀 Instalación

1. Instalar **XAMPP**.
2. Iniciar los servicios **Apache** y **MariaDB**.
3. Importar el archivo **usuarios.sql**.
4. Copiar la carpeta del proyecto dentro de **htdocs**.
5. Abrir el navegador.
6. Ejecutar la siguiente dirección:

```
http://localhost/Formulario_camara/
```

---

# 👨‍💻 Autora

**Juana Isabel Perez Lopez**

Ingeniería en Sistemas Computacionales

Instituto Tecnológico Superior de Misantla

---

# 📄 Licencia

Proyecto desarrollado con fines académicos.
