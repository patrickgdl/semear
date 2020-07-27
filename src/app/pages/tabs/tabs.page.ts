import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  tabSelected: string | undefined;

  constructor() {}

  async ionTabsDidChange(event: HTMLIonTabsElement) {
    this.tabSelected = await event.getSelected();
  }
}
