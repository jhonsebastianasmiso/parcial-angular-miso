import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Cafe } from '../cafe';
import { CafeService } from '../cafe.service';

@Component({
  selector: 'app-cafe-list',
  standalone: false,
  templateUrl: './cafe-list.component.html',
  styleUrl: './cafe-list.component.css'
})
export class CafeListComponent implements OnInit {
  cafes: Array<Cafe> = [];
  totalCafeOrigen: number = 0;
  totalCafeBlend: number = 0;

  constructor(
    private cafeService: CafeService,
    private cdr: ChangeDetectorRef
  ) { }

  getCafes(): void {
    this.cafeService.getCafes().subscribe({
      next: (cafes) => {
        this.cafes = cafes;
        this.calcularTotalesPorTipo(cafes);
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error al obtener la lista de cafés', err);
      }
    });
  }

  calcularTotalesPorTipo(cafes: Array<Cafe>): void {
    this.totalCafeOrigen = cafes.filter(cafe =>
      cafe.tipo && cafe.tipo.toLowerCase().includes('origen')
    ).length;

    this.totalCafeBlend = cafes.filter(cafe =>
      cafe.tipo && cafe.tipo.toLowerCase().includes('blend')
    ).length;
  }

  ngOnInit(): void {
    this.getCafes();
  }
}
