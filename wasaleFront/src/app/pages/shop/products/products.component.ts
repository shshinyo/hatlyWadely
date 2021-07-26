import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import { Router, ActivatedRoute } from "@angular/router";
import { fromEvent, Subscription } from "rxjs";
import { debounceTime, map, filter } from "rxjs/Operators";
import { ProductsService } from "src/app/shared/services/products.service";
import { SouqService } from "src/app/shared/services/shop-service.service";
import { QueryParams } from "src/app/shared/utilities/query-params";

@Component({
  selector: "app-products",
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild("sidNav") sidNav: ElementRef;
  @ViewChild("filterBanner") filterBanner: ElementRef;
  mediaSub: Subscription;
  //  hide and show on hover (filter & carouser)
  search: string | null = null;
  //  hide and show on hover (filter & carouser)
  responsiveOptions: any[] = [
    {
      breakpoint: "1024px",
      numVisible: 5,
    },
    {
      breakpoint: "768px",
      numVisible: 3,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
    },
  ];
  carouselOffers$ = this.souqSer.Offers$;
  products: any;
  filteredProducts: any;
  // start cards
  cards: any;
  secondCards: any;
  footerArray: any;

  // end cards
  constructor(
    private _mediaObserver: MediaObserver,
    private _route: ActivatedRoute,
    private _router: Router,
    private productsService: ProductsService,
    private souqSer: SouqService
  ) {}

  ngOnInit(): void {
    this.productsService.getAllCategories$.subscribe((res) => {
      console.log(res);
      this.products = res.categories;
      this.filteredProducts = res.categories;
      this.cards = res.cards;
      this.secondCards = res.secondCards;
      this.footerArray = res.myFooter;
    });

    this.mediaSub = this._mediaObserver.media$.subscribe((change: MediaChange) => {
      console.log(change.mqAlias);
    });
  }

  ngAfterViewInit(): void {
    // fromEvent(this.filterBanner.nativeElement, "mouseout").subscribe((_) => {
    //   // this.displayCarousel = true;
    //   console.log("sandjskahdjksahd");
    // });
  }

  ngOnDestroy() {
    this.mediaSub.unsubscribe();
  }

  onSearch(value: string): void {
    this._router.navigate([], {
      queryParams: {
        [QueryParams.Search]: value || null,
      },
      queryParamsHandling: "merge",
    });
  }

  // onHoverOnTap(product?) {
  //   if (product) {
  //     this.filteredProducts = this.products.find(
  //       (elem) => elem.name == product.name
  //     ).myProducts;
  //   }

  //   console.log(this.filteredProducts);
  // }

  // test for search
  // private _fetchItem(): void {
  //   this.productsService.getAllCategories$
  //     .pipe(
  //       map((x) => {
  //         x.categories.map((c) => {
  //           c.myProducts.map((t) => {
  //             t.myProductss.map((products) => {
  //               console.log(products);
  //               products.details.map((product) => {
  //                 product.filter((d) => {
  //                   this.search ? d.detail == this.search : true;
  //                 });
  //               });
  //             });
  //           });
  //         });
  //       })
  //     )
  //     .subscribe();
  // }
}
