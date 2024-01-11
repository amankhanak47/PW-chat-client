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
