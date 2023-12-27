import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from "rxjs/operators";
import { AlertifyService } from 'app/core/services/alertify.service';

import { BoatType } from '../boat-type/models/boat-type';
import { BoatModel } from './models/boat-model';
import { BoatManufacturer } from '../boat-manufacturer/models/boat-manufacturer';
import { BoatHullMetarial } from '../boat-hull-metarial/models/boat-hull-metarial';
import { BoatModelService } from './services/boat-model.service';
import { BoatTypeService } from '../boat-type/services/boat-type.service';
import { BoatHullMetarialService } from '../boat-hull-metarial/services/boat-hull-metarial.service';
import { BoatManufacturerService } from '../boat-manufacturer/services/boat-manufacturer.service';


declare var jQuery: any;

@Component({
  selector: 'app-boat-model',
  templateUrl: './boat-model.component.html',
  styleUrls: ['./boat-model.component.css']
})
export class BoatModelComponent implements OnInit {

dataSource: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  modelList: BoatModel[] = [];
  manufacturerList: BoatManufacturer[] = [];
  typeList: BoatType[] = [];
  hullMetarialList: BoatHullMetarial[] = [];

  boatModel: BoatModel = new BoatModel;
  
  dataLoaded = false;

  myModelControl = new UntypedFormControl("");
  myManufacturerControl = new UntypedFormControl("");
  myTypeControl = new UntypedFormControl("");
  myHullMetarialControl = new UntypedFormControl("");

  //autocomplete
  filteredManufacturer: Observable<BoatManufacturer[]>;
  filteredType: Observable<BoatType[]>;
  filteredHullMetarial: Observable<BoatHullMetarial[]>;

  displayedColumns: string[] = [
    "manufacturerName",
    "modelName",
    "typeName",
    "lengthMeter",
    "beamMeter",
    "draftMeter",
    "boatHullMetarialName",
    "update",
    "delete"
  ];

  modelAddForm: UntypedFormGroup;

  constructor(
    private modelService: BoatModelService,
    private manufacturerService: BoatManufacturerService,
    private typeService: BoatTypeService,
    private hullMetarialService: BoatHullMetarialService,
    private alertifyService: AlertifyService,
    private formBuilder: UntypedFormBuilder
  ) {}

  ngAfterViewInit(): void {
    this.getModelDetailList();
    this.getManufacturerList();
    this.getTypeList();
    this.getHullMetarialList();
  }

  ngOnInit(): void {
    this.createModelAddForm();
  }

  getModelDetailList() {
    this.modelService.getModelDetailList().subscribe((data: BoatModel[]) => {
      this.modelList = data;
      this.dataLoaded =true;

      this.dataSource = new MatTableDataSource(data); 
      this.configDataTable();
    })
  }

  getBoatModelById(_id: number) {
    this.clearFormGroup(this.modelAddForm);
    this.modelService.getModelById(_id).subscribe((data) => {
      this.boatModel = data;

      this.myManufacturerControl.setValue(this.manufacturerList.find(x => x._id == data.manufacturerId));
      this.myTypeControl.setValue(this.typeList.find(x => x._id == data.typeId));
      this.myHullMetarialControl.setValue(this.hullMetarialList.find(x => x._id == data.boatHullMetarialId));
      this.modelAddForm.patchValue(data);
    })
  }

  save(){
    if (this.modelAddForm.valid) {
      this.boatModel = Object.assign({}, this.modelAddForm.value);

      this.boatModel.manufacturerId = this.myManufacturerControl.value._id;
      this.boatModel.typeId = this.myTypeControl.value._id;
      this.boatModel.boatHullMetarialId = this.myHullMetarialControl.value._id;
      if (!this.boatModel._id) {
        this.addModell();
      } else {
        this.updateModel();
      }
    }
  }

