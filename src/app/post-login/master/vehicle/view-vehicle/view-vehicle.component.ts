import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { Column } from '../../../../expand-table/Column';

@Component({
    templateUrl: './view-vehicle.component.html',
    styleUrls: ['./view-vehicle.component.scss']
})
export class ViewVehicleComponent {
    private routeSubscription: Subscription;
    public vehicles;
    public vehicleDataSource: MatTableDataSource<any>;
    public displayedColumns = ['serialNo', 'registrationNumber', 'type', 'ownedBy', 'registrationAddress', 'edit', 'delete']
    public columns: Column[] = [
        { id: 'serialNo', name: 'COLUMN.SERIAL_NO', type: 'index', width: '10' , mobileWidth: '20' },
        { id: 'registrationNumber', name: 'ADD_VEHICLE.VEHICLE_NO', type: 'string', width: '20', mobileWidth: '25' },
        { id: 'type', name: 'ADD_VEHICLE.VEHICLE_TYPE', type: 'string', width: '15', mobileWidth: '25' },
        { id: 'ownedBy', name: 'ADD_VEHICLE.OWNER', type: 'string', width: '15', isDesktopOnly: true },
        { id: 'registrationAddress', name: 'ADD_VEHICLE.REG_ADDR', type: 'string', width: '25', isDesktopOnly: true },
        { id: 'edit', name: '', type: 'button', width: '5', mobileWidth: '10' },
        { id: 'delete', name: '', type: 'button', width: '5', mobileWidth: '10' },
        { id: 'more_details', name: '', type: 'toggle', width: '5', mobileWidth: '10' },
    ]
    constructor(
        private route: ActivatedRoute
    ) {
        this.routeSubscription = this.route.data.subscribe((data) => {
            if (data && data.vehicles) {
                this.vehicles = data.vehicles;
                this.vehicleDataSource = new MatTableDataSource<any>(this.vehicles);
            }
        })
    }
}