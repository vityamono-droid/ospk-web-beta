
export interface RoleDetails {
  id: string
  name: string
  label: string | null
}

export interface UpsertRoleDetails {
  name: string
  label: string | null
}
