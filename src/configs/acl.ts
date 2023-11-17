import { AbilityBuilder, Ability } from '@casl/ability'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

export const AppAbility = Ability as any
export type ACLObj = {
  action: Actions
  subject: string
}

const defineRulesFor = (role: string) => {
  const { can, rules } = new AbilityBuilder(AppAbility)

  if (role === 'JEFE') {
    can('manage', 'reclamos')
    can('manage', 'admin')
    can('manage', 'capataz')
    can('manage', 'super-admin')
    can('manage', 'perfil')
  } else if (role === 'CAPATAZ') {
    can('manage', 'reclamos')
    can('manage', 'admin')
    can('manage', 'capataz')
    can('manage', 'perfil')
  } else if (role === 'EMPLEADO') {
    can('manage', 'reclamos')
    can('manage', 'admin')
    can('manage', 'perfil')
  } else if (role === 'CONTRIBUYENTE') {
    can('manage', 'mis-reclamos')
    can('manage', 'perfil')
  }

  return rules
}

export const buildAbilityFor = (role: string): AppAbility => {
  return new AppAbility(defineRulesFor(role), {
    // @ts-ignore
    detectSubjectType: object => object!.type
  })
}

export const defaultACLObj: ACLObj = {
  action: 'manage',
  subject: 'reclamos'
}

export default defineRulesFor
