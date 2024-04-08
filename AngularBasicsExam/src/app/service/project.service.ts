import { Injectable } from '@angular/core';
import { Project } from '../models/Project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  projects: Project[];

  constructor() {
    if (window.localStorage.getItem('Projects')) {
      this.projects = JSON.parse(window.localStorage.getItem('Projects') ?? '');
    } else {
      this.projects = [
        new Project('No Project'),
        new Project('Fortnite'),
        new Project('Epic Games'),
      ];
    }
    window.localStorage.setItem('Projects', JSON.stringify(this.projects));
  }

  getProjects(): Project[] {
    this.projects = JSON.parse(window.localStorage.getItem('Projects') ?? '');
    return this.projects;
  }
  addProject(project: Project) {
    this.projects.push(project);
    window.localStorage.setItem('Projects', JSON.stringify(this.projects));
  }
}
