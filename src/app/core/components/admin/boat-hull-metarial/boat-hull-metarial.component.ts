import { Component, AfterViewInit, OnInit, ViewChild} from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { AlertifyService } from 'app/core/services/alertify.service';

import { BoatHullMetarialService } from './services/boat-hull-metarial.service';
import { BoatHullMetarial } from './models/boat-hull-metarial';

declare var jQuery: any;

@Component({
  selector: 'app-boat-hull-metarial',
  templateUrl: './boat-hull-metarial.component.html',
  styleUrls: ['./boat-hull-metarial.component.css']
})
export class BoatHullMetarialComponent implements AfterViewInit, OnInit {

  dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  materialList: BoatHullMetarial[] = []
  boatHullMetarial: BoatHullMetarial = new BoatHullMetarial;
  dataLoaded = false;

  myHullMetarialControl = new UntypedFormControl("");

  displayedColumns: string[] = [
    "boatHullMetarialName",
    "update",
    "delete"
  ];

  hullMetarialAddForm: UntypedFormGroup;

  constructor(
    private boatHullMetarialService: BoatHullMetarialService,
    private formBulder: UntypedFormBuilder,
    private alertifyService: AlertifyService
  ) {}

  ngAfterViewInit(): void {
    this.getBoatHullMetarialList();
  }

  ngOnInit(): void {
    this.createHullMetarialAddForm();
  }

  getBoatHullMetarialList() {
    this.boatHullMetarialService.getBoatHullMetarialList().subscribe((data) => {
      this.materialList = data;
      this.dataLoaded = true;
      this.dataSource = new MatTableDataSource(data);
      this.configDataTable();
    })
  }

  getBoatHullMetarialById(_id: number) {
    this.clearFormGroup(this.hullMetarialAddForm);
    this.boatHullMetarialService.getHullMetarialById(_id).subscribe((data) => {
      this.boatHullMetarial = data;

      this.hullMetarialAddForm.patchValue(data);
    })
  } 

  save() {
    if(this.hullMetarialAddForm.valid) {
      this.boatHullMetarial = Object.assign({}, this.hullMetarialAddForm.value);

      if (!this.boatHullMetarial._id) {
        this.addHullMetarial();
      } else {
        this.updateHullMetarial();
      }
    }
  }

  createHullMetarialAddForm() {
    this.hullMetarialAddForm = this.formBulder.group({
      _id: "",
      boatHullMetarialName: ""
    })
  }

  addHullMetarial() {
    this.boatHullMetarialService.addHullMetariall(this.boatHullMetarial).subscribe(
      (data) => {
        this.getBoatHullMetarialList();
        this.boatHullMetarial = new BoatHullMetarial();
        jQuery('#boatHullMetarial').modal('hide');
        this.alertifyService.success(data);
        this.clearFormGroup(this.hullMetarialAddForm);
      },
      (error)=>{
        console.log(error);
        this.alertifyService.error(error.error);
      });
  }

  updateHullMetarial() {
    this.boatHullMetarialService.updatBoatHullMetarial(this.boatHullMetarial).subscribe((data) => {
      var index = this.materialList.findIndex((x) => x._id == this.boatHullMetarial._id);
      this.materialList[index]= this.boatHullMetarial;
      this.dataSource = new MatTableDataSource(this.materialList);
      this.configDataTable();
      this.getBoatHullMetarialList();
      this.boatHullMetarial = new BoatHullMetarial();
      jQuery("#boatHullMetarial").modal("hide");
      this.alertifyService.success(data);
      this.clearFormGroup(this.hullMetarialAddForm);
    })
  }

  deleteHullMetarial(_id: number) {
    this.boatHullMetarialService.deleteHullMetarial(_id).subscribe((data) => {
      this.alertifyService.success(data.toString());
      this.materialList = this.materialList.filter((x) => x._id != _id);
      this.dataSource = new MatTableDataSource(this.materialList);
      this.configDataTable();
    })
  }

  clearFormGroup(group: UntypedFormGroup) {
    group.markAllAsTouched();
    group.reset();

    Object.keys(group.controls).forEach((key) => {
      group.get(key)?.setErrors(null);
      if (key == "_id") {
        group.get(key)?.setValue(0);
      }
    })
    this.myHullMetarialControl.setValue("");
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
