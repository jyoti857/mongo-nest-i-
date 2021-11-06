import { User } from "../../schemas/user.schema"

export const userStub = (): User => {
  return {
    userId: '123',
    age: 32,
    email: 'stub1@email.com',
    favoriteFoods: ['fav1', 'fav2']
  }
}