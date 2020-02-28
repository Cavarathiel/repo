import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { RepositoryResponse } from 'src/app/model/repository-response';
import { Branch } from 'src/app/model/branch';

@Injectable()
export class RepoListService {

  private githubUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {
  }

  static handleError(error: any): Promise<any> {
    if (error) {
      console.error('An error occurred');
    }
    return error.status;
  }

  /**
   * Find all repositories to given user.
   * @param userName github user name
   */
  async getAllRepositories(userName: string): Promise<RepositoryResponse[]> {
    const url = `${this.githubUrl}/users/${userName}/repos`;

    return this.http.get<RepositoryResponse[]>(url, {headers: {Accept: 'application/vnd.github.v3+json'}})
      .toPromise()
      .catch(RepoListService.handleError);
  }

  /**
   * Find all branches to given repository.
   * @param userName github user name
   * @param repoName github repository name
   */
  async getBranchesForRepository(userName: string, repoName: string): Promise<Branch[]> {
    const url = `${this.githubUrl}/repos/${userName}/${repoName}/branches`;

    return this.http.get<Branch[]>(url, {headers: {Accept: 'application/vnd.github.v3+json'}})
      .toPromise()
      .catch(RepoListService.handleError);
  }
}
