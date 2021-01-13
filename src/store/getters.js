const getters = {
  token: state => state.modules.user.token,
  avatar: state => state.modules.user.avatar,
  name: state => state.modules.user.name,
  introduction: state => state.modules.user.introduction,
  roles: state => state.modules.user.roles,
}
export default getters
