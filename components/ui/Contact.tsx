import { useSignal } from "@preact/signals";
import { invoke } from "$store/runtime.ts";
import type { JSX } from "preact";

function Contact() {
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
      const contact = (
        e.currentTarget.elements.namedItem("contact") as RadioNodeList
      )?.value;

      await invoke.wap.actions.forms.contact({
        nome: name,
        email,
        hashEmail: "contato/formulario",
        contato: contact,
      });
    } finally {
      loading.value = false;
    }
  };

  return (
    <form
      class="container form-control justify-start gap-2"
      onSubmit={handleSubmit}
    >
      <h1 class="text-base">Fale Conosco</h1>

      <input placeholder="Nome" class="input input-bordered" name="name" />
      <input placeholder="Email" class="input input-bordered" name="email" />
      <input
        placeholder="Contato"
        class="input input-bordered"
        name="contact"
      />

      <button class="btn disabled:loading" disabled={loading}>
        Enviar
      </button>
    </form>
  );
}

export default Contact;
