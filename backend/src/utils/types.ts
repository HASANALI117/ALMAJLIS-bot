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

export type Channel = {
  id: String;
  type: number;
  name: String;
  guild_id: String;
  last_message_id?: String;
  parent_id?: String;
  rate_limit_per_user?: number;
  topic?: String;
  position?: number;
  permission_overwrites?: Array<{
    id: String;
    type: number;
    allow: String;
    deny: String;
  }>;
  nsfw?: Boolean;
};
