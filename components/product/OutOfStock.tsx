import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { Product } from "apps/commerce/types.ts";
import type { JSX } from "preact";

export interface Props {
  productID: Product["productID"];
}

function Notify({ productID }: Props) {
  const loading = useSignal(false);

  const handleSubmit: JSX.GenericEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      loading.value = true;

      const name = (e.currentTarget.elements.namedItem("name") as RadioNodeList)
        ?.value;
      const email = (
        e.currentTarget.elements.namedItem("email") as RadioNodeList
      )?.value;

      await invoke.wap.actions.product.solicitation({
        idProduto: Number(productID),
        idAtributoValor: 0,
        nome: name,
        email,
        mailing: false,
      });
    } finally {
      loading.value = false;
    }
  };

  return (
    <form class="form-control justify-start gap-2" onSubmit={handleSubmit}>
      <span class="text-base">Este produto está indisponivel no momento</span>
      <span class="text-sm">Avise-me quando estiver disponivel</span>

      <input placeholder="Nome" class="input input-bordered" name="name" />
      <input placeholder="Email" class="input input-bordered" name="email" />

      <button class="btn disabled:loading" disabled={loading}>
        Enviar
      </button>
    </form>
  );
}

export default Notify;
