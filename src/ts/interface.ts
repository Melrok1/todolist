export interface TodoItemType {
  id: string;
  title: string;
  content: string;
  dueDate: Date | null;
  isDone: boolean;
}

export interface TodoStateType {
  todos: TodoItemType[];
}

export interface ModalStateType {
  isAddNewTodoModalVisible: boolean;
  isEditTodoModalVisible: boolean;
  currentTodoId: number | null;
}
