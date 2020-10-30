import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { WidgetsComponent } from '../widgets/widgets.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent implements OnInit {

  constructor(
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {

  }

  openDialog() {
    const dialogRef = this.dialog.open(WidgetsComponent, {width: 'auto',
    height: 'auto'});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  showError() {
    this.router.navigate(['/error']);
  }


}
