import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-preloader",
  template: `
    <div class="loading">
      <svg width="16px" height="12px">
        <polyline id="back" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
        <polyline id="front" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline>
      </svg>
    </div>
  `,
  styles: [
    `
      /*preloader for components*/

      body {
        background: #27272b;
      }
      .loading {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) scale(2);
      }
      .loading svg polyline {
        fill: none;
        stroke-width: 2;
        stroke-linecap: round;
        stroke-linejoin: round;
      }
      .loading svg polyline#back {
        stroke: rgba(255, 165, 0, 0.3);
      }
      .loading svg polyline#front {
        stroke: #ffa500;
        stroke-dasharray: 12, 36;
        stroke-dashoffset: 48;
        animation: dash 1s linear infinite;
      }
      @-moz-keyframes dash {
        62.5% {
          opacity: 0;
        }
        to {
          stroke-dashoffset: 0;
        }
      }
      @-webkit-keyframes dash {
        62.5% {
          opacity: 0;
        }
        to {
          stroke-dashoffset: 0;
        }
      }
      @-o-keyframes dash {
        62.5% {
          opacity: 0;
        }
        to {
          stroke-dashoffset: 0;
        }
      }
      @keyframes dash {
        62.5% {
          opacity: 0;
        }
        to {
          stroke-dashoffset: 0;
        }
      }
    `,
  ],
})
export class PreloaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
