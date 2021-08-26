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
import { fromEvent, Observable, Subscription } from "rxjs";
import { debounceTime, map, filter } from "rxjs/Operators";
import { ProductsService } from "src/app/core/services/products.service";
import { SouqService } from "src/app/core/services/shop-service.service";
import { QueryParams } from "src/app/shared/utilities/query-params";

import { CategoryService } from "src/app/core/api/category.service";
import { Category } from "src/app/shared/utilities/interfaces.interface";
import { WebSocketService } from "src/app/core/services/web-socket.service";

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
  responsiveOptions: any[];

  allCategories$: Observable<Category[]> = this._categoryService.getAllCategories$;
  
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
    private _categoryService: CategoryService,
    private productsService: ProductsService,
    private souqSer: SouqService,
    private socketService: WebSocketService
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

    this.responsiveOptions = [
      {
        breakpoint: "1024px",
        numVisible: 5,
        numScroll: 1,
      },
      {
        breakpoint: "768px",
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: "560px",
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  ngAfterViewInit(): void {}

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
  saveOrder() {
    console.log(this.socketService.socket);
    this.socketService.socket.emit("message", { name: "ibrahem" });
  }
  // onHoverOnTap(product?) {
  //   if (product) {
  //     this.filteredProducts = this.products.find(
  //       (elem) => elem.name == product.name
  //     ).myProducts;
  //   }

  //   console.log(this.filteredProducts);
  // }
}
