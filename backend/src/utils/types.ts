export type PartialGuild = {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: string;
  features: string[];
};

export type DiscordUser = {
  id: string;
  email?: string;
  username: string;
  global_name?: string;
  avatar: string | null;
  banner?: string;
  discriminator?: string;
};
