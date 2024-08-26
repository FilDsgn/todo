import './TodoList.scss';
import block from 'bem-cn-lite';
const b = block('todo-list');

import {
    Button,
    Card,
    Pagination,
    PaginationProps,
    Tabs,
    TabsItemProps,
    Text,
    TextInput,
} from '@gravity-ui/uikit';
import TodoItem from '../TodoItem/TodoItem';
import {useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../app/hooks/redux';
import {ITodo} from '../../app/shared/types/todo.interface';
import {clearCompleted, todosSlice} from '../../app/store/slices/todosSlice';

const TodoList = () => {
    const [inputValue, setInputValue] = useState('');
    const [activeTab, setActiveTab] = useState('all');
    const [paginationState, setPaginationState] = useState({page: 1, pageSize: 5});

    const handleUpdatePage: PaginationProps['onUpdate'] = (page, pageSize) =>
        setPaginationState((prevState) => ({...prevState, page, pageSize}));

    const {todos} = useAppSelector((store) => store.todosSlice);
    const {addTodo} = todosSlice.actions;
    const dispatch = useAppDispatch();

    const activeTodos = todos.filter((todo: ITodo) => todo.type === 'active');
    const completedTodos = todos.filter((todo: ITodo) => todo.type === 'completed');

    const tabItems: TabsItemProps[] = [
        {id: 'all', title: 'All'},
        {id: 'active', title: 'Active'},
        {id: 'completed', title: 'Completed'},
    ];

    const handleAddButton = () => {
        dispatch(
            addTodo({
                id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
                title: inputValue,
                type: 'active',
            }),
        );
        setInputValue('');
    };

    const getPaginationTotal = () => {
        if (activeTab === 'active') {
            return activeTodos.length;
        } else if (activeTab === 'completed') {
            return completedTodos.length;
        } else {
            return todos.length;
        }
    };

    const paginationTotal = getPaginationTotal();

    return (
        <Card className={b()} view="raised">
            <form className={b('form')}>
                <TextInput
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    size="xl"
                    placeholder="What needs to be done?"
                    hasClear={!!inputValue}
                />
                <Button
                    size="xl"
                    type="submit"
                    view="action"
                    onClick={(e) => {
                        e.preventDefault();
                        handleAddButton();
                    }}
                    disabled={!inputValue}
                >
                    Add
                </Button>
            </form>
            <Tabs
                activeTab={activeTab}
                items={tabItems}
                onSelectTab={(tabId) => setActiveTab(tabId)}
                className={b('tabs')}
            />
            <div className={b('items')}>
                {activeTab === 'all' &&
                    todos
                        .slice(
                            (paginationState.page - 1) * paginationState.pageSize,
                            paginationState.page * paginationState.pageSize,
                        )
                        .map((todo: ITodo) => (
                            <TodoItem
                                id={todo.id}
                                title={todo.title}
                                type={todo.type}
                                key={todo.id}
                            />
                        ))}
                {activeTab === 'active' &&
                    activeTodos
                        .slice(
                            (paginationState.page - 1) * paginationState.pageSize,
                            paginationState.page * paginationState.pageSize,
                        )
                        .map((todo: ITodo) => (
                            <TodoItem
                                id={todo.id}
                                title={todo.title}
                                type={todo.type}
                                key={todo.id}
                            />
                        ))}
                {activeTab === 'completed' &&
                    completedTodos
                        .slice(
                            (paginationState.page - 1) * paginationState.pageSize,
                            paginationState.page * paginationState.pageSize,
                        )
                        .map((todo: ITodo) => (
                            <TodoItem
                                id={todo.id}
                                title={todo.title}
                                type={todo.type}
                                key={todo.id}
                            />
                        ))}
            </div>
            {activeTab === 'all' && !todos.length && (
                <Text className={b('message')} color="hint">
                    No todos
                </Text>
            )}
            {activeTab === 'active' && !activeTodos.length && (
                <Text className={b('message')} color="hint">
                    No active todos
                </Text>
            )}
            {activeTab === 'completed' && !completedTodos.length && (
                <Text className={b('message')} color="hint">
                    No completed todos
                </Text>
            )}
            <div className={b('bottom-container')}>
                <Text className={b('counter')}>{activeTodos.length} items left</Text>
                <Pagination
                    page={paginationState.page}
                    pageSize={paginationState.pageSize}
                    total={paginationTotal}
                    onUpdate={handleUpdatePage}
                />
                <Button
                    size="m"
                    view="flat-danger"
                    disabled={!completedTodos.length}
                    onClick={() => {
                        dispatch(clearCompleted());
                        handleUpdatePage(1, 5);
                    }}
                >
                    Clear completed
                </Button>
            </div>
        </Card>
    );
};

export default TodoList;
