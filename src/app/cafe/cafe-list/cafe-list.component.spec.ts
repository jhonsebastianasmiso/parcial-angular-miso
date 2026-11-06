import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { CafeListComponent } from './cafe-list.component';
import { CafeService } from '../cafe.service';
import { Cafe } from '../cafe';

describe('CafeListComponent', () => {
  let component: CafeListComponent;
  let fixture: ComponentFixture<CafeListComponent>;
  let debug: DebugElement;

  const mockCafes: Cafe[] = [
    new Cafe(
      1,
      'Café Especial para tí',
      'Blend',
      'Angelópolis, Antioquia',
      'Panela, Durazno, Caramelo',
      1920,
      'https://cdn.shopify.com/s/files/1/0272/2873/3504/products/cafe-especial-para-ti.jpg'
    ),
    new Cafe(
      2,
      'Café Especial Navegante',
      'Café de Origen',
      'Guatapé, Antioquia',
      'Cítrico, Naranja, Cacao',
      1800,
      'https://cdn.shopify.com/s/files/1/0272/2873/3504/products/cafe-especial-navegante.png'
    ),
    new Cafe(
      3,
      'Café Especial El Prístino',
      'Blend',
      'Chinchiná, Caldas',
      'Chocolate negro, Caramelo',
      1700,
      'https://cdn.shopify.com/s/files/1/0272/2873/3504/products/cafe-especial-pristino.png'
    )
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [CafeListComponent],
      providers: [CafeService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CafeListComponent);
    component = fixture.componentInstance;
    debug = fixture.debugElement;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Punto No. 3 (20%):
   * "Para esto, en la prueba cree un listado de 3 cafés y verifique que la tabla se crea
   * correctamente con tres filas más el encabezado."
   */
  it('should render a table with 3 data rows plus header (4 rows in total)', () => {
    component.cafes = mockCafes;
    component.calcularTotalesPorTipo(mockCafes);
    fixture.detectChanges();

    // 1. Encabezado en thead
    const theadRows = debug.queryAll(By.css('thead tr'));
    expect(theadRows.length).toBe(1);

    // 2. Tres filas en tbody correspondientes a los 3 cafés
    const tbodyRows = debug.queryAll(By.css('tbody tr'));
    expect(tbodyRows.length).toBe(3);

    // 3. Total de cuatro filas (tres filas de datos + una de encabezado)
    const allRows = debug.queryAll(By.css('tr'));
    expect(allRows.length).toBe(4);
  });

  it('should display the correct cafe information in each table row', () => {
    component.cafes = mockCafes;
    component.calcularTotalesPorTipo(mockCafes);
    fixture.detectChanges();

    const tbodyRows = debug.queryAll(By.css('tbody tr'));
    tbodyRows.forEach((rowDebug, index) => {
      const rowText = rowDebug.nativeElement.textContent;
      expect(rowText).toContain(mockCafes[index].id.toString());
      expect(rowText).toContain(mockCafes[index].nombre);
      expect(rowText).toContain(mockCafes[index].tipo);
      expect(rowText).toContain(mockCafes[index].region);
    });
  });

  it('should calculate and display totals for coffee types correctly', () => {
    component.cafes = mockCafes;
    component.calcularTotalesPorTipo(mockCafes);
    fixture.detectChanges();

    // En mockCafes: 1 Café de Origen y 2 Blend
    expect(component.totalCafeOrigen).toBe(1);
    expect(component.totalCafeBlend).toBe(2);

    const totalsSection = debug.query(By.css('.coffee-totals')).nativeElement;
    expect(totalsSection.textContent).toContain('Total café de origen: 1');
    expect(totalsSection.textContent).toContain('Total café blend: 2');
  });

  it('should load cafes from CafeService on ngOnInit', () => {
    const cafeService = TestBed.inject(CafeService);
    const getCafesSpy = vi.spyOn(cafeService, 'getCafes').mockReturnValue(of(mockCafes));

    component.ngOnInit();
    fixture.detectChanges();

    expect(getCafesSpy).toHaveBeenCalled();
    expect(component.cafes.length).toBe(3);
    expect(component.totalCafeOrigen).toBe(1);
    expect(component.totalCafeBlend).toBe(2);
  });
});
