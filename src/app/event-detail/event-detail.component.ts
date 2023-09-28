import { Component } from '@angular/core';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css'],
})
export class EventDetailComponent {}

// TypeScript ile seçilen tabı göster veya gizle
const tabs: NodeListOf<Element> = document.querySelectorAll('.tab-button');
const tabContents: NodeListOf<Element> =
  document.querySelectorAll('.tab-content');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    // Tüm tabları gizle
    tabContents.forEach((content) => {
      content.classList.add('hidden');
    });

    // Tıklanan tabın içeriğini göster
    const targetId: string | null = tab.getAttribute('data-tabs-target');
    const targetContent: Element | null = document.querySelector(
      targetId || ''
    );
    if (targetContent) {
      targetContent.classList.remove('hidden');
    }
  });
});
