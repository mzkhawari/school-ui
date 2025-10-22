import { Route } from '@angular/router';
import { StudentComponent } from './student/student.component';
import { StudentPresentComponent } from './student-present/student-present.component';

export const studentRoutes: Route[] = [
    {
        path: 'students',
        component: StudentComponent,
    },
    {
        path: 'student/add',
        component: StudentPresentComponent,
    },

];
