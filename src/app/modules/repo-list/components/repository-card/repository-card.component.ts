import { Component, OnInit, Input } from '@angular/core';
import { RepositoryDetails } from 'src/app/model/repository-details';

@Component({
  selector: 'app-repository-card',
  templateUrl: './repository-card.component.html',
  styleUrls: ['./repository-card.component.scss']
})
export class RepositoryCardComponent implements OnInit {

  @Input()
  public repositoryData: RepositoryDetails;

  @Input()
  public index: number;

  constructor() { }

  ngOnInit(): void {
  }

}
