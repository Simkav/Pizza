import cl from './EditIngridientsForm.module.css';
import { useSelector } from 'react-redux';
import IngridientContainer from '../IngridientContainer/IngridientContainer';
import IngridientModals from '../IngridientModals/IngridientModals';
import useModalsReducer from '../../../Hooks/useModalsReducer';
import { openAddModal } from '../../../Actions/actionCreator';

export default function EditIngridientsForm () {
  const ingridients = useSelector(({ ingridients }) => ingridients.ingridients);
  const [modalsState, modalsDispatch] = useModalsReducer();

  return (
    <div className={cl.edit_ingridients_form_container}>
      <h1 className={cl.edit_ingridients_form_title}>Ингридиенты</h1>
      <div className={cl.edit_ingridients_form_wrapper}>
        {ingridients
          ? ingridients.map((item) => (
              <IngridientContainer
                key={item.id}
                item={item}
                modalsDispatch={modalsDispatch}
              />
            ))
          : null}
        {
          <IngridientModals
            modalsState={modalsState}
            modalsDispatch={modalsDispatch}
          />
        }
      </div>
      <div className={cl.add_button_container}>
        <div
          className={cl.add_button}
          onClick={() => modalsDispatch(openAddModal())}
        >
          Добавить ингридиент
        </div>
      </div>
    </div>
  );
}
