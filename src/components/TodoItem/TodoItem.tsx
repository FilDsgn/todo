import './TodoItem.scss';
import block from 'bem-cn-lite';
const b = block('todo-item');

import {Checkbox, Text} from '@gravity-ui/uikit';
import {FC} from 'react';
import {TodoItemProps} from './TodoItem.types';
import {todosSlice} from '../../app/store/slices/todosSlice';
import {useAppDispatch} from '../../app/hooks/redux';

const TodoItem: FC<TodoItemProps> = ({id, title, type}) => {
    const {setTodoType} = todosSlice.actions;
    const dispatch = useAppDispatch();

    const handleCheckboxChange = () => {
        dispatch(setTodoType({id, title, type}));
    };

    return (
        <div className={b()}>
            <Checkbox size="l" checked={type === 'completed'} onChange={handleCheckboxChange} />
            <Text
                className={type === 'completed' ? b('text_through') : ''}
                color={type === 'completed' ? 'hint' : 'primary'}
                variant="body-3"
                ellipsis
            >
                {title}
            </Text>
        </div>
    );
};

export default TodoItem;
