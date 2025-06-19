export type PartialGuild = {
  id: string;
  name: string;
  icon: string;
  owner: boolean;
  permissions: string;
  features: string[];
  roles?: Role[];
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
  id: string;
  type: number;
  name: string;
  guild_id: string;
  last_message_id?: string;
  parent_id?: string;
  rate_limit_per_user?: number;
  topic?: string;
  position?: number;
  permission_overwrites?: Array<{
    id: string;
    type: number;
    allow: string;
    deny: string;
  }>;
  nsfw?: boolean;
};

export type Role = {
  id: string;
  name: string;
  color: number;
  hoist: boolean;
  position: number;
  permissions: string;
  managed: boolean;
  mentionable: boolean;
};

export type AutoroleSettings = {
  enabled: boolean;
  roleId: string | null;
};
