import { ICode } from 'src/models/CodeModel';

export interface CodeData {
  _id: string;
  title: string;
  content: string;
  classeDeLogs: string;
  config: string;
  recommendation: string;
}

export interface GetAllCodesResponse<T> {
  message: string;
  codeData: T[];
}

export interface CodeIdInterface {
  id: string;
}

export interface UpdateCodeRequest {
  id: string;
  title: string;
  content: string;
  classeDeLogs: string;
  config: string;
  recommendation: string;
}

export interface DeleteCodeResponse<T> {
  message: string;
  deletedCode: T;
}
export interface AddCodeRequest {
  title: string;
  content: string;
  classeDeLogs: string;
  config: string;
  recommendation: string;
}
export interface AddCodeResponse<T> {
  message: string;
  newCode: T;
}

export const decodeCodesResponse = (
  response: GetAllCodesResponse<CodeData>
): ICode[] => {
  const data: CodeData[] = response.codeData;

  const codes: ICode[] = data.map((code) => ({
    id: code._id,
    title: code.title,
    content: code.content,
    classeDeLogs: code.classeDeLogs,
    config: code.config,
    recommendation: code.recommendation
  }));

  return codes;
};
