import { useCart } from "apps/wap/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export interface Props extends Omit<BtnProps, "onAddItem"> {
  productID: string;
}

function AddToCartButton({ productID, eventParams }: Props) {
  const { addItems } = useCart();
  const onAddItem = () =>
    addItems({
      tipo: "produto",
      itens: [
        {
          idProduto: Number(productID),
          quantidade: 1,
          idAtributoSimples: 0,
          idUnidadeVenda: 0,
          idArmazem: 0,
        },
      ],
    });

  return <Button onAddItem={onAddItem} eventParams={eventParams} />;
}

export default AddToCartButton;
