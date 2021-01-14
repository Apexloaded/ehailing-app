import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PmtHiring } from '../../../providers'

@Component({
  selector: 'app-hire-details',
  templateUrl: './hire-details.page.html',
  styleUrls: ['./hire-details.page.scss'],
})
export class HireDetailsPage implements OnInit {
  public isLoading: boolean;
  public hiredItem;

  constructor(
      private activatedRoute: ActivatedRoute,
      private pmtHiring: PmtHiring
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')) {
        return;
      }

      const hireItemId = paramMap.get('id');
      this.getHireItemDetails(hireItemId);

    });
  }

  getHireItemDetails(id: string) {
    this.pmtHiring.recordRetrieve(`?_id=${id}&populate=pmtTerminalFrom,pmtTerminalTo`).then(res => {
      this.hiredItem = res.payload[0];
      console.log(this.hiredItem);
      this.isLoading = false;
    });
  }

}
