import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addCart } from "./store";

const Detailss = (props) => {
  let dispatch = useDispatch();

  useEffect(() => {});
  let [count, setCount] = useState(0);
  let { id } = useParams();

  const [alert, setAlert] = useState(true);
  const [num, setNum] = useState(123);
  //탭버튼
  const [탭, 탭변경] = useState(0);
  //컴포넌트 투명도 0 -> 1 로 주기
  const [lighting, setLighting] = useState("");

  useEffect(() => {
    setLighting("end");
    return () => {
      setLighting("");
    };
  }, [lighting]);

  useEffect(() => {
    setTimeout(() => {
      setAlert(false);
    }, 2000);
  }, []);

  useEffect(() => {
    if (isNaN(num) === true) {
      window.alert("그러지마세요");
    }
  }, [num]);

  const poketHandle = () => {
    const item = props.shoes.find((shoes) => shoes.id === parseInt(id));

    dispatch(addCart({ id: item.id }));
  };

  return (
    <>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        버튼
      </button>
      {alert === true ? <p>재고가 얼마 남지 않았습니다.</p> : null}

      <div className={"container start " + lighting}>
        <div className="row">
          <div className="col-md-6">
            <img
              src={`https://codingapple1.github.io/shop/shoes${
                parseInt(id) + 1
              }.jpg`}
              width="100%"
            />
          </div>

          <div className="col-md-6 mt-4">
            <h4 className="pt-5">{props.shoes[id].title}</h4>
            <p>{props.shoes[0].content}</p>
            <p>{props.shoes[0].price}원</p>
            <button className="btn btn-danger" onClick={poketHandle}>
              주문하기
            </button>
            {/* <input
              onChange={(e) => {
                setNum(e.target.value);
              }}
            /> */}
          </div>
        </div>
        <Nav variant="tabs" defaultActiveKey="link0">
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                탭변경(0);
              }}
              eventKey="link0"
            >
              버튼0
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                탭변경(1);
              }}
              eventKey="link1"
            >
              버튼1
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              onClick={() => {
                탭변경(2);
              }}
              eventKey="link2"
            >
              버튼2
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent 탭={탭} shoes={props.shoes} />
      </div>
    </>
  );
};

function TabContent({ 탭, shoes }) {
  const [fade, setFade] = useState("");

  useEffect(() => {
    setTimeout(() => {
      setFade("end");
    }, 100);
    return () => {
      setFade("");
    };
  }, [탭]);
  return (
    <div className={"start " + fade}>
      {[<div>{shoes[0].title}</div>, <div>내용1</div>, <div>내용2</div>][탭]}
    </div>
  );
}
export default Detailss;
