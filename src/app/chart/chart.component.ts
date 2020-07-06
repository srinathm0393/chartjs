import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';
import { RevenueService } from '../revenue.service';
import { Key } from 'protractor';
import * as _ from 'lodash';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, AfterViewInit {
  LineChart: Chart;
  dataset: any;
  data: any;
  color = ['red', 'green', 'blue', 'yellow', 'pink'];
  temparray = [];
  dataarray = [];
  constructor(private revService: RevenueService) {}
  ngAfterViewInit(): void {
    // this.buildChartObj(this.temparray);
  }

  ngOnInit(): void {
    this.temparray = [];
    this.revService.getAdvantageData().subscribe((res) => {
      if (res && res.aggregations) {
        this.data = res.aggregations.filtered.by_project;

        const key_Names: any[] = [];
        this.data.buckets.map((x) => {
          // x.by_month.buckets.map((y) => {
          // console.log(y.total_revenue.value);
          for (let i = 0; i < x.by_month.buckets.length; i++) {
            var sum = x.by_month.buckets.reduce(
              (a, b) => a + b.total_revenue.value,
              0
            );
          }
          var z = x.key;
          // console.log(x.key);
          // console.log(z);
          this.dataarray.push({ sum, z });
          let temp = _.orderBy(this.dataarray, ['sum'], ['desc']);
          console.log(temp);
          temp = temp.splice(0, 5);
          console.log(temp);
          this.temparray = [];
          temp.forEach((pr, index) => {
            const project = this.data.buckets.find((proj) => proj.key === pr.z);
            const monthdata = project.by_month.buckets.map(
              (re) => re.total_revenue.value
            );
            const chartObj = {
              label: pr.z,
              data: monthdata,
              fill: false,
              lineTension: 0.2,
              borderColor: this.color[index],
              borderWidth: 1,
            };
            this.temparray.push(chartObj);
          });
          // console.log(this.temparray);
        });
        this.buildChartObj(this.temparray);
      }
    });
  }

  buildChartObj(value: any): void {
    this.LineChart = new Chart('linechart', {
      type: 'line',
      data: {
        labels: [
          'Jan',
          'feb',
          'mar',
          'apr',
          'may',
          'jun',
          'jul',
          'aug',
          'sep',
          'oct',
          'nov',
          'dec',
        ],
        datasets: JSON.parse(JSON.stringify(value)),
      },
      // creating circle around the starting and ending data
      options: {
        animation: {
          onComplete: function () {
            var ctx = this.chart.ctx;
            ctx.font = '20px';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'bottom';
            ctx.fillStyle = 'darkblue';
            ctx.strokeStyle = 'black';
            this.data.datasets.forEach(function (dataset) {
              var items = [0, dataset.data.length - 1];
              for (var i of items) {
                var model = dataset._meta[0].dataset._children[i]._model;
                ctx.fillText(dataset.data[i], model.x, model.y + 13);
                ctx.beginPath();
                var x = 25 + model.x * 50; // x coordinate
                var y = 25 + model.y * 50; // y coordinate
                var radius = 20; // Arc radius
                var startAngle = 0; // Starting point on circle
                var endAngle = Math.PI + (Math.PI * model.x) / 2;
                ctx.arc(model.x, model.y, radius, startAngle, endAngle);
                if (i > 1) {
                  ctx.stroke();
                } else {
                  ctx.stroke();
                }
              }
            });
          },
        },
        title: {
          text: 'LineChart',
          display: true,
        },
        legend: {
          position: 'left',
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }
}
