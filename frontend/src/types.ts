export type SpringPage<T> = {
    content: T[];
    last: boolean;
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;
    first: boolean;
    numberOfElements?: number;
    empty: boolean;
  };

export type Course = {
    id: number;
    name: string;
    imgUrl: string;
    description: string;
    subjects: Subject[];
}

export type Subject = {
    id: number;
    name: string;
    semester: number;
    classes: Class[];
    courses: Course[];
}

export type Class = {
    id: number;
    code: string;
    limitOfStudents: number;
    subject: Subject;
    users: User[];
}

export type User = {
    id:number;
    name: string;
    email: string;
    password: string;
    imgUrl: string;
    roles : Role[];
    classes: Class[];
    courses: Course[];
}

export type Role = {
    id: number;
    authority : string;
}