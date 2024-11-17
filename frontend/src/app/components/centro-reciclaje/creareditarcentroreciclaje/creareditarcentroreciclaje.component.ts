import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CentroReciclajeService } from '../../../services/centro-reciclaje.service';
import { CentroReciclaje } from './../../../models/CentroReciclaje';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';


import { Usuario } from '../../../models/Usuario';
import { UsuarioService } from '../../../services/usuario.service';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { GoogleMap, GoogleMapsModule, MapMarker } from '@angular/google-maps';
import { MatFormFieldModule } from '@angular/material/form-field';
import { LoginService } from '../../../services/login.service';
import { MatIconModule } from '@angular/material/icon';
import { NgxMaskModule} from 'ngx-mask';
import { FavoritosService } from '../../../services/favoritos.service';

declare var google: any;  

@Component({
  selector: 'app-creareditarcentroreciclaje',
  standalone: true,
  imports: [MatInputModule, MatSelectModule, 
    MatDatepickerModule, MatNativeDateModule, 
    MatButtonModule, ReactiveFormsModule, 
    CommonModule, NgxMaterialTimepickerModule, 
    GoogleMap, MapMarker, GoogleMapsModule,  
    MatCheckboxModule, MatFormFieldModule, 
    MatIconModule, NgxMaskModule],  
  templateUrl: './creareditarcentroreciclaje.component.html',
  styleUrl: './creareditarcentroreciclaje.component.css'
})
export class CreareditarcentroreciclajeComponent implements OnInit, AfterViewInit{
  form: FormGroup = new FormGroup({});
  centroReciclaje: CentroReciclaje = new CentroReciclaje(); 
  id: number = 0;
  filteredAddresses: string[] = [];
  placesService: any;
  autocomplete: any;
  geocoder: any;

  edicion: boolean = false;

//API
  lat=0
  lng=0
  center: google.maps.LatLngLiteral = { lat: -12.1040489, lng: -76.9654806 }; 
  zoom: number = 15; // Nivel de zoom
  markerPosition: google.maps.LatLngLiteral = { lat:this.lat, lng:this.lng};

  role: string = '';
  @ViewChild('direccionInput') direccionInput!: ElementRef;

  constructor(
    private cS: CentroReciclajeService,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private lS: LoginService,
  ) {}

  ngOnInit(): void {
    this.role = this.lS.showRole();

    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      //trae los datos
      this.init();
    });

    this.form = this.formBuilder.group({
      hcodigo: [''],
      hdireccion: ['', Validators.required],
      hlatitud: ['', Validators.required],
      hlongitud: ['', Validators.required],
    });


    // Escucha los cambios en latitud y longitud para actualizar el mapa
    this.form.get('hlatitud')?.valueChanges.subscribe((lat) => {
      this.updateMapPosition(lat, this.form.get('hlongitud')?.value);
    });
    this.form.get('hlongitud')?.valueChanges.subscribe((lng) => {
      this.updateMapPosition(this.form.get('hlatitud')?.value, lng);
    });

    
  }
  ngAfterViewInit() {
    // Inicialización del mapa y autocompletado
    const input = this.direccionInput.nativeElement;
    this.autocomplete = new google.maps.places.Autocomplete(input, {
      //types: ['address'],
      fields: ['place_id', 'geometry', 'name'],
      componentRestrictions: { country: 'PE' } // Restringe las búsquedas a Perú
    });

    // Inicializar el servicio de geocodificación para obtener la latitud y longitud
    this.geocoder = new google.maps.Geocoder();

    // Llamar al evento cuando el usuario selecciona una dirección
    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete.getPlace();

      if (place.geometry) {
        // Actualizar el mapa con la nueva ubicación
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();

        // Verifica que la latitud y longitud sean válidas
        if (lat && lng) {
          // Actualiza la ubicación en el mapa
          this.center = { lat, lng };
          this.markerPosition = { lat, lng };

          // Establece la latitud y longitud en el formulario
          this.form.controls['hlatitud'].setValue(lat); // Actualiza la latitud
          this.form.controls['hlongitud'].setValue(lng);  // Actualiza la longitud
          
        } else {
          console.error('Error: No se pudo obtener una ubicación válida.');
        }
      } else {
        console.error('Error: No se encontró el lugar.');
      }
    });
  }

  onDireccionInput(inputElement: HTMLInputElement) {
    // Filtra las direcciones mientras el usuario escribe
    const query = inputElement.value;
    if (query.length > 3) {
      this.placesService = new google.maps.places.AutocompleteService();
      this.placesService.getPlacePredictions({ input: query }, (predictions:google.maps.places.AutocompletePrediction[], status:google.maps.places.AutocompletePrediction[]) => {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          this.filteredAddresses = predictions.map((p:google.maps.places.AutocompletePrediction) => p.description);
        }
      });
    }
  }

  insertar(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Marca todos los controles como tocados para disparar las validaciones
      return; // Detiene la ejecución si el formulario no es válido
    }
    

    if (this.form.valid) {
      this.centroReciclaje.idCentroReciclaje = this.form.value.hcodigo;
      this.centroReciclaje.direccion = this.form.value.hdireccion;
      this.centroReciclaje.latitud = this.form.value.hlatitud;
      this.centroReciclaje.longitud = this.form.value.hlongitud;
     
      if (this.edicion) {
        this.cS.update(this.centroReciclaje).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
            this.updateMapPosition(this.centroReciclaje.latitud, this.centroReciclaje.longitud);
          });
        });
      } else {
        this.cS.insert(this.centroReciclaje).subscribe((data) => {
          this.cS.list().subscribe((data) => {
            this.cS.setList(data);
            this.updateMapPosition(this.centroReciclaje.latitud, this.centroReciclaje.longitud);
          });
        });
      }
    }
    this.router.navigate(['centroreciclaje']);
  }
  // Actualiza la posición del centro y el marcador del mapa
  updateMapPosition(lat: string | number, lng: string | number): void {
    const latitude = parseFloat(lat as string);
    const longitude = parseFloat(lng as string);
    if (!isNaN(latitude) && !isNaN(longitude)) {
      this.center = { lat: latitude, lng: longitude };
      this.markerPosition = { lat: latitude, lng: longitude };
    }
  }
  
  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        console.log('Datos recibidos del servicio:', data); // Verificar aquí
        this.form = new FormGroup({
          hcodigo: new FormControl(data.idCentroReciclaje),
          hdireccion: new FormControl(data.direccion),
          hlatitud: new FormControl(data.latitud),
          hlongitud: new FormControl(data.longitud),
        });  
      });
    }
  }
  isAdmi(): boolean {
    return this.role === 'ADMI';
  }
}