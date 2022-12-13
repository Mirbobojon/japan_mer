export const SELECT_DEPARTMENT_LIST = 'SELECT_DEPARTMENT_LIST'
export const selectDepartmentListAction = (departmentState) =>
{
  return {
    type: 'SELECT_DEPARTMENT_LIST',
    payload: {
      list: departmentState
    }
  }
}

export const SELECT_DEPARTMENT = 'SELECT_DEPARTMENT'
export const selectDepartmentAction = (departmentState) =>
{
  return {
    type: 'SELECT_DEPARTMENT',
    payload: {
      selectDepartment: departmentState
    }
  }
}

