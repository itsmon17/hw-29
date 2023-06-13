import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import { ModalMui } from "../UI/modal/Modal";
import { useDispatch } from "react-redux";
import { editFoodsRequest } from "../../store/foods/foodsThunk";
import { snackbarActions } from "../../store/snackbar";

export const EditFoods = ({ editData, toggle, onClick }) => {
  const [editTitle, setEditTitle] = useState(editData.title);
  const [editDescription, setEditDescription] = useState(editData.description);
  const [editPrice, setEditPrice] = useState(editData.price);
  const dispatch = useDispatch();

  const onChangeTitle = (e) => {
    setEditTitle(e.target.value);
  };
  
  const onChangeDescription = (e) => {
    setEditDescription(e.target.value);
  };

  const onChangePrice = (e) => {
    setEditPrice(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = {
      title: editTitle,
      description: editDescription,
      price: +editPrice,
      id: editData._id,
    };

    dispatch(editFoodsRequest(data));
    onClick(false);
    dispatch(snackbarActions.doSuccess('Successfully saved'))
  };

  return (
    <ModalMui toggle={toggle} onClick={onClick}>
      <form onSubmit={submitHandler}>
        <TextField value={editTitle} onChange={onChangeTitle} />
        <TextField value={editDescription} onChange={onChangeDescription} />
        <TextField value={editPrice} onChange={onChangePrice} />
        <Button type="submit"> save </Button>
      </form>
      <Button onClick={() => onClick(false)}>cancel</Button>
    </ModalMui>
  );
};
