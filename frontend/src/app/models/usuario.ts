// Exportamos la clase
export class Usuario {
  // Constructor
  constructor(
    public _id: String,
    public nombres: String,
    public apellidos: String,
    public edad: Number,
    public correo: String,
    public pass: String,
    public rol: String,
    public getToken: boolean
  ) {}
}
