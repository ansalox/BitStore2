// Exportamos la clase
export class Curso {
  // Constructor
  constructor(
    public _id: String,
    public nombre: String,
    public descripcion: String,
    public imagen: String,
    public precioTotal: Number,
    public precioCompra: Number,
    public cupos: Number,
    public idCategoria: String,
    public puntos: Number
  ) {}
}
