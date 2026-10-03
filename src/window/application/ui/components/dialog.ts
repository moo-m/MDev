export interface DialogField {
  name: string;
  label: string;
  value?: string;
  placeholder?: string;
  type?: "text" | "textarea";
}

export interface DialogOptions {
  title: string;
  fields: DialogField[];
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
}

export default class UI_Dialog {
  public static open(
    options: DialogOptions,
  ): Promise<Record<string, string> | null> {
    return new Promise(resolve => {
      const overlay =
        document.createElement("div");

      overlay.classList.add(
        "dev-ui-dialog-overlay",
      );

      const dialog =
        document.createElement("div");

      dialog.classList.add(
        "dev-ui-dialog",
      );

      const header =
        document.createElement("div");

      header.classList.add(
        "dev-ui-dialog-header",
      );

      const title =
        document.createElement("div");

      title.classList.add(
        "dev-ui-dialog-title",
      );

      title.textContent =
        options.title;

      const close =
        document.createElement("button");

      close.type = "button";
      close.classList.add(
        "dev-ui-dialog-close",
      );

      close.textContent = "×";

      header.append(
        title,
        close,
      );

      const form =
        document.createElement("form");

      form.classList.add(
        "dev-ui-dialog-form",
      );

      const fields =
        document.createElement("div");

      fields.classList.add(
        "dev-ui-dialog-fields",
      );

      for (const field of options.fields) {
        const wrapper =
          document.createElement("label");

        wrapper.classList.add(
          "dev-ui-dialog-field",
        );

        const label =
          document.createElement("span");

        label.classList.add(
          "dev-ui-dialog-label",
        );

        label.textContent =
          field.label;

        let input:
          HTMLInputElement |
          HTMLTextAreaElement;

        if (
          field.type ===
          "textarea"
        ) {
          input =
            document.createElement(
              "textarea",
            );

          input.rows = 8;
        } else {
          input =
            document.createElement(
              "input",
            );

          input.type =
            "text";
        }

        input.name =
          field.name;

        input.value =
          field.value ?? "";

        input.placeholder =
          field.placeholder ?? "";

        input.classList.add(
          "dev-ui-dialog-input",
        );

        wrapper.append(
          label,
          input,
        );

        fields.appendChild(
          wrapper,
        );
      }

      const actions =
        document.createElement("div");

      actions.classList.add(
        "dev-ui-dialog-actions",
      );

      const cancel =
        document.createElement("button");

      cancel.type = "button";
      cancel.classList.add(
        "dev-ui-dialog-button",
        "secondary",
      );

      cancel.textContent =
        options.cancelText ??
        "Cancel";

      const confirm =
        document.createElement("button");

      confirm.type = "submit";

      confirm.classList.add(
        "dev-ui-dialog-button",
      );

      if (options.danger) {
        confirm.classList.add(
          "danger",
        );
      }

      confirm.textContent =
        options.confirmText ??
        "Save";

      actions.append(
        cancel,
        confirm,
      );

      form.append(
        fields,
        actions,
      );

      dialog.append(
        header,
        form,
      );

      overlay.appendChild(
        dialog,
      );

      window.MDev.host!.appendChild(
        overlay,
      );

      const inputs =
        Array.from(
          form.querySelectorAll(
            "input, textarea",
          ),
        ) as Array<
          HTMLInputElement |
          HTMLTextAreaElement
        >;

      const finish = (
        result:
          Record<string, string> |
          null,
      ): void => {
        overlay.remove();

        resolve(result);
      };

      close.addEventListener(
        "click",
        () => finish(null),
      );

      cancel.addEventListener(
        "click",
        () => finish(null),
      );

      overlay.addEventListener(
        "mousedown",
        event => {
          if (
            event.target ===
            overlay
          ) {
            finish(null);
          }
        },
      );

      form.addEventListener(
        "submit",
        event => {
          event.preventDefault();

          const result:
            Record<string, string> = {};

          for (const input of inputs) {
            result[input.name] =
              input.value;
          }

          finish(result);
        },
      );

      const onKeyDown =
        (event: KeyboardEvent) => {
          if (
            event.key === "Escape"
          ) {
            document.removeEventListener(
              "keydown",
              onKeyDown,
            );

            finish(null);
          }
        };

      document.addEventListener(
        "keydown",
        onKeyDown,
      );

      requestAnimationFrame(() => {
        inputs[0]?.focus();
        inputs[0]?.select();
      });
    });
  }
}