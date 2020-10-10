import { Component, Inject, NgZone, PLATFORM_ID, OnInit, AfterViewInit } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private chart: am4charts.XYChart;

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
  private totalProfit: number;
  constructor(@Inject(PLATFORM_ID) private platformId, private zone: NgZone) { }

  ngOnInit() {
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
          "country": "Lithuania",
          "litres": 501.9
        }, {
          "country": "Czech Republic",
          "litres": 301.9
        }, {
          "country": "Ireland",
          "litres": 201.1
        }, {
          "country": "Germany",
          "litres": 165.8
        }, {
          "country": "Australia",
          "litres": 139.9
        }, {
          "country": "Austria",
          "litres": 128.3
        }, {
          "country": "UK",
          "litres": 99
        }, {
          "country": "Belgium",
          "litres": 60
        }, {
          "country": "The Netherlands",
          "litres": 50
        }];
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "litres";
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
        this.pieProductsList = [];
        chart.data.forEach(element => {
          this.pieProductsList.push(element['type']);
        });
      });
    }

        
    makePieChartProfit() {
      this.browserOnly(() => {
        am4core.useTheme(am4themes_animated);
  
        let chart = am4core.create("pieChartProfitdiv", am4charts.PieChart);
        chart.data = [{
          "type": "Type 1",
          "value": 30
        }, {
          "type": "Type 2",
          "value": 25
        }, {
          "type": "Type 3",
          "value": 25
        }, {
          "type": "Type 4",
          "value": 15
        }, {
          "type": "Type 5",
          "value": 5
        }];
        let pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "value";
        pieSeries.dataFields.category = "type";
        pieSeries.labels.template.disabled = true;
        this.pieChartProfits = chart;
        this.pieProductsList = [];
        chart.data.forEach(element => {
          this.totalProfit += element['value'];
        });
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
