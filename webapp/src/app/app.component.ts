import { Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { MatSidenav } from "@angular/material/sidenav";
import { BreakpointObserver, LayoutModule } from "@angular/cdk/layout";
import { NavigationEnd, Router } from "@angular/router";
import { filter } from "rxjs";
import { TranslateService } from "@ngx-translate/core";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  title = "esigi-customer";
  activeMenu!: "";
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;

  menuList = [
    {
      name: "Início",
      icon: "home",
      selected: false,
      action: "home",
    },
    {
      name: "Cliente",
      icon: "person",
      selected: false,
      action: "cliente/lista",
    },
  ];

  constructor(
    private observer: BreakpointObserver,
    private router: Router,
    public translateService: TranslateService
  ) {
    translateService.addLangs(["en-US", "pt-BR"]);
  }

  ngOnInit(): void {
    this.translateService.setDefaultLang("pt-BR");
    this.translateService.use("pt-BR");
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((res: any) => {
        this.activeMenu = res.url.split("/")[1];
      });
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.observer.observe(["(max-width: 800px)"]).subscribe((res: any) => {
        if (res.matches) {
          this.sidenav.mode = "over";
          this.sidenav.close();
        } else {
          this.sidenav.mode = "side";
          this.sidenav.open();
        }
      });
    }, 50);
  }
  navigate(route: string) {
    this.router.navigate([route]);
  }
}
