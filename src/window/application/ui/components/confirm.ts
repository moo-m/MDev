export interface ConfirmOptions {
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    danger?: boolean;
}

export default class UI_Confirm {
    public static open(
        options: ConfirmOptions,
    ): Promise<boolean> {
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
                "dev-ui-confirm",
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

            const body =
                document.createElement("div");

            body.classList.add(
                "dev-ui-confirm-body",
            );

            const message =
                document.createElement("div");

            message.classList.add(
                "dev-ui-confirm-message",
            );

            message.textContent =
                options.message;

            body.appendChild(message);

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

            confirm.type = "button";

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
                "Confirm";

            actions.append(
                cancel,
                confirm,
            );

            dialog.append(
                header,
                body,
                actions,
            );

            overlay.appendChild(
                dialog,
            );

            window.MDev.host!.appendChild(
                overlay,
            );

            let finished = false;

            const finish = (
                result: boolean,
            ): void => {
                if (finished) {
                    return;
                }

                finished = true;

                document.removeEventListener(
                    "keydown",
                    onKeyDown,
                );

                overlay.remove();

                resolve(result);
            };

            const onKeyDown =
                (event: KeyboardEvent) => {
                    if (
                        event.key ===
                        "Escape"
                    ) {
                        finish(false);
                    }

                    if (
                        event.key ===
                        "Enter"
                    ) {
                        finish(true);
                    }
                };

            close.addEventListener(
                "click",
                () => finish(false),
            );

            cancel.addEventListener(
                "click",
                () => finish(false),
            );

            confirm.addEventListener(
                "click",
                () => finish(true),
            );

            overlay.addEventListener(
                "mousedown",
                event => {
                    if (
                        event.target ===
                        overlay
                    ) {
                        finish(false);
                    }
                },
            );

            document.addEventListener(
                "keydown",
                onKeyDown,
            );

            requestAnimationFrame(() => {
                confirm.focus();
            });
        });
    }
}