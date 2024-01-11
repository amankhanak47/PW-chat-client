export type Button = {
  code: string;
  label: string;
  link_url: string;
  action_taken: boolean;
};

export type Message = {
  sender: number;
  receiver: number;
  content: string;
  sent_at: string;
  type: string;
  card_data?: any;
  form_data?: any;
  buttons?: Button[];
  uuid: string;
};

export type Command = {
  name: string;
  code: string;
};

export enum AvailableCommands {
  UPDATE_GOALS = "Update My Goals",
  APPLY_FOR_LEAVE = "Apply for Leave",
  GIVE_FEEDBACK = "Give Feedback",
}
