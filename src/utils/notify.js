import { Notify } from "quasar";

function notifySuccess(message) {
    Notify.create({ message: message, color: "positive", group: false });
}
function notifyInfo(message) {
    Notify.create({ message: message, color: "info", group: false });
}
function notifyWarning(message) {
    Notify.create({ message: message, color: "warning", group: false });
}
function notifyDanger(message) {
    Notify.create({ message: message, color: "negative", group: false });
}

export { notifySuccess, notifyInfo, notifyWarning, notifyDanger };
