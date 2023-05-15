import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Subscription, debounceTime, fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';

interface Pays {
  code: string;
  nomPays: string;
}

@Component({
  selector: 'app-pays',
  templateUrl: './pays.component.html',
  styleUrls: ['./pays.component.css']
})
export class PaysComponent implements AfterViewInit {
  afficherListe: boolean;
  
  @ViewChild('input') 
  inputText!: ElementRef<HTMLInputElement>; 
  
  pays: Pays[] = [
    {
      code : "FI", nomPays: "Finlande"
    },
    {
      code: "FR", nomPays: "France"
    },
    {
      code: "NC", nomPays: "New Caledonia"
    },
    {
      code: "WF", nomPays: "Wallis and Futuna"
    }
   
  ];
  
  paysCourant: Array<Pays> = [];
  
  souscription!: Subscription;
  
  constructor() {
    this.afficherListe = false;
  }
  
  ngAfterViewInit() {
    this.souscription = fromEvent(this.inputText.nativeElement, 'keyup').pipe(
      debounceTime(100), 
      map((event: Event) => (event.target as HTMLInputElement).value.trim().toLowerCase()) 
      ).subscribe((value: string) => {
        if (value.length === 0) {
          this.paysCourant = []; 
        } else {
          this.paysCourant = this.pays.filter((pays: Pays) =>
          pays.nomPays.toLowerCase().startsWith(value) 
          );
        }
      });  
    }
    
    cacherListe() {
      setTimeout(() => {
        this.afficherListe = false;
      }, 100);
    }
    
    filtrerPays(){
      // if (this.inputText.nativeElement.value.trim().length >0){
      //   this.paysCourant = this.pays.filter(pa)
      // }
      
    }
    
    selectPays(pays: Pays){
      this.inputText.nativeElement.value = pays.nomPays;  
      this.afficherListe = false;
    }
    
    ngOnDestroy() {
      this.souscription.unsubscribe(); 
    }
  }
  
  