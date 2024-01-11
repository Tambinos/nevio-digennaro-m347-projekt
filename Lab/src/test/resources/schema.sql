CREATE TABLE all_grades
(
    id    int    NOT NULL AUTO_INCREMENT,
    GRADE double NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE all_subjects
(
    id      int  NOT NULL AUTO_INCREMENT,
    Subject text NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE subject_grade
(
    id         int NOT NULL,
    grade_id   int,
    subject_id int,
    PRIMARY KEY (id),
    FOREIGN KEY (grade_id) REFERENCES all_grades (id),
    FOREIGN KEY (subject_id) REFERENCES all_subjects (id)
);
