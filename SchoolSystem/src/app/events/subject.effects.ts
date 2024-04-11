import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { SubjectsService } from '../services/subjects.service';
import {loadSubjects, loadSubjectsFailure, loadSubjectsSuccess} from "../actions/Subject.action";
import {Actions, createEffect, ofType} from "@ngrx/effects";

@Injectable()
export class SubjectEffects {
  loadSubjects$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSubjects),
      mergeMap(() =>
        this.subjectsService.getSubjects().pipe(
          map(subjects => loadSubjectsSuccess({ subjects })),
          catchError(error => of(loadSubjectsFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private subjectsService: SubjectsService) {}
}
