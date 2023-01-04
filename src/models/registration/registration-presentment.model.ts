import { PaymentMethod, TrainingTypeEnum } from "enums";

export interface RegistrationPresentmentInput {
  name?: string;
  email?: string;
  phoneNumber?: string;
  organisation?: string;
  tertiaryEducation?: string;
  profession?: string;

  trainingSelected?: string;
  trainingType?: TrainingTypeEnum;
  paymentMethod?: PaymentMethod;
}

