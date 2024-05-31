import { Component, OnInit } from '@angular/core';
import EntidadResumen from '../../interfaces/entidad-summary.interface';
import { EntidadService, TipoDocumentoService, TipoContribuyenteService } from '../../services/index.services';
import { firstValueFrom } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import CreateEntidad from '../../interfaces/entidad.interface.create';
import { CrudTipoDocumentoComponent } from '../crud-tipo-documento/crud-tipo-documento.component';
import { CrudTipoContribuyenteComponent } from '../crud-tipo-contribuyente/crud-tipo-contribuyente.component';


@Component({
	selector: 'app-crud-entidad',
	standalone: true,
  providers: [TipoDocumentoService, TipoContribuyenteService],
	imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterModule, CrudTipoContribuyenteComponent, CrudTipoDocumentoComponent],
	templateUrl: './crud-entidad.component.html',
	styleUrl: './crud-entidad.component.css'
})

export class CrudEntidadComponent implements OnInit{
	entidades: EntidadResumen[] = [];
	entidadSeleccionada: EntidadResumen | null = null;
	entidadCompleta: any = null;
	nuevoIdEntidad: number | null = null;
	entidadNoEncontrada: boolean = false;
	nuevaEntidad!: CreateEntidad;
  tiposDocumento:any[] = [];
  tiposContribuyente:any[] = [];

	constructor(private entidadService: EntidadService,
		private modalService: NgbModal,
    private tipoContribuyenteService: TipoContribuyenteService,
    private tipoDocumentoService: TipoDocumentoService
	) {
		this.limpiarCampos();
	}

	async ngOnInit(): Promise<void> {
		await this.getAllEntidades();
    await this.loadTiposContribuyente();
    await this.loadTiposDocumento();
	}

	ocultarJSON() {
		this.entidadCompleta = null;
	}

  limpiarCampos() {
    this.nuevaEntidad = {
      tipoDocumento: { idTipoDocumento: 0 },
      tipoContribuyente: { idTipoContribuyente: 0 },
      nroDocumento: '',
      razonSocial: '',
      nombreComercial: '',
      direccion: '',
      telefono: '',
      estado: true
    };
  }

	openModal(content: any) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
	}

  async loadTiposDocumento() {
    const values =  await firstValueFrom(this.tipoDocumentoService.getAllTipoDocumentos());
    this.tiposDocumento = values;
  }
  
  async loadTiposContribuyente() {
    const values =  await firstValueFrom(this.tipoContribuyenteService.getAllTipoContribuyentes());
    this.tiposContribuyente = values;
  }

	async createEntidad(): Promise<void> {
    try {
      await firstValueFrom(this.entidadService.createEntidad(this.nuevaEntidad));  
      await this.getAllEntidades();
      this.limpiarCampos();
      this.modalService.dismissAll();
    } catch (error) {
      console.error('Error al crear el tipo de contribuyente:', error);
    }	
  }

	async getAllEntidades(): Promise<void> {
		try {
			this.entidades = await firstValueFrom(this.entidadService.getAllEntidades());
		} catch (error) {
			console.error('Error al obtener las entidades:', error);
		}
	}

	async searchEntidadById(): Promise<void> {
		if (this.nuevoIdEntidad !== null) {
			this.entidadNoEncontrada = false;
			try {
				this.entidadCompleta = await firstValueFrom(this.entidadService.getEntidadById(this.nuevoIdEntidad));
			} catch (error: any) {
				console.error('Error al buscar la entidad:', error);
				if (error && error.status === 404) {
					this.entidadNoEncontrada = true;
				}
			}
		}
	}

	async deleteEntidad(idEntidad: number): Promise<void> {
		try {
			await firstValueFrom(this.entidadService.deleteEntidad(idEntidad));
			console.log('Entidad eliminada correctamente');
			await this.getAllEntidades();
		} catch (error) {
			console.error('Error al eliminar la entidad:', error);
		}
	}

	async detailsEntidad(entidad: EntidadResumen): Promise<void> {
		this.entidadSeleccionada = entidad;
		try {
			this.entidadCompleta = await firstValueFrom(this.entidadService.getEntidadById(entidad.idEntidad));
		} catch (error) {
			console.error('Error al obtener los detalles de la entidad:', error);
		}
	}

}
