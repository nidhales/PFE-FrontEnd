import { SignInField } from "./SignInFields.interface";

export type User = Omit<SignInField,'confirmPassword'>;