import { Component } from '@angular/core';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html'
})
export class EditarProductoComponent {
  producto : Producto = new Producto();
  id: number;

  constructor(private productoService: ProductoService, 
    private ruta: ActivatedRoute,
    private enrutador: Router){}

  ngOnInit(){
      this.id = this.ruta.snapshot.params['id'];
      this.productoService.obtenerProductoPorId(this.id).subscribe({
        next: (datos) => {
            console.log(datos);
            this.producto = datos;
         },
        error: (error:any) => { console.log(error)}
      })
    }
  onSubmit(){
    this.guardarProducto();
  }
  guardarProducto(){
    this.productoService.editarProducto(this.id,this.producto).subscribe(
      {
        next: (datos) =>{this.irProductoLista();},
        error:(errores : any) => {console.log(errores);}
      }
    );
  }

  irProductoLista(){
    this.enrutador.navigate(['/productos']);
  }

}
