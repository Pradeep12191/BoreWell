import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'point-report-view',
    templateUrl: './point-report-view.component.html',
    styleUrls: ['./point-report-view.component.scss']
})
export class PointReportViewComponent implements OnInit {
    @Input() point;
    @Input() viewOnly;

    ngOnInit() {
        this.generateCasingDetails(this.point)
    }

    generateCasingDetails(point) {
        const pvc7Detail = {};
        const pvc10Detail = {};
        const pvc12Detail = {};
        const msHeavyDetail = {};
        const msMediumDetail = {};
        point['casingDetails'] = [];
        if (point.pvc7Depth || point.pvc7DepthRate || point.pvc7Amt) {
            pvc7Detail['name'] = "7\' Inch"
            pvc7Detail['depth'] = point.pvc7Depth;
            pvc7Detail['depthRate'] = point.pvc7DepthRate;
            pvc7Detail['totalAmount'] = point.pvc7Amt
            point.casingDetails.push(pvc7Detail)
        }
        if (point.pvc10Depth || point.pvc10DepthRate || point.pvc10Amt) {
            pvc10Detail['name'] = "PVC 10\' Inch"
            pvc10Detail['depth'] = point.pvc10Depth;
            pvc10Detail['depthRate'] = point.pvc10DepthRate;
            pvc10Detail['totalAmount'] = point.pvc10Amt
            point.casingDetails.push(pvc10Detail)
        }
        if (point.pvc12Depth || point.pvc12DepthRate || point.pvc12Amt) {
            pvc12Detail['name'] = "PVC 12\' Inch"
            pvc12Detail['depth'] = point.pvc12Depth;
            pvc12Detail['depthRate'] = point.pvc12DepthRate;
            pvc12Detail['totalAmount'] = point.pvc12Amt
            point.casingDetails.push(pvc12Detail)
        }
        if (point.msMediumDepth || point.msMediumDepthRate || point.msMediumAmt) {
            msMediumDetail['name'] = "MS Medium"
            msMediumDetail['depth'] = point.msMediumDepth;
            msMediumDetail['depthRate'] = point.msMediumDepthRate;
            msMediumDetail['totalAmount'] = point.msMediumAmt
            point.casingDetails.push(msMediumDetail)
        }
        if (point.msHeavyDepth || point.msHeavyDepthRate || point.msHeavyAmt) {
            msHeavyDetail['name'] = "MS Heavy"
            msHeavyDetail['depth'] = point.msHeavyDepth;
            msHeavyDetail['depthRate'] = point.msHeavyDepthRate;
            msHeavyDetail['totalAmount'] = point.msHeavyAmt
            point.casingDetails.push(msHeavyDetail)
        }

    }
}