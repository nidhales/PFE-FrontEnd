import { ISubject } from 'src/models/SubjectModel';

export interface SubjectData {
  _id: string;
  subjectName: string;
}

export interface GetAllSubjectsResponse<T> {
  message: string;
  subjectData: T[];
}

export interface AddSubjectRequest {
  subjectName: string;
}

export interface AddSubjectResponse<T> {
  message: string;
  newSubject: T;
}

export interface SubjectIdInterface {
  id: string;
}

export interface UpdateSubjectRequest {
  id: string;
  name: string;
}

export interface DeleteSubjectResponse<T> {
  message: string;
  deletedSubject: T;
}

export const decodeSubjectsResponse = (
  response: GetAllSubjectsResponse<SubjectData>
): ISubject[] => {
  const data: SubjectData[] = response.subjectData;

  const subjects: ISubject[] = data.map((subject) => ({
    id: subject._id,
    subjectName: subject.subjectName
  }));

  return subjects;
};
