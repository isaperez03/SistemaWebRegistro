let vista;
let controlador;

window.addEventListener("DOMContentLoaded", () => {
  vista = new indexV(true);
  controlador = new IndexCtrl(vista);
  controlador.init();

  window.controlador = controlador;
});

class IndexCtrl {
  constructor(vista) {
    this.vista = vista;
  }

  init() {
    const v = this.vista;
    if (v.btnConst)  v.btnConst.addEventListener("click", () => this.CONSTANTES());
    if (v.btnAlta)   v.btnAlta.addEventListener("click", () => this.ALTAS());
    if (v.btnCambio) v.btnCambio.addEventListener("click", () => this.CAMBIOS());
    if (v.btnBaja)   v.btnBaja.addEventListener("click", () => this.BAJAS());
    if (v.btnAsc)    v.btnAsc.addEventListener("click", () => this.CONSULTAS(1));
    if (v.btnDesc)   v.btnDesc.addEventListener("click", () => this.CONSULTAS(0));
    if (v.btnCL)     v.btnCL.addEventListener("click", () => this.CONSULTAS_LOGIN());
    if (v.btnLogin)  v.btnLogin.addEventListener("click", () => this.LOGIN());
  }

  // ===== Helpers =====
  _base(extra = {}) {
    const datos = this.vista.obtenerDatosFormulario();
    return Object.assign({}, datos, extra);
  }

  _send(payload) {
    ajax.post(payload, (txt) => {
      this.vista.onRespuestaLista(txt);
    });
  }

  // ===== Servicios =====

  CONSTANTES() {
    this._send({ servicio: "CONSTANTES" });
  }

  ALTAS() {
    this._send(this._base({ servicio: "ALTAS" }));
  }

  BAJAS(idDesdeTabla) {
    const id = idDesdeTabla || this.vista.obtenerDatosFormulario().id;
    if (!id) {
      alert("Selecciona un registro.");
      return;
    }
    this._send({ servicio: "BAJAS", id });
  }

  CAMBIOS() {
    const d = this.vista.obtenerDatosFormulario();
    if (!d.id) {
      alert("Selecciona un registro primero.");
      return;
    }
    this._send(this._base({ servicio: "CAMBIOS" }));
  }

  CONSULTAS(orden) {
    this._send({ servicio: "CONSULTAS", orden });
  }

  CONSULTAS_LOGIN() {
    const d = this.vista.obtenerDatosFormulario();
    if (!d.login) {
      alert("Ingresa el login a buscar.");
      return;
    }
    this._send({ servicio: "CONSULTAS_LOGIN", login: d.login });
  }

  LOGIN() {
    const d = this.vista.obtenerDatosFormulario();
    if (!d.login || !d.pwd) {
      alert("Ingresa login y contraseña.");
      return;
    }
    this._send({ servicio: "LOGIN", login: d.login, pwd: d.pwd });
  }
}
