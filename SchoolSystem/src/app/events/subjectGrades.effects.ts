import { Injectable } from '@angular/core';
import {filter, of} from 'rxjs';
import {catchError, map, mergeMap, tap} from 'rxjs/operators';
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {GradeService} from "../services/grade.service";
import {loadSubjectGradesFailure, loadSubjectGradesSuccess, loadSubjectsGrades} from "../actions/SubjectGrade.action";

@Injectable()
export class SubjectGradesEffects {
  loadSubjectGrades$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadSubjectsGrades),
      mergeMap(() =>
        this.gradeService.getGradesOfLoggedInUser().pipe(
          map(subjectGrades => loadSubjectGradesSuccess({ subjectGrades })),
          catchError(error => of(loadSubjectGradesFailure({ error })))
        )
      )
    )
  );
  constructor(private actions$: Actions, private gradeService: GradeService) {}
}
