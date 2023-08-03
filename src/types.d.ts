export interface SBQuestion {
  id: string;
  sender_id?: string;
  receiver_id: string;
  content: string;
  created_at: string;
}

export interface SBQuestionUsers extends Omit<SBQuestion, "sender_id"> {
  users?: { username: string };
}

export interface Question {
  id: string;
  receiverId: string;
  sender?: string;
  content: string;
  createdAt: string;
}

interface FormErrors<FieldsErrors> {
  formErrors: string[];
  fieldErrors: FieldsErrors;
}
