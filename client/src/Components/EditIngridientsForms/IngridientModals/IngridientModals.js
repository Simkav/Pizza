import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ErrorModal from '../../ErrorModal/ErrorModal';
import AddModal from '../AddModal/AddModal';
import DeleteModal from '../DeleteModal/DeleteModal';
import EditModal from '../EditModal/EditModal';
import { ingridientsActionClearError } from '../../../Actions/actionCreator';

export default function IngridientModals({ modalsState, modalsDispatch }) {
  const dispatch = useDispatch();
  const isError = useSelector(({ ingridients }) => ingridients.error);

  return (
    <>
      {isError ? (
        <ErrorModal
          error={isError}
          clearError={() => dispatch(ingridientsActionClearError())}
        />
      ) : null}

      <EditModal modalsState={modalsState} modalsDispatch={modalsDispatch} />
      <DeleteModal modalsState={modalsState} modalsDispatch={modalsDispatch} />
      <AddModal modalsState={modalsState} modalsDispatch={modalsDispatch} />
    </>
  );
}
