export const routes = {
  home: () => "/",
  login: () => "/login",
  register: () => "/register",
  tasks: {
    index: () => "/tasks",
    show: (id: number | string) => `/tasks/${id}`,
    create: () => "/tasks/create",
    edit: (id: number | string) => `/tasks/${id}/edit`,
  },
};
