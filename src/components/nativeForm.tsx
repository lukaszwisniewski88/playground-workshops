import React from "react";

type Props = {};

function NativeForm({}: Props) {
  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          new FormData(event.currentTarget);
        }}
      >
        <input type={"text"} name="login" />
        <input type={"password"} name="password" />
        <button type="button" onClick={() => {}}>
          Coś zrób
        </button>
        <input type="submit" />
      </form>
    </div>
  );
}

export default NativeForm;
