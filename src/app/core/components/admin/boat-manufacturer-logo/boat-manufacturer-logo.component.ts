import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from "@angular/forms";
import { MatLegacyPaginator as MatPaginator } from "@angular/material/legacy-paginator";
import { MatSort } from "@angular/material/sort";
import { MatLegacyTableDataSource as MatTableDataSource } from "@angular/material/legacy-table";

import { BoatManufacturerLogo } from './models/boat-manufacturer-logo';
import { BoatManufacturerLogoService } from './services/boat-manufacturer-logo.service';
declare var jQuery: any;

@Component({
  selector: 'app-boat-manufacturer-logo',
  templateUrl: './boat-manufacturer-logo.component.html',
  styleUrls: ['./boat-manufacturer-logo.component.css']
})
export class BoatManufacturerLogoComponent implements AfterViewInit, OnInit {
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  logoList: BoatManufacturerLogo[] = [];
  boatLogo: BoatManufacturerLogo = new BoatManufacturerLogo();
  dataLoaded = false;
  typeControl = new UntypedFormControl();

  myLogoControl = new UntypedFormControl("");

  logoAddForm: UntypedFormGroup;

  displayedColumns: string[] = [
    "image",
    "fileName"
  ];

  constructor(
    private logoService: BoatManufacturerLogoService,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.getLogoList();
  }

  getLogoList() {
    this.logoService.getManufacturerLogoList().subscribe((data) => {
      this.logoList = data;
      this.dataLoaded = true;
      this.dataSource = new MatTableDataSource(data);
      this.configDataTable();
    })
  }

  getImageUrl(element: BoatManufacturerLogo) {
    return this.logoService.getApiUrl + "/logo/" +element._id;
  }

  createLogoAddForm() {
    this.logoAddForm = this.formBuilder.group({
      _id:[0],
      fileName: [""]
    })
  }

  clearFormGroup(group: UntypedFormGroup) {
    group.markAsUntouched();
    group.reset();

    Object.keys(group.controls).forEach((key) => {
      // group.get(key).setErrors(null);
      // if (key == "id") group.get(key).setValue(0);
      // else if (key == "status") group.get(key).setValue(true);
    });
    this.myLogoControl.setValue("");
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
