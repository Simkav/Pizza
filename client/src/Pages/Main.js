import WithHeaderFooterAside from "../Components/Hoc/WithHeaderFooterAside";
import Products from "../Components/Products/Products";

function Main() {
  const NewComponent = WithHeaderFooterAside(Products);
  return <NewComponent />;
}

export default Main;