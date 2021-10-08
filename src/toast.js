export class ToastManager {
    constructor() {
        let body = document.querySelector("body")

        this.toastContainer = document.createElement("div")
        this.toastContainer.classList.add("toasts")

        body.appendChild(this.toastContainer)

        this.icons = {
            "SUCCESS": "fa-check",
            "ERROR": "fa-times"
        }
    }

    Success(msg) {
        return this._show(msg, "SUCCESS")
    }

    Error(msg) {
        return this._show(msg, "ERROR")
    }

    _show(msg, type) {
        let newToast = document.createElement("div")
        const timeout = 4000
        newToast.style.display = 'flex'
        newToast.classList.add(type.toLowerCase())
        newToast.classList.add("toast")

        newToast.innerHTML = `
                <progress max="100" value="0"></progress>
                <i class="fa ${this.icons[type]} resultIcon"></i><h3> ${msg} </h3>
        `
        const toastObj = {
            counter: 0,
            progressElement: newToast.querySelector("progress"),
            timer: setInterval(() => {
                toastObj.counter = toastObj.counter + (1000 / timeout)
                toastObj.progressElement.value = toastObj.counter.toString()
                if (toastObj.counter >= 100){
                    newToast.style.display = "none"
                    this.toastContainer.removeChild(newToast)
                    clearInterval(toastObj.timer)
                }
            }, 10)
        }

        newToast.addEventListener("click", () => {
            newToast.style.display = "none"
            this.toastContainer.removeChild(newToast)
            clearInterval(toastObj.timer)
            })

        this.toastContainer.appendChild(newToast)

    }
}