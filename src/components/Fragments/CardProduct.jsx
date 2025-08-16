import Button from "../Elements/Button";

const CardProduct = (props) => {
  const { children } = props;
  return (
    <div className="flex flex-col justify-between w-full max-w-xs rounded-lg shadow-lg bg-white border border-gray-200">
      {children}
    </div>
  );
};

const Header = (props) => {
  const { image } = props;
  return (
    <div>
      <a href="#">
        <img src={image} alt="Shoes" className="p-8 w-sm rounded-t-lg" />
      </a>
    </div>
  );
};

const Body = (props) => {
  const { name, children } = props;
  return (
    <div className="px-5">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-black">
          {name}
        </h5>
        <p className="text-sm tracking-tight">{children}</p>
      </a>
    </div>
  );
};

const Footer = (props) => {
  const { price, handleAddToCart, id } = props;
  return (
    <div className="px-5 py-5 flex justify-between items-center">
      <span className="font-bold text-xl text-black tracking-tight">
        {price.toLocaleString("id-ID", { style: "currency", currency: "IDR" })}
      </span>
      <Button classname="bg-blue-600 text-sm" onClick={() => handleAddToCart(id)}>
        Add To Cart
      </Button>
    </div>
  );
};

CardProduct.Header = Header;
CardProduct.Body = Body;
CardProduct.Footer = Footer;

export default CardProduct;
