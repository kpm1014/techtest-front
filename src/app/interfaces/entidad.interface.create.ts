export default interface CreateEntidad {
    tipoDocumento: { idTipoDocumento: number };
    tipoContribuyente: { idTipoContribuyente: number };
    nroDocumento: string;
    razonSocial: string;
    nombreComercial: string;
    direccion: string;
    telefono: string;
    estado: boolean;
  }