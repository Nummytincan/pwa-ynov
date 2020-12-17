if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("../sw.js", {
            scope: "./"
        })
        .then(function (reg) {
            // registration worked
            console.log("Registration succeeded. Scope is " + reg.scope);
        })
        .catch(function (error) {
            // registration failed
            console.log("Registration failed with " + error);
        });

}

window.addEventListener("load", function (event) {
    let deferredPrompt; // Allows to show the install prompt
    const installButton = document.getElementById("install_button");

    this.addEventListener("beforeinstallprompt", function (event) {
        // Prevent Chrome 67 and earlier from automatically showing the prompt
        e.preventDefault();
        // Stash the event so it can be triggered later.
        deferredPrompt = e;

        installButton.addEventListener("click", (e) => {
            // hide our user interface that shows our A2HS button
            installButton.style.display = "none";
            // Show the prompt
            deferredPrompt.prompt();
            // Wait for the user to respond to the prompt
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === "accepted") {
                    console.log("User accepted the A2HS prompt");
                } else {
                    console.log("User dismissed the A2HS prompt");
                }
                deferredPrompt = null;
            });
        });
    });
});