import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  addFoodsRequest,
  deleteFoodsRequest,
} from "../../store/foods/foodsThunk";
import { getFoods } from "../../store/meals/mealsThunk";
import { Button, TextField } from "@mui/material";
import { ModalMui } from "../UI/modal/Modal";
import AddIcon from "@mui/icons-material/Add";
import { EditFoods } from "./EditFoods";
import { snackbarActions } from "../../store/snackbar";

export const AddFoods = () => {
  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
  });
  const [openModal, setOpenModal] = useState(false);
  const [editOpenModal, setEditOpenModal] = useState(false);
  const [editData, setEditData] = useState();
  const dispatch = useDispatch();
  const { meals } = useSelector((state) => state.meals);

  const onChangeHandler = (e) => {
    setData({ ...data,[e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    const newData = {
      title: data.title,
      description: data.description,
      price: +data.price,
    };
    dispatch(addFoodsRequest(newData));
    setData({
      title: "",
      description: "",
      price: "",
    });
    setOpenModal(false);
    dispatch(snackbarActions.doSuccess('Successfully aded'))
  };

  useEffect(() => {
    dispatch(getFoods());
  }, [dispatch]);

  const deleteHandler = (id) => {
    dispatch(deleteFoodsRequest(id));
  };

  const openModalHandler = () => {
    setOpenModal((prev) => !prev);
  };

  const openEditModalHandler = () => {
    setEditOpenModal((prev) => !prev);
  };

  const editHandler = (data) => {
    setEditData(data);
    openEditModalHandler();
  };

  return (
    <>
      {editOpenModal && (
        <EditFoods
          toggle={editOpenModal}
          onClick={openEditModalHandler}
          editData={editData}
        />
      )}
      <Wrapper>
        {openModal ? (
          <ModalMui toggle={openModal} onClick={openModalHandler}>
            <Container>
              <form onSubmit={submitHandler}>
                <TextField
                  type="filled"
                  label="Title"
                  value={data.title}
                  placeholder="Title"
                  name="title"
                  onChange={onChangeHandler}
                />
                <TextField
                  type="text"
                  label="Description"
                  value={data.description}
                  placeholder="Description"
                  name="description"
                  onChange={onChangeHandler}
                />
                <TextField
                  type="number"
                  value={data.price}
                  label="Price"
                  placeholder="prise"
                  name="price"
                  onChange={onChangeHandler}
                />
                <Button type="submit" variant="contained">
                  add
                </Button>
              </form>
              <Button
                type="submit"
                variant="contained"
                onClick={openModalHandler}
              >
                cancel
              </Button>
            </Container>
          </ModalMui>
        ) : (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={openModalHandler}
          >
            add product
          </Button>
        )}

        <div>
          {meals.map((el) => (
            <Block key={el._id}>
              <h2>{el.title}</h2>
              <h3>{el.description}</h3>
              <h4>{el.price} $ </h4>
              <Button
                style={{ marginLeft: "440px" }}
                variant="outlined"
                onClick={() => deleteHandler(el._id)}
              >
                delete
              </Button>

              <Button variant="outlined" onClick={() => editHandler(el)}>
                EDIT
              </Button>
            </Block>
          ))}
        </div>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Container = styled.div`
  background-color: #ffff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;

  form {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
`;

const Block = styled.div`
  width: 600px;
  border: 3px solid black;
  color: #fff;
  background-color: #495056;
`;
  