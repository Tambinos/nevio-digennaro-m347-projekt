import {createFeatureSelector, createSelector} from '@ngrx/store';
import {SubjectGrade} from "../models/SubjectGrade";
import {SubjectGradesState} from "../state/subject.grades.state";

export const selectGrades = createFeatureSelector<SubjectGradesState>('subjectGrades');

export const selectAvgGradeBySubjectId = createSelector(
  selectGrades,
  (subjectGrades: SubjectGradesState, props: { subjectId: number }) => {
    const relevantGrades: SubjectGrade[] = subjectGrades.subjectGrades.filter(grade => grade.subject.id === props.subjectId);
    const total: number = relevantGrades.reduce((acc, curr) => acc + curr.grade.grade, 0);
    return relevantGrades.length > 0 ? total / relevantGrades.length : 0;
  }
);
