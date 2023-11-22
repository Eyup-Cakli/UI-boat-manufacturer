import { Component, AfterViewInit, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { AlertifyService } from 'app/core/services/alertify.service';

import { BoatManufacturerService } from "./services/boat-manufacturer.service";
import { BoatManufacturerLogoService } from '../boat-manufacturer-logo/services/boat-manufacturer-logo.service';
import { BoatManufacturer } from "./models/boat-manufacturer";

declare var jQuery: any;

@Component({
  selector: 'app-boat-manufacturer',
  templateUrl: './boat-manufacturer.component.html',
  styleUrls: ['./boat-manufacturer.component.css']
})
export class BoatManufacturerComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  manufacturerList: BoatManufacturer[] = [];

  boatManufacturer: BoatManufacturer = new BoatManufacturer;

  dataLoaded = false;

  typeControl = new FormControl();

  image: string = "";

  displayedColumns: string[] =[
    "manufacturerImage",
    "manufacturerName",
    "manufacturerWebSite",
    "update",
    "delete"
  ];

  manufacturerAddForm: FormGroup;

  constructor(
    private manufacturerService: BoatManufacturerService,
    private manufacturerLogoService: BoatManufacturerLogoService,
    private formBuilder: FormBuilder,
    private alertifyService: AlertifyService
  ) {
  }

  ngAfterViewInit(): void {
    this.getManufacturerList();
  }

  ngOnInit(): void {
    this.createManufacturerAddForm();
  }
  
  imageUrl: string = "";

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.uploadImage(file);
  }

  uploadImage(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    this.manufacturerLogoService.addManufacturerLogo(formData).subscribe((response) => {
      this.image == response;
    })
  }

  getManufacturerList() {
    this.manufacturerService.getManufacturerList().subscribe((data) => {
      this.manufacturerList = data;
      this.dataLoaded = true;
      this.dataSource = new MatTableDataSource(data);
      this.configDataTable();
    })
  }

  getManufacturerDetailList() {
    this.manufacturerService.getManufacturerDetailList().subscribe((data) => {
      this.manufacturerList = data;
      this.dataLoaded = true;

      this.dataSource = new MatTableDataSource(data);
      this.configDataTable();
    })
  }

  getImageUrl(element: BoatManufacturer) {
    return this.manufacturerService.getApiUrl + "/manufacturerimage/" + element._id;
  }

  save() {
      if (this.manufacturerAddForm.valid) {
        this.boatManufacturer = Object.assign({}, this.manufacturerAddForm.value);

        if (!this.boatManufacturer._id) {
          this.addManufacturer();
        } else {
          this.updateManufacturer();
        }
      }
  }
  
  updateManufacturer() {

  }

  createManufacturerAddForm() {
    this.manufacturerAddForm = this.formBuilder.group({
      _id: [0],
      logoId: [0],
      manufacturerName: "",
      manufacturerWebsite: ""
    })
  }

  addManufacturer() {
    this.manufacturerService.addManufacturer(this.boatManufacturer).subscribe(
      (data) => {
        //this.uploadImage(data.image);
        this.getManufacturerList();
        this.boatManufacturer = new BoatManufacturer();
        jQuery("#boatManufacturer").modal("hide");
        this.alertifyService.success(data);
        this.clearFormGroup(this.manufacturerAddForm);
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  clearFormGroup(group: FormGroup) {
    group.markAsUntouched();
    group.reset();

    Object.keys(group.controls).forEach((key) => {
      group.get(key)?.setErrors(null);
      if (key == "_id") {
        group.get(key)?.setErrors(null);
      } else if (key == "status") {
        group.get(key)?.setValue(true);
      }
    })
  }

  configDataTable(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
