export interface TodoItemType {
  title: string;
  content: string;
  dueDate: Date | null;
}

export interface TodoStateType {
  todos: TodoItemType[];
}

export interface ModalStateType {
  isAddNewTodoModalVisible: boolean;
}
