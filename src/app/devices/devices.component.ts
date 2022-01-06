import { OnInit, Component, ChangeDetectionStrategy } from '@angular/core';
import {
  Params,
  Router,
  ActivatedRoute,
  NavigationExtras,
} from '@angular/router';

import { ICON_TYPE } from './shared/constants/icon';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DevicesComponent implements OnInit {
  icon = ICON_TYPE;
  searchVal: string = '';

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    const param: Params = this.activatedRoute.snapshot.queryParams;
    this.searchVal = param['name'];
  }

  onCancelSearch() {
    this.searchVal = '';
    this.onSearch();
  }

  onSearch() {
    let routeParams: NavigationExtras = {
      relativeTo: this.activatedRoute,
    };

    if (this.searchVal) {
      routeParams = {
        ...routeParams,
        queryParams: { name: this.searchVal.trim() },
        queryParamsHandling: 'merge',
      };
    }

    this.router.navigate([], routeParams);
  }
}
