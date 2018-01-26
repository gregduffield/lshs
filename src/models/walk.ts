import { Teacher } from "./teacher";

export class Walk {
    walkId?: string;
    walkDate: Date;
    period: string;
    observerTeacher: Teacher;
    observedTeachers: Array<Teacher> = new Array<Teacher>();
    comments: string;

    constructor(values: Object = {}){
        Object.assign(this, values);
    }
}