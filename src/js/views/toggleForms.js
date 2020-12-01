const toggleForms = {
    loginBtn: document.getElementById("loginBtn"),
    registerBtn: document.getElementById("registerBtn"),
    loginCard: document.getElementById("loginCard"),
    registerCard: document.getElementById("registerCard"),
    
    showForm: function(btnId) {
        if(btnId === "loginBtn") { // Login
            this.loginCard.classList.remove("d-none");
            this.loginBtn.classList.add("active");
            this.registerCard.classList.add("d-none");
            this.registerBtn.classList.remove("active");

        } else { // Register
            this.loginCard.classList.add("d-none");
            this.loginBtn.classList.remove("active");
            this.registerCard.classList.remove("d-none");
            this.registerBtn.classList.add("active");
        }
    }
}

export default toggleForms;