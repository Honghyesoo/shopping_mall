// import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  changeName,
  changeCount,
  changeCount2,
  increase,
  deleteCart,
} from "./store";

const Cart = () => {
  let user = useSelector((state) => state.user);
  let cart = useSelector((state) => state.cart);
  let dispatch = useDispatch();

  const deleteHandler = (id) => {
    dispatch(deleteCart(id));
  };

  return (
    <div>
      <div>
        {user.name}
        {user.age}의 장바구니
        <button
          onClick={() => {
            dispatch(increase());
          }}
        >
          버튼
        </button>
        <button
          onClick={() => {
            dispatch(changeName());
          }}
        >
          +
        </button>
      </div>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>상품명</th>
            <th>수량</th>
            <th>변경하기</th>
          </tr>
        </thead>
        {cart.map((item, i) => (
          <tbody key={i}>
            <tr>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.count}</td>
              <td>
                <button
                  onClick={() => {
                    dispatch(changeCount(item.id));
                  }}
                >
                  +
                </button>

                <button
                  onClick={() => {
                    dispatch(changeCount2(item.id));
                  }}
                >
                  -
                </button>
                <button onClick={() => deleteHandler(item.id)}>삭제</button>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </div>
  );
};

export default Cart;
