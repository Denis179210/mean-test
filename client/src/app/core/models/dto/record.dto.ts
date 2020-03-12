export enum Role { Designer = 'Des', Artist = 'Art', ArtManager = 'ArtMan' };

export interface RecordDto {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}