  updateModel() {
    this.modelService.updateModel(this.boatModel).subscribe((data) => {
      var index = this.modelList.findIndex((x) => x._id == this.boatModel._id);
      this.modelList[index] = this.boatModel;
      this.dataSource = new MatTableDataSource(this.modelList);
      this.configDataTable();
      this.getModelDetailList();
      this.boatModel = new BoatModel();
      jQuery("#boatModel").modal("hide");
      this.alertifyService.success(data);
      this.clearFormGroup(this.modelAddForm);
    })
  }

  createModelAddForm() {
    this.modelAddForm =this.formBuilder.group({
      _id: [0],
      manufacturerId: [0],
      manufacturerName: "",
      modelName: "",
      typeId: [0],
      typeName: "",
      lengthMeter: [0],
      beamMeter: [0, [Validators.required, Validators.pattern(`^[0-9]*\.?[0-9]*$`)]],
      draftMeter: [0],
      boatHullMetarialId: [0],
      boatHullMetarialName: ""
    })
  }

  addModell() {
    this.modelService.addModel(this.boatModel).subscribe(
      (data) => {
        this.getModelDetailList();
        this.boatModel = new BoatModel();
        jQuery("#boatModel").modal("hide");
        this.alertifyService.success(data);
        this.clearFormGroup(this.modelAddForm);
      },
      (error) => {
        console.log(error);
      }
    )
  }

  clearFormGroup(group: UntypedFormGroup) {
    group.markAsUntouched();
    group.reset();

    Object.keys(group.controls).forEach((key) => {
      group.get(key)?.setErrors(null);
      if (key == "_id") {
        group.get(key)?.setValue(0);
      } else if (key == "status") {
        group.get(key)?.setValue(true);
      }
    })
    this.myModelControl.setValue("");
    this.myManufacturerControl.setValue("");
    this.myTypeControl.setValue("");
    this.myHullMetarialControl.setValue("");
  }

  getManufacturerList() {
    this.manufacturerService.getManufacturerList().subscribe((data) => {
      this.manufacturerList = data;

      this.filteredManufacturer = this.myManufacturerControl.valueChanges.pipe(
        startWith(""),
        map((value) => (typeof value === "string" ? value : value.manufacturerName)),
        map((name) => name ? this._manufacturerFilter(name) : this.manufacturerList.slice())
      )
    })
  }

  private _manufacturerFilter(value: string): BoatManufacturer[] {
    const filterValue = value.toLowerCase();

    return this.manufacturerList.filter((option) =>
    option.manufacturerName.toLowerCase().includes(filterValue)
    );
  }

  displayFnManufacturer(manufacturer: BoatManufacturer): string {
    return manufacturer && manufacturer.manufacturerName;
  }

  getTypeList() {
    this.typeService.getTypeList().subscribe((data) => {
      this.typeList = data;

      this.filteredType = this.myTypeControl.valueChanges.pipe(
        startWith(""),
        map((value) => (typeof value === "string" ? value : value.typeName)),
        map((name) => name ? this._typeFilter(name) : this.typeList.slice())
      )
    })
  }

  private _typeFilter(value: string): BoatType[] {
    const filterValue = value.toLowerCase();

    return this.typeList.filter((option) => 
    option.typeName.toLowerCase().includes(filterValue)
    );
  }

  displayFnType(type: BoatType) {
    return type && type.typeName;
  }

  getHullMetarialList() {
    this.hullMetarialService.getBoatHullMetarialList().subscribe((data) => {
      this.hullMetarialList = data;

      this.filteredHullMetarial = this.myHullMetarialControl.valueChanges.pipe(
        startWith(""),
        map((value) => (typeof value === "string" ? value : value.boatHullMetarialName)),
        map((name) => name ? this._hullMetarialFilter(name) : this.hullMetarialList.slice())
      )
    })
  }

  private _hullMetarialFilter(value: string): BoatHullMetarial[] {
    const filterValue = value.toLowerCase();

    return this.hullMetarialList.filter((option) => 
    option.boatHullMetarialName.toLowerCase().includes(filterValue)    
    );
  }

  displayFnMetarial(metarial: BoatHullMetarial) {
    return metarial && metarial.boatHullMetarialName;
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
