import { Component, OnInit } from '@angular/core';
import { Cafe } from '../cafe';
import { CafeService } from '../cafe.service';

@Component({
  selector: 'app-cafe-list',
  standalone: false,
  templateUrl: './cafe-list.component.html',
  styleUrls: ['./cafe-list.component.css']
})
export class CafeListComponent implements OnInit {
  cafes: Array<Cafe> = [];

  constructor(private cafeService: CafeService) { }

  getCafes(): void {
    this.cafeService.getCafes().subscribe({
      next: (cafes) => {
        this.cafes = cafes;
      },
      error: (err) => {
        console.error('Error al obtener la lista de cafés', err);
      }
    });
  }

  ngOnInit(): void {
    this.getCafes();
  }
}
