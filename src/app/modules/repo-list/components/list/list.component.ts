import { Component, OnInit, Input } from '@angular/core';
import { RepositoryDetails } from '../../../../model/repository-details';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @Input()
  public listData: RepositoryDetails[];

  constructor() { }

  ngOnInit(): void {
  }

}
