import { Component, AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatLegacyPaginator as MatPaginator } from '@angular/material/legacy-paginator';
import { MatSort } from '@angular/material/sort';
import { MatLegacyTableDataSource as MatTableDataSource } from '@angular/material/legacy-table';
import { AlertifyService } from 'app/core/services/alertify.service';

import { BoatTypeService } from './services/boat-type.service';
import { BoatType } from './models/boat-type';

declare var jQuery: any;

@Component({
  selector: 'app-boat-type',
  templateUrl: './boat-type.component.html',
  styleUrls: ['./boat-type.component.css']
})
export class BoatTypeComponent implements AfterViewInit, OnInit {
  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  typeList: BoatType[] = [];
  boatType: BoatType = new BoatType();
  
  dataLoaded = false;

  myTypeControl = new UntypedFormControl("");

  displayedColumns: string[] = [
    "typeName",
    "update",
    "delete"
  ];

  typeAddForm: UntypedFormGroup;

  constructor (
    private typeService: BoatTypeService,
    private formBuilder: UntypedFormBuilder,
    private alertifyService: AlertifyService
  ) {}

  ngAfterViewInit(): void {
    this.getTypeList();
  }

  ngOnInit(): void {
    this.createTypeAddForm();
  }

  getTypeList() {
    this.typeService.getTypeList().subscribe((data) => {
      this.typeList = data;
      this.dataLoaded = true;
      this.dataSource = new MatTableDataSource(data);
      this.configDataTable();
    })
  }

  getBoatTypeById(_id: number) {
    this.clearFormGroup(this.typeAddForm);
    this.typeService.getBoatTypeById(_id).subscribe((data) => {
      this.boatType = data;

      this.typeAddForm.patchValue(data);
    })
  }

  save() {
    if (this.typeAddForm.valid) {
      this.boatType = Object.assign({}, this.typeAddForm.value);

      if (!this.boatType._id) {
        this.addType();
      }
      else {
        this.updateType();
      }
    }
  }

  createTypeAddForm() {
    this.typeAddForm = this.formBuilder.group({
      _id: "",
      typeName: ""
    })
  }

  addType() {
    this.typeService.addType(this.boatType).subscribe(
      (data) => {
        this.getTypeList();
        this.boatType = new BoatType();
        jQuery("#boatType").modal("hide");
        this.alertifyService.success(data);
        this.clearFormGroup(this.typeAddForm);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  updateType() {
    this.typeService.updateBoatType(this.boatType).subscribe((data) => {
      var index = this.typeList.findIndex((x) => x._id == this.boatType._id);
      this.typeList[index] = this.boatType;
      this.dataSource = new MatTableDataSource(this.typeList);
      this.configDataTable();
      this.getTypeList();
      this.boatType = new BoatType();
      jQuery("#boatType").modal("hide");
      this.alertifyService.success(data);
      this.clearFormGroup(this.typeAddForm);
    })
  }

  deleteType(_id: number) {
    this.typeService.deleteType(_id).subscribe((data) => {
      this.alertifyService.success(data.toString());
      this.typeList = this.typeList.filter((x) => x._id != _id);
      this.dataSource = new MatTableDataSource(this.typeList);
      this.configDataTable();
    })
  }

  clearFormGroup(group: UntypedFormGroup) {
    group.markAsUntouched();
    group.reset();

    Object.keys(group.controls).forEach((key) => {
      group.get(key)?.setErrors(null);
      if (key == "_id") {
        group.get(key)?.setValue(0);
      }
    })
    this.myTypeControl.setValue("");
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  configDataTable(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

}
