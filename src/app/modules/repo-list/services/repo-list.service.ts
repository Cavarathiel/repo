import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { RepositoryDetails } from 'src/app/model/repository-details';

@Injectable()
export class RepoListService {

  constructor(private http: HttpClient) {
  }

  /**
   * Find all repositories to given user.
   * @param userName github user name
   */
  async getAllRepositories(name: string): Promise<RepositoryDetails[]> {
    const url = `https://api.github.com/users/${name}/repos`;

    return this.http.get<RepositoryDetails[]>(url, {headers: {Accept: 'application/vnd.github.v3+json'}})
      .toPromise()
      .catch();
  }
}
