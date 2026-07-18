class indexV {
  constructor(activar = true) {
    if (!activar) return;

    // ====== Inputs ======
    this.id         = document.querySelector("#id");
    this.nombre     = document.querySelector("#nombre");
    this.papellido  = document.querySelector("#papellido");
    this.sapellido  = document.querySelector("#sapellido");
    this.nacimiento = document.querySelector("#nacimiento");
    this.genero     = document.querySelector("#genero");
    this.curp       = document.querySelector("#curp");
    this.pwd        = document.querySelector("#pwd");

    // ====== Botones (CRUD) ======
    this.btnConst  = document.querySelector("#btnConst");
    this.btnAlta   = document.querySelector("#btnAlta");
    this.btnCambio = document.querySelector("#btnCambio");
    this.btnBaja   = document.querySelector("#btnBaja");
    this.btnAsc    = document.querySelector("#btnAsc");
    this.btnDesc   = document.querySelector("#btnDesc");
    this.btnCL     = document.querySelector("#btnCL");
    this.btnLogin  = document.querySelector("#btnLogin");

    // ====== Cámara ======
    this.camVideo   = document.querySelector("#camVideo");
    this.camCanvas  = document.querySelector("#camCanvas");
    this.camPreview = document.querySelector("#camPreview");
    this.camStart   = document.querySelector("#camStart");
    this.camShot    = document.querySelector("#camCapture");
    this.camClear   = document.querySelector("#camClear");
    this.camStop    = document.querySelector("#camStop");
    this.camBase64  = document.querySelector("#camBase64");

    // ====== Resultados ======
    this.tabla = document.querySelector("#tablaResultados");

    // Estado cámara/foto
    this._stream = null;
    this._fotoBase64 = "";

    this._initCamara();
    this._fijarDelegacionTabla();
  }

  // ====== Cámara ======
  _initCamara() {
    // Si no hay video/canvas no configuramos cámara
    if (!this.camVideo || !this.camCanvas) {
      console.warn("Elementos de cámara no encontrados (#camVideo / #camCanvas).");
      return;
    }

    // Activar cámara
    if (this.camStart) {
      this.camStart.addEventListener("click", async () => {
        try {
          if (this._stream) return;
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          this._stream = stream;
          this.camVideo.srcObject = stream;
          await this.camVideo.play();
          console.log("Cámara activada");
        } catch (err) {
          alert("No se pudo activar la cámara");
          console.error("Error getUserMedia:", err);
        }
      });
    }

    // Tomar foto
    if (this.camShot) {
      this.camShot.addEventListener("click", () => {
        if (!this._stream) {
          alert("Primero activa la cámara.");
          return;
        }

        const video  = this.camVideo;
        const canvas = this.camCanvas;
        const ctx    = canvas.getContext("2d");

        const w = video.videoWidth  || 640;
        const h = video.videoHeight || 480;

        if (!w || !h) {
          alert("La cámara aún no está lista, intenta de nuevo.");
          return;
        }

        canvas.width  = w;
        canvas.height = h;
        ctx.drawImage(video, 0, 0, w, h);

        const dataURL = canvas.toDataURL("image/jpeg", 0.9);
        this._fotoBase64 = dataURL;

        // Vista previa
        if (this.camPreview) {
          this.camPreview.src = dataURL;
          this.camPreview.style.display = "block";
        }

        // Guardar también en el textarea oculto
        if (this.camBase64) {
          this.camBase64.value = dataURL;
        }

        console.log("Foto capturada. Base64 length:", this._fotoBase64.length);
      });
    }

    // Limpiar foto
    if (this.camClear) {
      this.camClear.addEventListener("click", () => {
        this.limpiarFoto();
        console.log("Foto limpiada.");
      });
    }

    // Detener cámara
    if (this.camStop) {
      this.camStop.addEventListener("click", () => {
        if (this._stream) {
          this._stream.getTracks().forEach(t => t.stop());
          this._stream = null;
        }
        if (this.camVideo) {
          this.camVideo.srcObject = null;
        }
        console.log("Cámara detenida");
      });
    }
  }

  _obtenerFoto() {
    return this._fotoBase64 || "";
  }

  limpiarFoto() {
    this._fotoBase64 = "";
    if (this.camPreview) {
      this.camPreview.src = "";
      this.camPreview.style.display = "none";
    }
    if (this.camBase64) {
      this.camBase64.value = "";
    }
  }

  // ====== Formulario ======
  obtenerDatosFormulario() {
    const generoVal = this.genero && this.genero.value !== ""
      ? parseInt(this.genero.value)
      : -1;

    return {
      id:         (this.id?.value || "").trim(),
      nombre:     (this.nombre?.value || "").trim(),
      papellido:  (this.papellido?.value || "").trim(),
      sapellido:  (this.sapellido?.value || "").trim(),
      nacimiento: (this.nacimiento?.value || "").trim(),
      genero:     isNaN(generoVal) ? -1 : generoVal,
      login:      (this.curp?.value || "").trim().toUpperCase(),
      pwd:        (this.pwd?.value || "").trim(),
      foto:       this._obtenerFoto()
    };
  }

  cargarEnFormulario(data) {
    if (!data) return;
    if (this.id)         this.id.value         = data.id || "";
    if (this.nombre)     this.nombre.value     = data.nombre || "";
    if (this.papellido)  this.papellido.value  = data.papellido || "";
    if (this.sapellido)  this.sapellido.value  = data.sapellido || "";
    if (this.nacimiento) this.nacimiento.value = data.nacimiento || "";
    if (this.curp)       this.curp.value       = data.login || "";
    if (this.genero && data.genero !== undefined && data.genero !== null) {
      this.genero.value = data.genero;
    }
    if (this.pwd) this.pwd.value = "";
    this.limpiarFoto();
  }

  // ====== Manejo de respuesta AJAX (llamado por index.js) ======
  onRespuestaLista = (texto) => {
    console.log("Respuesta AJAX:", texto);
    let data;
    try {
      data = JSON.parse(texto);
    } catch (e) {
      console.error(e);
      this.mostrarEstado({ ok: 0, mensaje: "ERROR_DE_PROCESAMIENTO" });
      return;
    }

    // LOGIN especial
    if (data && data.respuesta) {
      this.mostrarEstado(data.respuesta);
      return;
    }

    if (Array.isArray(data)) {
      if (!data.length) {
        this.mostrarEstado({ ok: 0, mensaje: "CONSULTA_SIN_RESULTADOS" });
        return;
      }
      if ("constante" in data[0] && "valor" in data[0]) {
        this.mostrarTablaConstantes(data);
        return;
      }
      if ("id" in data[0]) {
        this.mostrarTablaUsuarios(data);
        return;
      }
      this.mostrarJSON(data);
      return;
    }

    if (typeof data === "object") {
      this.mostrarEstado(data);
      return;
    }

    this.mostrarEstado({ ok: 0, mensaje: "SIN_RESULTADO" });
  };

  // ====== Render helpers ======
  mostrarEstado(res) {
    if (!this.tabla) return;
    if (!res) {
      this.tabla.innerHTML = "Sin resultados";
      return;
    }
    const ok  = res.ok ?? "";
    const raw = res.mensaje ?? res.resultado ?? "";
    const msg = this._mapResultado(raw);

    this.tabla.innerHTML = `
      <div class="tabla">
        <table>
          <thead><tr><th>ok</th><th>mensaje</th></tr></thead>
          <tbody>
            <tr>
              <td>${this._escape(String(ok))}</td>
              <td>${this._escape(String(msg))}</td>
            </tr>
          </tbody>
        </table>
      </div>`;
  }

  mostrarJSON(obj) {
    if (!this.tabla) return;
    this.tabla.innerHTML =
      `<pre>${this._escape(JSON.stringify(obj, null, 2))}</pre>`;
  }

  mostrarTablaConstantes(lista) {
    if (!this.tabla) return;
    let h = `
      <div class="tabla">
      <table>
        <thead>
          <tr>
            <th>Constante</th>
            <th>Valor</th>
            <th>Numérica</th>
          </tr>
        </thead>
        <tbody>`;
    for (const c of lista) {
      h += `
        <tr>
          <td>${this._escape(c.constante)}</td>
          <td>${this._escape(c.valor)}</td>
          <td>${this._escape(c.numerica)}</td>
        </tr>`;
    }
    h += `</tbody></table></div>`;
    this.tabla.innerHTML = h;
  }

  mostrarTablaUsuarios(lista) {
    if (!this.tabla) return;
    let h = `
      <div class="tabla">
      <table>
        <thead>
          <tr>
            <th>Acciones</th>
            <th>Nombre</th>
            <th>Apellido paterno</th>
            <th>Apellido materno</th>
            <th>Nombre completo</th>
            <th>Fecha de nacimiento</th>
            <th>Género</th>
            <th>Foto</th>
          </tr>
        </thead>
        <tbody>`;
    for (const r of lista) {
      const id   = r.id || "";
      const nom  = r.nombre || "";
      const pap  = r.papellido || "";
      const sap  = r.sapellido || "";
      const nc   = r.nombrecompleto || r.nombreCompleto || "";
      const nac  = r.nacimiento || "";
      const gVal = r.genero;
      const genero = (gVal === 0) ? "Femenino" :
                     (gVal === 1) ? "Masculino" :
                     (gVal === 2) ? "Otro" : (gVal ?? "");

      const tieneFoto = r.foto && String(r.foto).trim() !== "" && String(r.foto).toLowerCase() !== "sin foto";
      
      const fotoHtml = tieneFoto
        ? `<button class="action-btn" data-action="foto" data-id="${this._escape(id)}">Ver foto</button>`
        : "Sin foto";

      h += `
        <tr data-id="${this._escape(id)}">
          <td class="acciones">
            <button class="action-btn edit"
              data-action="edit"
              data-id="${this._escape(id)}"
              data-nombre="${this._escapeAttr(nom)}"
              data-papellido="${this._escapeAttr(pap)}"
              data-sapellido="${this._escapeAttr(sap)}"
              data-nacimiento="${this._escapeAttr(nac)}"
              data-genero="${this._escapeAttr(gVal)}"
              data-login="${this._escapeAttr(r.login || "")}"
            >Editar</button>
            <button class="action-btn delete"
              data-action="delete"
              data-id="${this._escape(id)}"
            >Borrar</button>
          </td>
          <td>${this._escape(nom)}</td>
          <td>${this._escape(pap)}</td>
          <td>${this._escape(sap)}</td>
          <td>${this._escape(nc)}</td>
          <td>${this._escape(nac)}</td>
          <td>${this._escape(genero)}</td>
          <td>${fotoHtml}</td>
        </tr>`;
    }
    h += `</tbody></table></div>`;
    this.tabla.innerHTML = h;
  }

  // ====== Tabla: Editar / Borrar / Ver foto ======
  _fijarDelegacionTabla() {
    if (!this.tabla) return;
    this.tabla.addEventListener("click", ev => {
      const btn = ev.target.closest("button[data-action]");
      if (!btn) return;
      const action = btn.dataset.action;
      const id = btn.dataset.id || "";
      if (!action) return;

      if (action === "edit") {
        this.cargarEnFormulario(btn.dataset);
        return;
      }

      if (action === "delete") {
        if (window.controlador && confirm("¿Desea borrar este registro?")) {
          window.controlador.BAJAS(id);
        }
        return;
      }

      if (action === "foto") {
        this._verFoto(id);
      }
    });
  }

  _verFoto(id) {
    if (!id) return;
    fetch("PHP/proxy.php", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=UTF-8" },
      body: JSON.stringify({ servicio: "GET_FOTO", id })
    })
    .then(r => r.json())
    .then(d => {
      if (d && d.foto) {
        const w = window.open("", "_blank");
        if (w) {
          w.document.write(
            `<img src="${d.foto}" style="max-width:100%;height:auto;"/>`
          );
        }
      } else {
        alert("Sin foto");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Error al obtener la foto");
    });
  }

  // ====== Utils ======
  _mapResultado(v) {
    if (v === null || v === undefined) return "";
    if (typeof v === "number") {
      const mapa = {
        1:  "CONSULTA_EXITOSA",
        2:  "ALTA_EXITOSA",
        3:  "ALTA_FALLIDA",
        4:  "BAJA_EXITOSA",
        5:  "BAJA_FALLIDA",
        6:  "CAMBIO_EXITOSO",
        7:  "CAMBIO_FALLIDO",
        8:  "DATOS_INVALIDOS",
        9:  "LOGIN_EXISTENTE",
        10: "OPERACION_NO_PERMITIDA",
        11: "CONSULTA_SIN_RESULTADOS"
      };
      v = mapa[v] || v;
    }
    if (typeof v === "string" && /^[A-Z0-9_]+$/.test(v)) {
      return v
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/^\w/, c => c.toUpperCase());
    }
    return v;
  }

  _escape(str) {
    return String(str)
      .replace(/&/g,"&amp;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;")
      .replace(/'/g,"&#39;");
  }

  _escapeAttr(str) {
    return this._escape(str);
  }
}
