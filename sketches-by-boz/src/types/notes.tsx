export type ButtonWithIconProps = {
  onClick?: () => void;
  icon?: string;
  iconAlt?: string;
  label: string;
  disabled?: boolean;
};

export type Theme = "laranja" | "verde" | "lilas" | "amarelo";

export type CardProps = {
  id: string;
  text: string;
  theme: Theme;
  onDeleted: (id: string) => void;
  onUpdated: (id: string, payload: { text: string; theme: Theme }) => void;
};

export type CardData = {
  id: string;
  text: string;
  theme: "amarelo" | "verde" | "laranja" | "lilas";
};

export type ContentProps = {
  sketches: CardData[];
  loading: boolean;
  error: string;
  onDeleted: (id: string) => void;
  onUpdated: (id: string, payload: { text: string; theme: Theme }) => void; 
};

export type HeaderProps = {
  onCreate: (payload: { text: string; theme: Theme }) => Promise<void> | void;
};

export type ModalProps = {
  onClose: () => void;
  title: string;
  initialText?: string;
  initialTheme?: Theme | "";
  onSubmit?: (payload: { text: string; theme: Theme }) => Promise<void> | void;
};