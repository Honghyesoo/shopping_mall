import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav } from "react-bootstrap";
import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import data from "./data";
import Detailss from "./Detailss";
import axios from "axios";
import Cart from "./Cart";

function App() {
  let [shoes, setShoes] = useState(data);
  const [clear, setClear] = useState(0);

  return (
    <div className="App">
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Link to="/" className="link">
              Home
            </Link>
            <Link to="detailss/0" className="link">
              상세페이지
            </Link>
            <Link to="cart" className="link">
              장바구니
            </Link>
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route
          path="/"
          element={
            <>
              <div className="main-bg"></div>
              <div className="container">
                <div className="row">
                  {shoes.map((a, i) => {
                    return <Card shoes={shoes[i]} i={i} key={i}></Card>;
                  })}
                </div>
              </div>
              <button
                onClick={() => {
                  try {
                    Promise.all([
                      axios.get(
                        "https://codingapple1.github.io/shop/data2.json"
                      ),
                      axios
                        .get("https://codingapple1.github.io/shop/data3.json")
                        .then((결과) => {
                          let copy = [...shoes, ...결과.data];
                          setShoes(copy);
                          setClear(clear + 1);
                          if (clear === 2) {
                            alert("자료없성");
                          }
                        })
                        .catch(() => {
                          console.log("실패함 ㅅㄱ");
                        }),
                    ]);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                더보기
              </button>
            </>
          }
        />
        <Route path="/detailss/:id" element={<Detailss shoes={shoes} />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

function Card(props) {
  return (
    <div className="col-md-4">
      <Link to={`/detailss/${props.i}`}>
        <img
          src={`https://codingapple1.github.io/shop/shoes${props.i + 1}.jpg`}
          alt="/"
          width="80%"
        />
      </Link>
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  );
}

export default App;
