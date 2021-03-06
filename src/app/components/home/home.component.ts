import { Component, Inject, NgZone, PLATFORM_ID, OnInit, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

interface Dropdown {
  value: string;
  viewValue: string;
}

export interface TableElement {
  name: string;
  position: string;
  weight: string;
  symbol: string;
}

export interface AverageTableElement {
  name: string;
  time: number;
  reference: string;
}

export interface LogsTableElement {
  name: string;
  datetime: string;
}

const ELEMENT_DATA: TableElement[] = [
  {position: '1st', name: 'Inaaya Dunlop', weight: '$6,000.00', symbol: '3 days ago'},
  {position: '2nd', name: 'Dillon Butt', weight: '$6,000.00', symbol: '3 days ago'},
  {position: '3rd', name: 'Chanelle Cooley', weight: '$6,000.00', symbol: '3 days ago'},
  {position: '4rth', name: 'Ayda Foreman', weight: '$6,000.00', symbol: '3 days ago'},
  {position: '5th', name: 'Dougie Miles', weight: '$6,000.00', symbol: '3 days ago'},
  {position: '6th', name: 'Jordanna Cuevas', weight: '$6,000.00', symbol: '3 days ago'},
  {position: '7th', name: 'Shayna Harper', weight: '$6,000.00', symbol: '3 days ago'},
  {position: '8th', name: 'Katelyn Arnold', weight: '$6,000.00', symbol: '3 days ago'},
  {position: '9th', name: 'Tim Oconnell', weight: '$6,000.00', symbol: '3 days ago'},
  {position: '10th', name: 'Maheen Haley', weight: '$6,000.00', symbol: '3 days ago'},
];

const ELEMENT_DATA_AVERAGE_WAITED: AverageTableElement[] = [
  {name: 'Katelyn Arnold', time: 30, reference: '1011542650'},
  {name: 'Dillon Butt', time: 27, reference: '7485630495'},
  {name: 'Chanelle Cooley', time: 18, reference: '4660987749'},
  {name: 'Ayda Foreman', time: 15, reference: '8700698182'},
  {name: 'Dougie Miles', time: 9, reference: '8700698182'},
];

const ELEMENT_DATA_LOG_CANCELLED: LogsTableElement[] = [
  {name: 'Katelyn Arnold', datetime: '10/23/20 17:54'},
  {name: 'Dillon Butt', datetime: '10/23/20 17:54'},
  {name: 'Chanelle Cooley', datetime: '10/23/20 17:54'},
  {name: 'Ayda Foreman', datetime: '10/23/20 17:54'},
  {name: 'Dougie Miles', datetime: '10/23/20 17:54'},
];

const ELEMENT_DATA_LOG_NOSHOW: LogsTableElement[] = [
  {name: 'Katelyn Arnold', datetime: '10/23/20 17:54'},
  {name: 'Dillon Butt', datetime: '10/23/20 17:54'},
  {name: 'Chanelle Cooley', datetime: '10/23/20 17:54'},
  {name: 'Ayda Foreman', datetime: '10/23/20 17:54'},
  {name: 'Dougie Miles', datetime: '10/23/20 17:54'},
];


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private chart: am4charts.XYChart;

  displayedColumns: string[] = ['position', 'name', 'spent', 'lastSession'];
  displayedColumnsAverageWaitedTime: string[] = ['name', 'time', 'reference'];
  displayedColumnsCancelledLog: string[] = ['name', 'datetime'];
  displayedColumnsNoShowLog: string[] = ['name', 'datetime'];
  dataSourceTopSpender = ELEMENT_DATA;
  dataSourceAverageWaited = ELEMENT_DATA_AVERAGE_WAITED;
  dataSourceLogCancelled = ELEMENT_DATA_LOG_CANCELLED;
  dataSourceNoShowLog = ELEMENT_DATA_LOG_NOSHOW;
  locations: Dropdown[] = [
    {value: 'All', viewValue: 'All'},
    {value: 'Kalgoorlie', viewValue: 'Kalgoorlie'},
    {value: 'Busselton', viewValue: 'Busselton'},
    {value: 'Mandurah', viewValue: 'Mandurah'}
  ];
  views: Dropdown[] = [
    {value: 'Weekly', viewValue: 'Weekly'},
    {value: 'Monthly', viewValue: 'Monthly'},
    {value: 'Yearly', viewValue: 'Yearly'}
  ];
  months: Dropdown[] = [
    {value: 'January', viewValue: 'January'},
    {value: 'February', viewValue: 'February'},
    {value: 'March', viewValue: 'March'},
    {value: 'April', viewValue: 'April'},
    {value: 'May', viewValue: 'May'},
    {value: 'June', viewValue: 'June'},
    {value: 'July', viewValue: 'July'},
    {value: 'August', viewValue: 'August'},
    {value: 'September', viewValue: 'September'},
    {value: 'October', viewValue: 'October'},
    {value: 'November', viewValue: 'November'},
    {value: 'December', viewValue: 'December'}
  ];
  private pieChartMarketing: am4charts.PieChart;
  private pieChartRevenue: am4charts.PieChart;
  private pieChartProducts: am4charts.PieChart;
  private pieChartServices: am4charts.PieChart;
  private pieChartPaymentMethod: am4charts.PieChart;
  private pieChartProfits: am4charts.PieChart;

  private pieMarketingList: string[];
  private pieRevenueList: string[];
  private pieServicesList: string[];
  private pieProductsList: string[];
  private totalProfit: number = 0;
  private male: number = 278;
  private female: number = 246;
  private old: number = 549;
  private new: number = 269;
  private pcGenderMale: number;
  private pcOld: number;
  private selectedLocation: string = 'All';
  private selectedView: string = 'Monthly';
  private selectedMonth: string = 'January';
  private selectedCompare: string = '';
  private averageWaitedTime: number = 0;
  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) { }

  ngOnInit() {
    this.pcGenderMale = this.male / (this.male + this.female) * 100;
    this.pcOld = this.old / (this.old + this.new) * 100;

    console.log('onINIT');
    this.totalProfit = 0;
    // Chart code goes in here
    //this.makeSampleChart();
    this.makePieChartMarketingSource();
    this.makeSampleChart();
    this.makePieChartRevenue();
    this.makePieChartServices();
    this.makePieChartProducts();
    this.makePieChartPaymentMethods();
    this.makePieChartProfit();
    let totalWaitedTime = 0;
    this.dataSourceAverageWaited.forEach(element => {
      totalWaitedTime += element.time;
    });
    this.averageWaitedTime = totalWaitedTime / this.dataSourceAverageWaited.length
    
  }

    // Run the function only in the browser
    browserOnly(f: () => void) {
      if (isPlatformBrowser(this.platformId)) {
        this.zone.runOutsideAngular(() => {
          f();
        });
      }
    }

    // ngAfterViewInit() {
    //   console.log('afterviewInit')
    //   // Chart code goes in here
    //   //this.makeSampleChart();
    //   this.makePieChartMarketingSource();
    //   this.makeSampleChart();
    //   this.makePieChartRevenue();
    //   this.makePieChartServices();
    //   this.makePieChartProducts();
    // }
  

    makePieChartMarketingSource() {
      this.browserOnly(() => {
        am4core.useTheme(am4themes_animated);
  
        let chart = am4core.create("pieChartMarketingdiv", am4charts.PieChart);
        chart.data = [{
          "country": "Book It App",
          "value": 501.9
        }, {
          "country": "Walk In",
          "value": 301.9
        }, {
          "country": "Drive In",
          "value": 201.1
        }, {
          "country": "Facebook",
          "value": 165.8
        }, {
          "country": "Instagram",
          "value": 139.9
        }, {
          "country": "Google Maps",
          "value": 128.3
        }];
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "country";
        pieSeries.labels.template.disabled = true;
        this.pieChartMarketing = chart;
        this.pieMarketingList = [];
        chart.data.forEach(element => {
          this.pieMarketingList.push(element['country']);
        });
      });
    }

    makePieChartRevenue() {
      this.browserOnly(() => {
        am4core.useTheme(am4themes_animated);
  
        let chart = am4core.create("pieChartRevenuediv", am4charts.PieChart);
        chart.data = [{
          "type": "Services",
          "revenue": 60.56
        }, {
          "type": "Products",
          "revenue": 43.88
        }, {
          "type": "Voucher",
          "revenue": 8.99
        }];
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "revenue";
        pieSeries.dataFields.category = "type";
        pieSeries.labels.template.disabled = true;
        this.pieChartRevenue = chart;
        this.pieRevenueList = [];
        chart.data.forEach(element => {
          this.pieRevenueList.push(element['type']);
        });
      });
    }

    
    makePieChartServices() {
      this.browserOnly(() => {
        am4core.useTheme(am4themes_animated);
  
        let chart = am4core.create("pieChartServicesdiv", am4charts.PieChart);
        chart.data = [{
          "type": "Relaxation Massage",
          "value": 40
        }, {
          "type": "Relaxation Massage",
          "value": 20
        }, {
          "type": "Deep Tissue",
          "value": 15
        }, {
          "type": "Remedial Massage",
          "value": 18
        }, {
          "type": "Remedial Massage",
          "value": 7
        }];
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "type";
        pieSeries.labels.template.disabled = true;
        this.pieChartServices = chart;
        this.pieServicesList = [];
        chart.data.forEach(element => {
          this.pieServicesList.push(element['type']);
        });
      });
    }

    
    makePieChartProducts() {
      this.browserOnly(() => {
        am4core.useTheme(am4themes_animated);
  
        let chart = am4core.create("pieChartProductsdiv", am4charts.PieChart);
        chart.data = [{
          "type": "Relaxation Massage",
          "value": 50
        }, {
          "type": "Relaxation Massage",
          "value": 30
        }, {
          "type": "Deep Tissue",
          "value": 15
        }, {
          "type": "Remedial Massage",
          "value": 3
        }, {
          "type": "Remedial Massage",
          "value": 1
        }];
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "type";
        pieSeries.labels.template.disabled = true;
        this.pieChartProducts = chart;
        this.pieProductsList = [];
        chart.data.forEach(element => {
          this.pieProductsList.push(element['type']);
        });
      });
    }

        
    makePieChartPaymentMethods() {
      this.browserOnly(() => {
        am4core.useTheme(am4themes_animated);
  
        let chart = am4core.create("pieChartPaymentMethodsdiv", am4charts.PieChart);
        chart.data = [{
          "type": "CreditCard",
          "value": 40
        }, {
          "type": "Razorpay",
          "value": 20
        }, {
          "type": "Paypal",
          "value": 16
        }, {
          "type": "Bank Transfer",
          "value": 14
        }, {
          "type": "Bitcoin",
          "value": 20
        }];
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "type";
        pieSeries.labels.template.disabled = true;
        this.pieChartPaymentMethod = chart;
      });
    }

        
    makePieChartProfit() {
      this.browserOnly(() => {
        am4core.useTheme(am4themes_animated);
  
        let chart = am4core.create("pieChartProfitdiv", am4charts.PieChart);
        chart.data = [{
          "type": "Type 1",
          "value": 300
        }, {
          "type": "Type 2",
          "value": 253
        }, {
          "type": "Type 3",
          "value": 23
        }, {
          "type": "Type 4",
          "value": 100
        }, {
          "type": "Type 5",
          "value": 53
        }];
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "type";
        pieSeries.labels.template.disabled = true;
        chart.data.forEach(element => {
          this.totalProfit += element['value'];
          console.log(this.totalProfit, element['value'])
        });
        this.pieChartProfits = chart;
      });
    }

    makeSampleChart() {
      this.browserOnly(() => {
        am4core.useTheme(am4themes_animated);
  
        let chart = am4core.create("chartdiv", am4charts.XYChart);
  
        chart.paddingRight = 20;
  
        let data = [];
        let visits = 10;
        for (let i = 1; i < 366; i++) {
          visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
          data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
        }
  
        chart.data = data;
  
        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
  
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.renderer.minWidth = 35;
  
        let series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.dateX = "date";
        series.dataFields.valueY = "value";
        series.tooltipText = "{valueY.value}";
  
        chart.cursor = new am4charts.XYCursor();
  
        let scrollbarX = new am4charts.XYChartScrollbar();
        scrollbarX.series.push(series);
        chart.scrollbarX = scrollbarX;
  
        this.chart = chart;
      });
    }

    ngOnDestroy() {
      // Clean up chart when the component is removed
      this.browserOnly(() => {
        if (this.chart) {
          this.chart.dispose();
        }
        if (this.pieChartMarketing) {
          this.pieChartMarketing.dispose();
        }
        if (this.pieChartRevenue) {
          this.pieChartRevenue.dispose();
        }
        if (this.pieChartProducts) {
          this.pieChartProducts.dispose();
        }
        if (this.pieChartServices) {
          this.pieChartServices.dispose();
        }
        if (this.pieChartPaymentMethod) {
          this.pieChartPaymentMethod.dispose();
        }
        if (this.pieChartProfits) {
          this.pieChartProfits.dispose();
        }
        
      });
    }  

}
