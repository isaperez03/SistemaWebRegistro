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

![](img/01_formulario_principal.png)

## Cámara activada

![](img/02_camara_activada.png)

## Vista previa de la captura

![](img/03_vista_previa.png)

## Consulta de constantes

![](img/04_consulta_constantes.png)

## Consulta ascendente

![](img/05_consulta_ascendente.png)

## Consulta descendente

![](img/06_consulta_descendente.png)

## Alta exitosa

![](img/07_alta_exitosa.png)

## Login exitoso

![](img/08_login_exitoso.png)

---

# 🗄 Evidencias de la base de datos

## Base de datos en HeidiSQL

![](img/09_base_datos_heidisql.png)

## Tabla constantes

![](img/10_tabla_constantes.png)

## Tabla login

![](img/11_tabla_login.png)

## Tabla nombre

![](img/12_tabla_nombre.png)

## Tabla apellido paterno

![](img/13_tabla_papellido.png)

## Tabla apellido materno

![](img/14_tabla_sapellido.png)

## Tabla nacimiento

![](img/15_tabla_nacimiento.png)

## Tabla géneros

![](img/16_tabla_generos.png)

## Tabla fotografías

![](img/17_tabla_fotos.png)

## Tabla mensajes

![](img/18_tabla_mensajes.png)

---

# 💻 Código fuente

## Formulario HTML

![](img/19_codigo_formulario.png)

## JavaScript (Cámara)

![](img/20_codigo_camara_javascript.png)

## AJAX

![](img/21_codigo_ajax.png)

## Servicios PHP

![](img/22_codigo_servicios_php.png)

## Usuarios PHP

![](img/23_codigo_usuarios_php.png)

## Conexión a la base de datos

![](img/24_codigo_base_datos_php.png)

## Estructura del proyecto

![](img/25_estructura_proyecto.png)

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
